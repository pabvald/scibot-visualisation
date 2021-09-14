"""
 Author: Nilavra Bhattacharya
 Date: 2019-10-22
 Author URL: https://nilavra.in
"""
import pandas as pd
import numpy as np
#from math import sqrt, atan2
import math
from scipy.stats import hmean
from sshtunnel import SSHTunnelForwarder
import pymysql
import sys, os, socket
from scipy.spatial import ConvexHull



# -------------------- CONNECTION PARAMS -------------------------------
ssh_host = sys.argv[1]
ssh_port = int(sys.argv[2])
ssh_user = sys.argv[3]
ssh_pass = sys.argv[4]

db_host = sys.argv[5]
db_port = int(sys.argv[6])
db_user = sys.argv[7]
db_pass = sys.argv[8]
db_name = sys.argv[9]

# -------------------- processing params ---------------------------
F_MICRO_TO_MILLI = 0.001 # to convert from microseconds to milliseconds
F_MICRO_TO_SEC = F_MICRO_TO_MILLI * 0.001 # to convert from microseconds to seconds
F_MILLI_TO_SEC = F_MICRO_TO_MILLI # to convert from millieconds to seconds

SCREEN_WIDTH = 1680
SCREEN_HEIGHT = 1050



# ------------- scan_dist: euclidean distance covered by connecting fixn points ---------
def calc_scan_dist_euclid(fixn_pts_x, fixn_pts_y, normalizer_x=1, normalizer_y=1):
    n = len(fixn_pts_x)

    x = fixn_pts_x #[fixn_pts[i][0] for i in range(n)]
    y = fixn_pts_y #[fixn_pts[i][1] for i in range(n)]

    lv = [math.sqrt(
          ((x[i] - x[i - 1]) / normalizer_x) ** 2  +
          ((y[i] - y[i - 1]) / normalizer_y) ** 2
          ) for i in range(1, n)]

    length = sum(lv)
    return length

# ------------- scan_dist 3D: euclidean distance covered by connecting fixn points ---------
def calc_scan_dist_euclid_3D(fixn_pts_x, fixn_pts_y, fixn_pts_z,
            normalizer_x=1, normalizer_y=1, normalizer_z=1):
    n = len(fixn_pts_x)

    x = fixn_pts_x #[fixn_pts[i][0] for i in range(n)]
    y = fixn_pts_y #[fixn_pts[i][1] for i in range(n)]
    z = fixn_pts_z

    lv = [math.sqrt(
        ((x[i] - x[i - 1]) / normalizer_x) ** 2 +
        ((y[i] - y[i - 1]) / normalizer_y) ** 2 +
        ((z[i] - z[i - 1]) / normalizer_z) ** 2
    ) for i in range(1, n)]

    length = sum(lv)
    return length

# ------------- scan_dist: horizontal / vertical dist covered by connecting fixn points ---------
# only x or y-coordinates reqd
def calc_scan_dist_hv(fixn_pts_x_y, normalizer=1):
    n = len(fixn_pts_x_y)

    p = fixn_pts_x_y

    lv = [abs(p[i] - p[i - 1]) for i in range(1, n)]
    length = float(sum(lv)) / normalizer

    return length

# ---------------- convexHullArea2D: area of convex hull of points ---------------
# pts is in the form [ (1,1), (2,1), (5,2), (3,4) ]
def calc_convex_hull_area_centroid(fixn_pts_x, fixn_pts_y):

    pts = []
    for i in range(len(fixn_pts_x)):
        pts.append([fixn_pts_x[i], fixn_pts_y[i]])

    hull = ConvexHull(pts)

    # Get centroid
    cx = np.mean(hull.points[hull.vertices, 0])
    cy = np.mean(hull.points[hull.vertices, 1])

    # in 2D, area = perimeter, volume = area -- https://stackoverflow.com/a/46246955
    return hull.volume, cx, cy

# ---------------- convexHullArea3D: area of convex hull of 3D points ---------------
# pts is in the form [ (1,1), (2,1), (5,2), (3,4) ]
def calc_convex_hull_3D_vol_area_centroid(fixn_pts_x, fixn_pts_y, fixn_pts_z):

    pts = []
    for i in range(len(fixn_pts_x)):
        pts.append([fixn_pts_x[i], fixn_pts_y[i], fixn_pts_z[i]])

    hull = ConvexHull(pts)

    # Get centroid
    cx = np.mean(hull.points[hull.vertices, 0])
    cy = np.mean(hull.points[hull.vertices, 1])
    cz = np.mean(hull.points[hull.vertices, 2])

    # in 2D, area = perimeter, volume = area -- https://stackoverflow.com/a/46246955
    return hull.volume, hull.area, cx, cy, cz


# ------------- calculates r (length) and theta (angle) of overall fixation vector, w.r.t. a central point  ---------
def calc_overall_fixn_vector(
        fixn_pts_x, fixn_pts_y, fixn_dur_list, x_c=0.0, y_c=0.0,
        normalizer_x=1, normalizer_y=1
):

    n = len(fixn_pts_x)

    x = fixn_pts_x #[fixn_pts[i][0] for i in range(n)]
    y = fixn_pts_y #[fixn_pts[i][1] for i in range(n)]
    dur = fixn_dur_list

    lx = [((float(x[i]) - x_c) / normalizer_x) * dur[i] for i in range(0, n)]
    ly = [((float(y[i]) - y_c) / normalizer_y) * dur[i] for i in range(0, n)]

    x_vec = sum(lx)
    y_vec = sum(ly)

    r = math.sqrt((x_vec - x_c) ** 2 + (y_vec - y_c) ** 2)
    # atan2 returns angles in [-pi to pi]. Adding pi changes this to [0 to pi]
    theta_rad = math.atan2(y_vec, x_vec) #+ math.pi
    theta_deg = math.degrees(theta_rad)

    return x_vec, y_vec, r, theta_rad, theta_deg


# -------------------- main() -------------------------------

def main():

    BULK_THRESH = 1000

    tunnel = SSHTunnelForwarder(
        (ssh_host, ssh_port),
        ssh_username=ssh_user,
        ssh_password=ssh_pass,
        remote_bind_address=(db_host, db_port)
    )

    tunnel.start()

    conn = pymysql.connect(
        host=db_host,
        port=tunnel.local_bind_port,
        user=db_user,
        passwd=db_pass,
        db=db_name,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

    sql_insert = (
        " insert into sandbox.pcde_metrics_seq_cumul ("
        "     fixn_id "
        "   , DOCID_USERID "
        "   , fixn_n "
        "   , p_rlvnc "
        "   , t_rlvnc "
        "   , fixn_st_rel "
        "   , fixn_end_rel "
        
        "   , fixn_end_rel_delta "
        
        "   , fixn_st_fraction "
        "   , fixn_end_fraction "
        "   , fixn_dur_fraction "
        "   , fixn_n_fraction "

        "   , fixn_n_l1 "
        "   , fixn_n_l2 "
        "   , fixn_n_l3 "
        "   , fixn_n_l4 "
        
        "   , fixn_rate "
        "   , fixn_dur_sum "
        "   , fixn_dur_avg "
        "   , fixn_dur_sd "
        
        "   , fixn_hull_2d_area "
        
        "  , fixn_hull_2d_area_delta "
        "  , fixn_hull_2d_area_per_time "
        "  , fixn_hull_2d_area_delta_per_delta_time "
        
        "   , fixn_hull_3d_s_area "
        "   , fixn_hull_3d_vol "
        "   , fixn_hull_2d_x "
        "   , fixn_hull_2d_y "
        "   , fixn_hull_3d_x "
        "   , fixn_hull_3d_y "
        "   , fixn_hull_3d_t "
        
        "   , fixns_per_unit_hull_2d_area "
        
        "   , fixns_per_unit_hull_2d_area_delta "
        "   , fixns_per_unit_hull_2d_area_per_time "
        "   , fixns_per_unit_hull_2d_area_delta_per_delta_time "
        
        "   , fixns_per_unit_hull_3d_vol "
        "   , fixns_per_unit_hull_3d_s_area "
        
        "   , scan_dist_euclid "
        "   , scan_dist_3d_euclid "
        
        "   , scan_dist_h "
        "   , scan_dist_v "
        "   , scan_hv_ratio "
        
        "   , scan_hv_ratio_delta "
        "   , scan_hv_ratio_per_time "
        "   , scan_hv_ratio_delta_per_delta_time "
        
        "   , scan_speed "
        "   , scan_speed_h "
        "   , scan_speed_v "
        "   , fixn_per_scan_dist "
        "   , fixn_per_scan_dist_3d "
        
        "   , avg_sacc_len "
        "   , avg_sacc_len_3d "
        
        # "   , overall_fixn_vec0_x "
        # "   , overall_fixn_vec0_y "
        # "   , overall_fixn_vec0_len "
        # "   , overall_fixn_vec0_theta_rad "
        # "   , overall_fixn_vec0_theta_deg "
        # "   , overall_fixn_vec_x "
        # "   , overall_fixn_vec_y "
        # "   , overall_fixn_vec_len "
        # "   , overall_fixn_vec_theta_rad "
        # "   , overall_fixn_vec_theta_deg "
        ") values ("
        "  %s, %s, %s, %s, %s, "
        "  %s, %s, %s, %s, %s, "
        "  %s, %s, %s, %s, %s, "
        "  %s, %s, %s, %s, %s, "
        "  %s, %s, %s, %s, %s, "
        "  %s, %s, %s, %s, %s, "
        "  %s, %s, %s, %s, %s, "
        "  %s, %s, %s, %s, %s, "
        "  %s, %s, %s, %s, %s, "
        "  %s, %s, %s, %s, %s, "
        # "  %s, %s, %s, %s, %s, "
        # "  %s, %s, %s, %s, %s, "
        "  %s, %s "
        ")"
    )

    sql_select_usr_doc = (
        " select distinct a.Userid userid "
        "     , a.DocId docid "
        "     , a.`Start` "
        "     , a.`End` "
        "     , b.t_rlvnc "
        "     , b.p_rlvnc "
        "     , b.DOCID_USERID "
        " from PCDE.TextStimsOne a "
        " , sandbox.pcde_fixations b "
        " where a.Userid = b.userid "
        " AND a.DocId = b.docid "
        " order by a.Userid, a.DocId "
    )


    sql_select_fixns = (
        " select * "
        " from sandbox.pcde_fixations a "
        "    , sandbox.pcde_metrics_user_doc b "
        " where 1=1 "
        " and a.DOCID_USERID = b.DOCID_USERID "
        " and a.DOCID_USERID = %s "
        " and a.IS_FIXN_CROSSHAIR <> 1 " # ignore fixations outside text area
        " order by a.`Start` "
    )

    cur_select_usr_doc = conn.cursor()
    cur_select_fixns = conn.cursor()
    cur_insert = conn.cursor()

    print('Start processing...')

    try:

        bulk_insert = []
        cur_select_usr_doc.execute(sql_select_usr_doc)
        tot_user_doc = int(cur_select_usr_doc.rowcount)
        i_user_doc = 0

        tot_rows_insert = 0

        ################
        # user-doc loop
        ################
        for user_doc in cur_select_usr_doc:
            i_user_doc += 1

            DOCID_USERID = user_doc['DOCID_USERID']

            cur_select_fixns.execute(sql_select_fixns, (DOCID_USERID))

            list_fixn_dur = []
            list_fixn_x = []
            list_fixn_y = []
            list_fixn_t = []

            prev_fixn_end_rel = 0
            prev_fixn_hull_2d_area = 0
            prev_fixns_per_unit_hull_2d_area = 0
            prev_scan_hv_ratio = 0

            ######################
            # fixations loop
            ######################
            fixn_n = 0
            for fixn in cur_select_fixns:
                fixn_n += 1

                fixn_id = fixn['id']
                p_rlvnc = fixn['p_rlvnc']
                t_rlvnc = fixn['t_rlvnc']
                fixn_st_rel = (fixn['Start'] - fixn['task_st']) * F_MICRO_TO_SEC
                fixn_end_rel = (fixn['End'] - fixn['task_st']) * F_MICRO_TO_SEC
                fixn_end_rel_delta = 0
                if fixn_n > 0:
                    fixn_end_rel_delta = fixn_end_rel - prev_fixn_end_rel

                fixn_st_fraction = fixn_st_rel / float(fixn['task_dur'])
                fixn_end_fraction = fixn_end_rel / float(fixn['task_dur'])
                fixn_dur_fraction = float(fixn['Duration']) * F_MILLI_TO_SEC / float(fixn['task_dur'])
                fixn_n_fraction = fixn_n * 1.0 / fixn['fixn_n']

                list_fixn_dur.append(fixn['Duration'])
                list_fixn_x.append(float(fixn['LocationX']))
                list_fixn_y.append(float(fixn['LocationY']))
                list_fixn_t.append(fixn_end_rel)

                # if fixn_n < 3: continue # computing rest of the values for fixn 4 onwards

                fixn_n_l1 = sum(100 <= i < 250 for i in list_fixn_dur)
                fixn_n_l2 = sum(250 <= i < 400 for i in list_fixn_dur)
                fixn_n_l3 = sum(400 <= i < 550 for i in list_fixn_dur)
                fixn_n_l4 = sum(550 <= i for i in list_fixn_dur)

                fixn_rate = fixn_n / fixn_end_rel

                fixn_dur_sum = np.nan_to_num(sum(list_fixn_dur))
                fixn_dur_avg = np.nan_to_num(np.mean(list_fixn_dur))
                fixn_dur_sd = np.nan_to_num(np.std(list_fixn_dur))

                fixn_hull_2d_area, fixn_hull_3d_s_area, fixn_hull_3d_vol = 0, 0, 0
                fixn_hull_2d_x, fixn_hull_2d_y = 0, 0
                fixn_hull_3d_x, fixn_hull_3d_y, fixn_hull_3d_t = 0, 0, 0
                fixns_per_unit_hull_2d_area = 0
                fixns_per_unit_hull_3d_vol = 0
                fixns_per_unit_hull_3d_s_area = 0

                fixn_hull_2d_area_delta = 0
                fixn_hull_2d_area_per_time = 0
                fixn_hull_2d_area_delta_per_delta_time = 0

                fixns_per_unit_hull_2d_area_delta = 0
                fixns_per_unit_hull_2d_area_per_time = 0
                fixns_per_unit_hull_2d_area_delta_per_delta_time = 0

                ######## 2D Hull ########
                if fixn_n >= 3:
                    fixn_hull_2d_area, fixn_hull_2d_x, fixn_hull_2d_y = \
                        calc_convex_hull_area_centroid(
                        list_fixn_x, list_fixn_y
                    )

                    fixn_hull_2d_area /= (SCREEN_WIDTH * SCREEN_HEIGHT)

                    fixn_hull_2d_area_delta = fixn_hull_2d_area - prev_fixn_hull_2d_area
                    fixn_hull_2d_area_per_time = fixn_hull_2d_area / fixn_end_rel
                    fixn_hull_2d_area_delta_per_delta_time = fixn_hull_2d_area_delta / fixn_end_rel_delta

                    fixns_per_unit_hull_2d_area = fixn_n / fixn_hull_2d_area

                    fixns_per_unit_hull_2d_area_delta = fixns_per_unit_hull_2d_area - prev_fixns_per_unit_hull_2d_area
                    fixns_per_unit_hull_2d_area_per_time = fixns_per_unit_hull_2d_area / fixn_end_rel
                    fixns_per_unit_hull_2d_area_delta_per_delta_time = fixns_per_unit_hull_2d_area_delta / fixn_end_rel_delta


                ######## 3D hull ########
                if fixn_n >= 4:
                    fixn_hull_3d_vol, fixn_hull_3d_s_area, \
                    fixn_hull_3d_x, fixn_hull_3d_y, fixn_hull_3d_t = \
                        calc_convex_hull_3D_vol_area_centroid(
                        list_fixn_x, list_fixn_y, list_fixn_t
                    )

                    fixn_hull_3d_vol /= (SCREEN_WIDTH * SCREEN_HEIGHT)
                    fixn_hull_3d_s_area /= (SCREEN_WIDTH * SCREEN_HEIGHT)

                    fixns_per_unit_hull_3d_vol = fixn_n / fixn_hull_3d_vol
                    fixns_per_unit_hull_3d_s_area = fixn_n / fixn_hull_3d_s_area


                scan_dist_euclid = calc_scan_dist_euclid(list_fixn_x, list_fixn_y,
                    normalizer_x=SCREEN_WIDTH, normalizer_y=SCREEN_HEIGHT)

                scan_dist_3d_euclid = calc_scan_dist_euclid_3D(
                    list_fixn_x, list_fixn_y, list_fixn_t,
                    normalizer_x=SCREEN_WIDTH, normalizer_y=SCREEN_HEIGHT)

                scan_dist_h = calc_scan_dist_hv(list_fixn_x, normalizer=SCREEN_WIDTH)
                scan_dist_v = calc_scan_dist_hv(list_fixn_y, normalizer=SCREEN_HEIGHT)

                scan_hv_ratio = scan_dist_h
                if scan_dist_v > 0: scan_hv_ratio = (scan_dist_h / scan_dist_v)
                """
                thus when vertical distance is zero, 
                we assume vertical distance is 1 pixel
                """

                scan_hv_ratio_delta = scan_hv_ratio - prev_scan_hv_ratio
                scan_hv_ratio_per_time = scan_hv_ratio / fixn_end_rel
                scan_hv_ratio_delta_per_delta_time = scan_hv_ratio_delta / fixn_end_rel_delta

                scan_speed = scan_dist_euclid / fixn_end_rel
                scan_speed_h = scan_dist_h / fixn_end_rel
                scan_speed_v = scan_dist_v / fixn_end_rel

                fixn_per_scan_dist = fixn_n

                if scan_dist_euclid != 0: fixn_per_scan_dist = fixn_n / scan_dist_euclid
                """
                thus when euclidean distance is zero, 
                we assume euclidean distance is 1 pixel
                """

                fixn_per_scan_dist_3d = fixn_n
                if scan_dist_3d_euclid != 0: fixn_per_scan_dist_3d = fixn_n / scan_dist_3d_euclid

                avg_sacc_len = 0
                avg_sacc_len_3d = 0
                if fixn_n > 1:
                    # no. of saccades = no. fixations - 1
                    avg_sacc_len = scan_dist_euclid / (fixn_n - 1)
                    avg_sacc_len_3d = scan_dist_3d_euclid / (fixn_n - 1)
                    """
                    fixn_per_scan_dist and avg_sacc_len
                    are (almost) reciprocals
                    """


                ovrl_fixn_vec0_x, ovrl_fixn_vec0_y, ovrl_fixn_vec0_len, ovrl_fixn_vec0_theta_rad, ovrl_fixn_vec0_theta_deg \
                    = calc_overall_fixn_vector(list_fixn_x, list_fixn_y, list_fixn_dur)

                ovrl_fixn_vec_x, ovrl_fixn_vec_y, ovrl_fixn_vec_len, ovrl_fixn_vec_theta_rad, ovrl_fixn_vec_theta_deg \
                    = calc_overall_fixn_vector(
                        list_fixn_x, list_fixn_y, list_fixn_dur, x_c=(SCREEN_WIDTH-1)/2, y_c=(SCREEN_HEIGHT-1)/2,
                        normalizer_x=SCREEN_WIDTH, normalizer_y=SCREEN_HEIGHT
                )


                bulk_insert.append([
                      int(fixn_id)
                    , str(DOCID_USERID)
                    , int(fixn_n)
                    , p_rlvnc
                    , t_rlvnc
                    , float(round(fixn_st_rel, 10))
                    , float(round(fixn_end_rel, 10))

                    , float(round(fixn_end_rel_delta, 10))

                    , float(round(fixn_st_fraction, 10))
                    , float(round(fixn_end_fraction, 10))
                    , float(round(fixn_dur_fraction, 10))
                    , float(round(fixn_n_fraction, 10))

                    , int(fixn_n_l1)
                    , int(fixn_n_l2)
                    , int(fixn_n_l3)
                    , int(fixn_n_l4)

                    , float(fixn_rate)
                    , float(round(fixn_dur_sum, 10))
                    , float(round(fixn_dur_avg, 10))
                    , float(round(fixn_dur_sd, 10))

                    , float(round(fixn_hull_2d_area, 10))

                    , float(round(fixn_hull_2d_area_delta, 10))
                    , float(round(fixn_hull_2d_area_per_time, 10))
                    , float(round(fixn_hull_2d_area_delta_per_delta_time, 10))

                    , float(round(fixn_hull_3d_s_area, 10))
                    , float(round(fixn_hull_3d_vol, 10))
                    , float(round(fixn_hull_2d_x, 10))
                    , float(round(fixn_hull_2d_y, 10))
                    , float(round(fixn_hull_3d_x, 10))
                    , float(round(fixn_hull_3d_y, 10))
                    , float(round(fixn_hull_3d_t, 10))

                    , float(round(fixns_per_unit_hull_2d_area, 10))

                    , float(round(fixns_per_unit_hull_2d_area_delta, 10))
                    , float(round(fixns_per_unit_hull_2d_area_per_time, 10))
                    , float(round(fixns_per_unit_hull_2d_area_delta_per_delta_time, 10))

                    , float(round(fixns_per_unit_hull_3d_vol, 10))
                    , float(round(fixns_per_unit_hull_3d_s_area, 10))

                    , float(round(scan_dist_euclid, 10))
                    , float(round(scan_dist_3d_euclid, 10))

                    , float(round(scan_dist_h, 10))
                    , float(round(scan_dist_v, 10))
                    , float(round(scan_hv_ratio, 10))

                    , float(round(scan_hv_ratio_delta, 10))
                    , float(round(scan_hv_ratio_per_time, 10))
                    , float(round(scan_hv_ratio_delta_per_delta_time, 10))

                    , float(round(scan_speed, 10))
                    , float(round(scan_speed_h, 10))
                    , float(round(scan_speed_v, 10))
                    , float(round(fixn_per_scan_dist, 10))
                    , float(round(fixn_per_scan_dist_3d, 10))

                    , float(round(avg_sacc_len, 10))
                    , float(round(avg_sacc_len_3d, 10))

                    # , float(round(ovrl_fixn_vec0_x, 10))
                    # , float(round(ovrl_fixn_vec0_y, 10))
                    # , float(round(ovrl_fixn_vec0_len, 10))
                    # , float(round(ovrl_fixn_vec0_theta_rad, 10))
                    # , float(round(ovrl_fixn_vec0_theta_deg, 10))
                    # , float(round(ovrl_fixn_vec_x, 10))
                    # , float(round(ovrl_fixn_vec_y, 10))
                    # , float(round(ovrl_fixn_vec_len, 10))
                    # , float(round(ovrl_fixn_vec_theta_rad, 10))
                    # , float(round(ovrl_fixn_vec_theta_deg, 10))
                ])

                prev_fixn_end_rel = fixn_end_rel
                prev_fixn_hull_2d_area = fixn_hull_2d_area
                prev_fixns_per_unit_hull_2d_area = fixns_per_unit_hull_2d_area
                prev_scan_hv_ratio = scan_hv_ratio

                # bulk insert whenever BULK_THRESH rows are ready
                if len(bulk_insert) >= BULK_THRESH:
                    df_null_check = pd.DataFrame(bulk_insert)
                    num_null = df_null_check.isnull().sum().sum()

                    if num_null > 0:
                        print("no. of nulls = %d " % num_null)
                        print(df_null_check.loc[df_null_check.isnull().any(axis=1)].to_string())

                    cur_insert.executemany(sql_insert, bulk_insert)
                    tot_rows_insert += len(bulk_insert)
                    #print("total rows inserted: %5d / %5d" % (tot_rows_insert, tot_user_doc))
                    print('---------- DOCID_USERID: %s \t [%3d / %3d] \t inserted rows: %5d ----------'
                          % (DOCID_USERID, i_user_doc, tot_user_doc, tot_rows_insert))
                    bulk_insert = []
                    # conn.commit()

            # ------- loop end: fixations --------

            pass

        # ------- loop end: user doc --------

        #############################
        # bulk insert remaining rows
        #############################
        df_null_check = pd.DataFrame(bulk_insert)
        num_null = df_null_check.isnull().sum().sum()

        if num_null > 0:
            print("no. of nulls = %d " % num_null)
            print(df_null_check.loc[df_null_check.isnull().any(axis=1)].to_string())

        cur_insert.executemany(sql_insert, bulk_insert)
        tot_rows_insert += len(bulk_insert)
        print("total rows inserted: %5d" % tot_rows_insert)
        print('---------- DOCID_USERID: %s \t [%3d / %3d] \t inserted rows: %5d ----------'
              % (DOCID_USERID, i_user_doc, tot_user_doc, tot_rows_insert))
        bulk_insert = []


        conn.commit()
        print('Done. Finished')

    finally:

        cur_select_usr_doc.close()
        cur_select_fixns.close()
        cur_insert.close()

        conn.close()
        tunnel.stop()
        tunnel.close()




if __name__ == '__main__':
    main()
    exit(0)