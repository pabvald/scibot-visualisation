import itertools
import os
from abc import ABC
from random import randint
from PIL import Image
from gaze_visualizer import GazeVisualizer
from gaze_visualizer import AxisOrigin
from data_loading.data_loader import SciBot_DataLoader
from features import extract_features, FixationEvent
import plotly.graph_objects as go

googleNQ_coordinates = {'nq_6p_a1_NTc1': {5: {'y_top': 335, 'y_bottom': 70}, 4: {'y_top': 620, 'y_bottom': 355},
                                          3: {'y_top': 958, 'y_bottom': 640}, 2: {'y_top': 1402, 'y_bottom': 978},
                                          1: {'y_top': 2111, 'y_bottom': 1422}, 0: {'y_top': 2714, 'y_bottom': 2131},
                                          -1: {'y_top': 2934, 'y_bottom': 2734}, -2: {'y_top': 2934, 'y_bottom': 0}},
                        'nq_5p_a0_LTIz': {4: {'y_top': 759, 'y_bottom': 70}, 3: {'y_top': 1309, 'y_bottom': 779},
                                          2: {'y_top': 1912, 'y_bottom': 1329}, 1: {'y_top': 2303, 'y_bottom': 1932},
                                          0: {'y_top': 2853, 'y_bottom': 2323}, -1: {'y_top': 3073, 'y_bottom': 2873},
                                          -2: {'y_top': 3073, 'y_bottom': 0}},
                        'nq_7p_a2_LTYz': {6: {'y_top': 653, 'y_bottom': 70}, 5: {'y_top': 991, 'y_bottom': 673},
                                          4: {'y_top': 1276, 'y_bottom': 1011}, 3: {'y_top': 1826, 'y_bottom': 1296},
                                          2: {'y_top': 2376, 'y_bottom': 1846}, 1: {'y_top': 2873, 'y_bottom': 2396},
                                          0: {'y_top': 3264, 'y_bottom': 2893}, -1: {'y_top': 3484, 'y_bottom': 3284},
                                          -2: {'y_top': 3484, 'y_bottom': 0}},
                        'nq_6p_a5_LTkw': {5: {'y_top': 282, 'y_bottom': 70}, 4: {'y_top': 1097, 'y_bottom': 302},
                                          3: {'y_top': 1435, 'y_bottom': 1117}, 2: {'y_top': 1826, 'y_bottom': 1455},
                                          1: {'y_top': 2376, 'y_bottom': 1846}, 0: {'y_top': 2767, 'y_bottom': 2396},
                                          -1: {'y_top': 2987, 'y_bottom': 2787}, -2: {'y_top': 2987, 'y_bottom': 0}},
                        'nq_7p_a1_Mzgy': {6: {'y_top': 335, 'y_bottom': 70}, 5: {'y_top': 991, 'y_bottom': 355},
                                          4: {'y_top': 1276, 'y_bottom': 1011}, 3: {'y_top': 1932, 'y_bottom': 1296},
                                          2: {'y_top': 2376, 'y_bottom': 1952}, 1: {'y_top': 2820, 'y_bottom': 2396},
                                          0: {'y_top': 3052, 'y_bottom': 2840}, -1: {'y_top': 3272, 'y_bottom': 3072},
                                          -2: {'y_top': 3272, 'y_bottom': 0}},
                        'nq_5p_a4_LTI3': {4: {'y_top': 494, 'y_bottom': 70}, 3: {'y_top': 938, 'y_bottom': 514},
                                          2: {'y_top': 1117, 'y_bottom': 958}, 1: {'y_top': 1508, 'y_bottom': 1137},
                                          0: {'y_top': 2270, 'y_bottom': 1528}, -1: {'y_top': 2490, 'y_bottom': 2290},
                                          -2: {'y_top': 2490, 'y_bottom': 0}},
                        'nq_6p_a1_LTEy': {5: {'y_top': 282, 'y_bottom': 70}, 4: {'y_top': 567, 'y_bottom': 302},
                                          3: {'y_top': 958, 'y_bottom': 587}, 2: {'y_top': 1614, 'y_bottom': 978},
                                          1: {'y_top': 2111, 'y_bottom': 1634}, 0: {'y_top': 2290, 'y_bottom': 2131},
                                          -1: {'y_top': 2510, 'y_bottom': 2310}, -2: {'y_top': 2510, 'y_bottom': 0}},
                        'nq_5p_a3_LTYx': {4: {'y_top': 494, 'y_bottom': 70}, 3: {'y_top': 1203, 'y_bottom': 514},
                                          2: {'y_top': 1806, 'y_bottom': 1223}, 1: {'y_top': 2250, 'y_bottom': 1826},
                                          0: {'y_top': 2747, 'y_bottom': 2270}, -1: {'y_top': 2967, 'y_bottom': 2767},
                                          -2: {'y_top': 2967, 'y_bottom': 0}},
                        'nq_5p_a2_MTgz': {4: {'y_top': 388, 'y_bottom': 70}, 3: {'y_top': 1097, 'y_bottom': 408},
                                          2: {'y_top': 1382, 'y_bottom': 1117}, 1: {'y_top': 2144, 'y_bottom': 1402},
                                          0: {'y_top': 2376, 'y_bottom': 2164}, -1: {'y_top': 2596, 'y_bottom': 2396},
                                          -2: {'y_top': 2596, 'y_bottom': 0}},
                        'nq_5p_a0_LTcw': {4: {'y_top': 600, 'y_bottom': 70}, 3: {'y_top': 1044, 'y_bottom': 620},
                                          2: {'y_top': 1700, 'y_bottom': 1064}, 1: {'y_top': 2303, 'y_bottom': 1720},
                                          0: {'y_top': 2747, 'y_bottom': 2323}, -1: {'y_top': 2967, 'y_bottom': 2767},
                                          -2: {'y_top': 2967, 'y_bottom': 0}},
                        'nq_6p_a3_MzA5': {5: {'y_top': 388, 'y_bottom': 70}, 4: {'y_top': 1097, 'y_bottom': 408},
                                          3: {'y_top': 1859, 'y_bottom': 1117}, 2: {'y_top': 2250, 'y_bottom': 1879},
                                          1: {'y_top': 2641, 'y_bottom': 2270}, 0: {'y_top': 2820, 'y_bottom': 2661},
                                          -1: {'y_top': 3040, 'y_bottom': 2840}, -2: {'y_top': 3040, 'y_bottom': 0}},
                        'nq_7p_a5_NTE0': {6: {'y_top': 547, 'y_bottom': 70}, 5: {'y_top': 1044, 'y_bottom': 567},
                                          4: {'y_top': 1435, 'y_bottom': 1064}, 3: {'y_top': 2144, 'y_bottom': 1455},
                                          2: {'y_top': 2588, 'y_bottom': 2164}, 1: {'y_top': 2926, 'y_bottom': 2608},
                                          0: {'y_top': 3370, 'y_bottom': 2946}, -1: {'y_top': 3590, 'y_bottom': 3390},
                                          -2: {'y_top': 3590, 'y_bottom': 0}},
                        'nq_6p_a4_ODQz': {5: {'y_top': 388, 'y_bottom': 70}, 4: {'y_top': 938, 'y_bottom': 408},
                                          3: {'y_top': 1223, 'y_bottom': 958}, 2: {'y_top': 1720, 'y_bottom': 1243},
                                          1: {'y_top': 2217, 'y_bottom': 1740}, 0: {'y_top': 3032, 'y_bottom': 2237},
                                          -1: {'y_top': 3252, 'y_bottom': 3052}, -2: {'y_top': 3252, 'y_bottom': 0}}}

g_rel_coordinates = {'g-rel_q071-3_t': {4: {'y_top': 386, 'y_bottom': 227}, 3: {'y_top': 671, 'y_bottom': 406},
                                        2: {'y_top': 956, 'y_bottom': 691}, 1: {'y_top': 1188, 'y_bottom': 976},
                                        0: {'y_top': 1367, 'y_bottom': 1208}, -1: {'y_top': 1440, 'y_bottom': 1387},
                                        -2: {'y_top': 1440, 'y_bottom': 157}},
                     'g-rel_q114-1_r': {3: {'y_top': 406, 'y_bottom': 194}, 2: {'y_top': 691, 'y_bottom': 426},
                                        1: {'y_top': 1029, 'y_bottom': 711}, 0: {'y_top': 1367, 'y_bottom': 1049},
                                        -1: {'y_top': 1440, 'y_bottom': 1387}, -2: {'y_top': 1440, 'y_bottom': 124}},
                     'g-rel_q075-1_i': {2: {'y_top': 744, 'y_bottom': 373}, 1: {'y_top': 1082, 'y_bottom': 764},
                                        0: {'y_top': 1367, 'y_bottom': 1102}, -1: {'y_top': 1440, 'y_bottom': 1387},
                                        -2: {'y_top': 1440, 'y_bottom': 303}},
                     'g-rel_q128-1_r': {3: {'y_top': 618, 'y_bottom': 247}, 2: {'y_top': 797, 'y_bottom': 638},
                                        1: {'y_top': 1029, 'y_bottom': 817}, 0: {'y_top': 1367, 'y_bottom': 1049},
                                        -1: {'y_top': 1440, 'y_bottom': 1387}, -2: {'y_top': 1440, 'y_bottom': 177}},
                     'g-rel_q094-2_t': {2: {'y_top': 532, 'y_bottom': 267}, 1: {'y_top': 1029, 'y_bottom': 552},
                                        0: {'y_top': 1314, 'y_bottom': 1049}, -1: {'y_top': 1440, 'y_bottom': 1334},
                                        -2: {'y_top': 1440, 'y_bottom': 197}},
                     'g-rel_q134-3_t': {2: {'y_top': 744, 'y_bottom': 214}, 1: {'y_top': 1188, 'y_bottom': 764},
                                        0: {'y_top': 1367, 'y_bottom': 1208}, -1: {'y_top': 1440, 'y_bottom': 1387},
                                        -2: {'y_top': 1440, 'y_bottom': 144}},
                     'g-rel_q103-1_i': {2: {'y_top': 797, 'y_bottom': 320}, 1: {'y_top': 1082, 'y_bottom': 817},
                                        0: {'y_top': 1314, 'y_bottom': 1102}, -1: {'y_top': 1440, 'y_bottom': 1334},
                                        -2: {'y_top': 1440, 'y_bottom': 250}},
                     'g-rel_q097-2_t': {3: {'y_top': 520, 'y_bottom': 202}, 2: {'y_top': 797, 'y_bottom': 540},
                                        1: {'y_top': 1135, 'y_bottom': 817}, 0: {'y_top': 1367, 'y_bottom': 1155},
                                        -1: {'y_top': 1440, 'y_bottom': 1387}, -2: {'y_top': 1440, 'y_bottom': 132}},
                     'g-rel_q118-1_r': {2: {'y_top': 638, 'y_bottom': 320}, 1: {'y_top': 976, 'y_bottom': 658},
                                        0: {'y_top': 1367, 'y_bottom': 996}, -1: {'y_top': 1440, 'y_bottom': 1387},
                                        -2: {'y_top': 1440, 'y_bottom': 250}},
                     'g-rel_q076-1_r': {3: {'y_top': 406, 'y_bottom': 141}, 2: {'y_top': 638, 'y_bottom': 426},
                                        1: {'y_top': 1135, 'y_bottom': 658}, 0: {'y_top': 1367, 'y_bottom': 1155},
                                        -1: {'y_top': 1440, 'y_bottom': 1387}, -2: {'y_top': 1440, 'y_bottom': 71}},
                     'g-rel_q122-2_i': {2: {'y_top': 532, 'y_bottom': 108}, 1: {'y_top': 1029, 'y_bottom': 552},
                                        0: {'y_top': 1367, 'y_bottom': 1049}, -1: {'y_top': 1440, 'y_bottom': 1387},
                                        -2: {'y_top': 1440, 'y_bottom': 38}},
                     'g-rel_q116-1_r': {4: {'y_top': 439, 'y_bottom': 280}, 3: {'y_top': 618, 'y_bottom': 459},
                                        2: {'y_top': 850, 'y_bottom': 638}, 1: {'y_top': 1135, 'y_bottom': 870},
                                        0: {'y_top': 1367, 'y_bottom': 1155}, -1: {'y_top': 1440, 'y_bottom': 1387},
                                        -2: {'y_top': 1440, 'y_bottom': 210}},
                     'g-rel_q085-2_i': {2: {'y_top': 532, 'y_bottom': 320}, 1: {'y_top': 1029, 'y_bottom': 552},
                                        0: {'y_top': 1314, 'y_bottom': 1049}, -1: {'y_top': 1440, 'y_bottom': 1334},
                                        -2: {'y_top': 1440, 'y_bottom': 250}},
                     'g-rel_q088-1_t': {3: {'y_top': 459, 'y_bottom': 247}, 2: {'y_top': 744, 'y_bottom': 479},
                                        1: {'y_top': 1082, 'y_bottom': 764}, 0: {'y_top': 1367, 'y_bottom': 1102},
                                        -1: {'y_top': 1440, 'y_bottom': 1387}, -2: {'y_top': 1440, 'y_bottom': 177}}}

if __name__ == '__main__':
    test = os.getcwd()
    # load the Visualizer
    lib_v = GazeVisualizer(export_path=os.path.join(os.getcwd(), "out"), origin=AxisOrigin.BL)

    # load data
    file_ext = "_new_fixn_abs.png"
    data_dir = "/Users/ombh/DFKI_Projects/scibot-study-analysis/data/gaze_data/fixn_idt_abs"
    dataloader = SciBot_DataLoader(data_dir=data_dir, include_users=["A01"], gaze_data=True, reading_task=True,
                                   rating_task=False, training_data=False, gREL=False)  # exclude_users=["A02", "A05"]
    for user, user_data in dataloader.google_nq_reading.items():
        for filename in os.listdir("../data/stimuli/Google_NQ/"):
            with Image.open(os.path.join("../data/stimuli/Google_NQ/", filename)) as im:
                document_id = filename[0:-4]
                im.load()
                lib_v.image = im
                df = user_data[document_id]["dataframe"]

                # Visualize gaze
                coords = []
                coord_x = df["gaze_x"].values
                coord_y = df["gaze_y_abs"].values
                for x, y in zip(coord_x, coord_y):
                    coords.append((x, y))
                lib_v.visualize_gaze(coords)

                # Visualize fixations
                fix_events = FixationEvent.from_dataframe(df)
                fixations = []
                for event in fix_events:
                    fixations.append({"x": event.gaze_x, "y": event.gaze_y_stimulus})
                lib_v.visualize_fixations(fixations, numbered=True)

                # Visualize the Paragraphs
                paragraph_roi = []
                for paragraph in googleNQ_coordinates[document_id]:
                    par_coord = googleNQ_coordinates[document_id][paragraph]
                    if paragraph == -2:
                        paragraph_roi.append(
                            {'x1': 0, 'y1': par_coord['y_top'], 'x2': 2560, 'y2': par_coord['y_bottom'],
                             'caption': str(paragraph)})
                    else:
                        paragraph_roi.append(
                            {'x1': 749, 'y1': par_coord['y_top'], 'x2': 1773, 'y2': par_coord['y_bottom'],
                             'caption': str(paragraph)})

                lib_v.visualize_roi(paragraph_roi)
                lib_v.export_image(document_id + file_ext)
        break


