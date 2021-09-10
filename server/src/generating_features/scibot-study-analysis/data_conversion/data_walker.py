import os
import logging

from data_conversion.pandas_converter import PandasConverter

_EXCLUDE_USER_LIST = []
_INCLUDE_USER_LIST = []             # if emtpy every user besides excluded will be analysed
_INCLUDE_DATA_TYPE = ["GoogleNQ", "g-rel"]               # "g_rel", "GoogleNQ"
_INCLUDE_STUDY_TYPE = ["main", "train"]         # "main", "train"


def init_user_rating_g_rel(current_path):
    with open(os.path.join(current_path, "User_Rating")) as rating_file:
        rating = []
        for line in rating_file:
            if line.strip():
                rating.append(line.strip())
        logging.info(rating)
        return rating


def init_g_rel(user_data):
    """
       initialize g-rel data
    """
    paths = [os.path.join(user_data.path, "g-rel", study_type) for study_type in _INCLUDE_STUDY_TYPE]
    for current_path in paths:
        logging.info(current_path)
        for log_file in os.scandir(current_path):
            if log_file.is_file() and log_file.name.endswith(".csv"):  # TODO: Filter
                try:
                    index, g_rel, file_name, relevancy, file_ext, log_type = log_file.name[:-4].replace(".", "_").bhattacharya_split("_")
                except ValueError:
                    logging.error("Wrong filename format!")
                out_dir = current_path.replace("data", "out")
                if not os.path.exists(out_dir):
                    os.makedirs(out_dir)
                file_reader.get_new_format(log_file.path, skip_empty_x=True, output_path=log_file.path.replace("data", "out"))
            elif log_file.name == "User_Rating":
                init_user_rating_g_rel(current_path)
            else:
                logging.error("Not a csv file!")


def init_user_rating_google_nq(current_path):
    with open(os.path.join(current_path, "User_Rating")) as rating_file:
        rating = []
        for line in rating_file:
            if line.strip():
                rating.append(line.strip().split("|"))
        logging.info(rating)
        return rating


def init_google_nq(user_data):
    """
           initialize GoogleNQ data
    """
    paths = [os.path.join(user_data.path, "GoogleNQ", study_type) for study_type in _INCLUDE_STUDY_TYPE]
    for current_path in paths:
        logging.info(current_path)
        for log_file in os.scandir(current_path):
            if log_file.is_file() and log_file.name.endswith(".csv"):  # TODO: Filter
                try:
                    index, nq, par_size, answ_par, name, log_type = log_file.name[:-4].bhattacharya_split("_")
                except ValueError:
                    logging.error("Wrong filename format!")
                out_dir = current_path.replace("data", "out")
                if not os.path.exists(out_dir):
                    os.makedirs(out_dir)
                file_reader.get_new_format(log_file.path, skip_empty_x=True, output_path=log_file.path.replace("data", "out"))
            elif log_file.name == "User_Rating":
                init_user_rating_google_nq(current_path)
            else:
                logging.error("Not a csv file!")


def init_user_data(user_data):
    if "g-rel" in _INCLUDE_DATA_TYPE:
        init_g_rel(user_data)
    if "GoogleNQ" in _INCLUDE_DATA_TYPE:
        init_google_nq(user_data)


def init_study_data(data_dir):
    """
    initialize and load the study data
    """
    for user_data in os.scandir(data_dir):
        if user_data.is_file():
            logging.warning("Data directory contains an unknown file!")
        elif user_data.name not in _EXCLUDE_USER_LIST and (not _INCLUDE_USER_LIST or user_data.name in _INCLUDE_USER_LIST):
            logging.info(user_data.name)
            init_user_data(user_data)


file_reader = None

if __name__ == '__main__':
    file_reader = PandasConverter()
    logging.basicConfig(level=logging.DEBUG)
    init_study_data("data")



