
from typing import Dict, Tuple

# Option one
def model(all_paragraph_features: Dict[int, Dict[str, float]]) -> Dict[int, Tuple[float, bool]]:
    """
    Example input:

       input =  {
           0:  {
                "f_avg_sacc_length": 0.19040127862712639,
                "f_box_area": 19.24100698435323,
                "f_box_area_per_time": 1.3543853357096192,
                "f_fixn_dur_avg": 0.22175853475169363,
                "f_fixn_dur_sd": 0.09894826646554188,
                "f_fixn_dur_sum": 11.531443807088069,
                "f_fixn_n": 52.0,
                "f_fixns_per_box_area": 0.37001936508371597,
                "f_fixns_per_hull_area": 81.08296429102911,
                "f_hull_area_per_time": 0.0451427666196429,
                "f_scan_distance_euclid": 9.710465209983445,
                "f_scan_distance_h": 9.387316774743752,
                "f_scan_distance_v": 2.049681229051574,
                "f_scan_hv_ratio": 4.579891078520264,
                "f_scan_speed": 0.6835251239197079,
                "f_scan_speed_h": 0.6607785232713083,
                "f_scan_speed_v": 0.14427821796251147,
                "f_total_time": 14.206449580519166
            },
            1: {
                "f_avg_sacc_length": 0.19040127862712639,
                "f_box_area": 19.24100698435323,
                "f_box_area_per_time": 1.3543853357096192,
                "f_fixn_dur_avg": 0.22175853475169363,
                "f_fixn_dur_sd": 0.09894826646554188,
                "f_fixn_dur_sum": 11.531443807088069,
                "f_fixn_n": 52.0,
                "f_fixns_per_box_area": 0.37001936508371597,
                "f_fixns_per_hull_area": 81.08296429102911,
                "f_hull_area_per_time": 0.0451427666196429,
                "f_scan_distance_euclid": 9.710465209983445,
                "f_scan_distance_h": 9.387316774743752,
                "f_scan_distance_v": 2.049681229051574,
                "f_scan_hv_ratio": 4.579891078520264,
                "f_scan_speed": 0.6835251239197079,
                "f_scan_speed_h": 0.6607785232713083,
                "f_scan_speed_v": 0.14427821796251147,
                "f_total_time": 14.206449580519166
            },
            2: {
                ...
            },
            ...
            6: {
                ...
            }
        }

    Example output:

    output = {
            0: (0.44, False),
            1: (0.99, True),
            ...,
            6: (0.53, False)
        }

    """
    pass


# Option two
def model(single_paragraph_features: Dict[str, float]) -> Tuple[float, bool]:
    """

    Input example:

    input =  {  "f_avg_sacc_length": 0.19040127862712639,
                "f_box_area": 19.24100698435323,
                "f_box_area_per_time": 1.3543853357096192,
                "f_fixn_dur_avg": 0.22175853475169363,
                "f_fixn_dur_sd": 0.09894826646554188,
                "f_fixn_dur_sum": 11.531443807088069,
                "f_fixn_n": 52.0,
                "f_fixns_per_box_area": 0.37001936508371597,
                "f_fixns_per_hull_area": 81.08296429102911,
                "f_hull_area_per_time": 0.0451427666196429,
                "f_scan_distance_euclid": 9.710465209983445,
                "f_scan_distance_h": 9.387316774743752,
                "f_scan_distance_v": 2.049681229051574,
                "f_scan_hv_ratio": 4.579891078520264,
                "f_scan_speed": 0.6835251239197079,
                "f_scan_speed_h": 0.6607785232713083,
                "f_scan_speed_v": 0.14427821796251147,
                "f_total_time": 14.206449580519166
            }

    Output example:

        output = (0.55, True)
    """

    pass
