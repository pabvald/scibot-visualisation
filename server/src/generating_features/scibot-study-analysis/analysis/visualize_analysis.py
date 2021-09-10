from data_loading.data_loader import SciBot_DataLoader
from data_loading.visit_extractor import extract_paragraph_visits_vectorized
import matplotlib.pyplot as plt
from features import extract_features
import csv
import pandas as pd
import numpy as np
import ast


"""
Output format
participant, dataset, document_id, paragraph_id, perceived_rel, system_rel, visit_id, visit_duration, visit_timestamp, number_of_fixations, numbers_of_gaze, 
differentiate btw visits with none or other para (duration)
time_gap between visits (visualize with hist)
"""

scibot_data_loader = None
analysis_data = None


def create_hist(data_array, title, bins="auto"):
    _ = plt.hist(data_array, bins=bins)  # arguments are passed to np.histogram
    plt.title(title)
    plt.show()


def summarize(participant, dataset, log_type, document_id, df, per_rel, sys_rel):
    # FeatureExtractor()
    paragraph_dict = extract_paragraph_visits_vectorized(df, min_visit_duration=0.000001, max_gap_duration=0.0,
                                                         ignore_background=False)
    features_dicts = []
    for paragraph_visit in paragraph_dict:
        paragraph_id = str(paragraph_visit.paragraph_id)
        features = extract_features(paragraph_visit.data, stimulus_width=2560, stimulus_height=1440)
        features_dicts.append(
            {"participant": participant, "dataset": dataset, "document_id": document_id, "log_type": log_type,
             "paragraph_id": paragraph_id, "perceived_rel": per_rel, "system_rel": sys_rel,
             "visit_id": paragraph_visit.visit_id, "visit_duration": paragraph_visit.duration,
             "visit_timestamp": paragraph_visit.start_time, "number_of_fixations": features.get("fixn_n")})

    return features_dicts


def load_data(path=None):
    global analysis_data
    global scibot_data_loader
    scibot_data_loader = SciBot_DataLoader(
        data_dir="/Users/ombh/DFKI_Projects/scibot-study-analysis/output",
        exclude_users=["A02", "A05"], rating_task=True,
        article_dir="/Users/ombh/DFKI_Projects/scibot-study-analysis/articles")  # , exclude_users=["A01", "A05"])
    if path:
        with open(path, mode='r') as csv_file:
            analysis_data = pd.read_csv(csv_file)
        return

    temp_dict = []
    for user in scibot_data_loader.google_nq_reading:
        for document in scibot_data_loader.google_nq_reading[user]:
            temp_dict.extend(summarize(participant=user, dataset="google_nq", log_type="reading", document_id=document,
                                       df=scibot_data_loader.google_nq_reading[user][document]["dataframe"],
                                       per_rel=scibot_data_loader.google_nq_reading[user][document][
                                           "perceived_relevance"],
                                       sys_rel=scibot_data_loader.google_nq_reading[user][document][
                                           "system_relevance"]))
            temp_dict.extend(summarize(participant=user, dataset="google_nq", log_type="rating", document_id=document,
                                       df=scibot_data_loader.google_nq_rating[user][document]["dataframe"],
                                       per_rel=scibot_data_loader.google_nq_reading[user][document][
                                           "perceived_relevance"],
                                       sys_rel=scibot_data_loader.google_nq_reading[user][document][
                                           "system_relevance"]))
    print("Succesfully loaded!")

    with open("analysis.csv", 'w', encoding='utf8', newline='') as csv_file:
        wr = csv.DictWriter(csv_file,
                            fieldnames=temp_dict[0].keys(), )
        wr.writeheader()
        wr.writerows(temp_dict)


# analysis_data = pd.read_csv("analysis.csv")


"""
    Visualize the average visit time for relevant and non relevant paragraphs. 
"""


def avg_visit_time_and_fixations_per_rel_and_non_rel_paragraph(para_visits_per_document):
    global scibot_data_loader

    time_rel_par = []
    time_non_rel_par = []

    fixn_num_rel_par = []
    fixn_num_rel_par_avg = []
    fixn_num_non_rel_par = []
    fixn_num_non_rel_par_avg = []

    num_of_words_rel_par = []
    num_of_words_non_rel_par = []

    articles = scibot_data_loader.google_nq_articles

    for document in para_visits_per_document:
        document_id = document["document"]
        rel_par = articles[document_id].num_answer
        time_rel_par.append(float(document["visits"][rel_par]["avg_gaze_duration"]))
        fixn_num_rel_par.append(document["visits"][rel_par]["num_fixation"] / document["visits"][rel_par]["count"])
        fixn_num_rel_par_avg.append(document["visits"][rel_par]["num_fixation"])
        num_of_words_rel_par.append(articles[document_id].paragraphs[rel_par]["word_count"])
        non_rel_par_count = 0
        for par_visits in document["visits"]:
            if par_visits < 0 or par_visits == rel_par:
                continue
            else:
                time_non_rel_par.append(float(document["visits"][par_visits]["avg_gaze_duration"]))
                fixn_num_non_rel_par.append(
                    document["visits"][par_visits]["num_fixation"] / document["visits"][par_visits]["count"])
                num_of_words_non_rel_par.append(articles[document_id].paragraphs[par_visits]["word_count"])
                non_rel_par_count += 1
                fixn_num_non_rel_par_avg.append(document["visits"][par_visits]["num_fixation"])

    time_rel_par = np.asarray(time_rel_par)
    time_non_rel_par = np.asarray(time_non_rel_par)

    fixn_num_rel_par = np.asarray(fixn_num_rel_par)
    fixn_num_non_rel_par = np.asarray(fixn_num_non_rel_par)

    fixn_num_rel_par_avg = np.asarray(fixn_num_rel_par_avg)
    fixn_num_non_rel_par_avg = np.asarray(fixn_num_non_rel_par_avg)

    num_of_words_rel_par = np.asarray(num_of_words_rel_par)
    num_of_words_non_rel_par = np.asarray(num_of_words_non_rel_par)

    avg_time_non_rel = time_non_rel_par.mean()
    std_time_non_rel = time_non_rel_par.std()
    avg_time_rel = time_rel_par.mean()
    std_time_rel = time_rel_par.std()

    fig, ax = plt.subplots()
    ax.bar(["Not relevant", "Relevant"], [avg_time_non_rel, avg_time_rel], yerr=[std_time_non_rel, std_time_rel],
           align='center', alpha=0.5)
    ax.set_ylabel('Duration in seconds')
    ax.set_title('Average visit time for (not) relevant paragraphs')
    plt.savefig('./graphs/avg_visit_time.svg')
    plt.show()

    time_rel_pal_norm_by_words = np.divide(time_rel_par, num_of_words_rel_par)
    time_non_rel_par_norm_by_words = np.divide(time_non_rel_par, num_of_words_non_rel_par)
    avg_time_non_rel = time_non_rel_par_norm_by_words.mean()
    std_time_non_rel = time_non_rel_par_norm_by_words.std()
    avg_time_rel = time_rel_pal_norm_by_words.mean()
    std_time_rel = time_rel_pal_norm_by_words.std()

    fig, ax = plt.subplots()
    ax.bar(["Not relevant", "Relevant"], [avg_time_non_rel, avg_time_rel], yerr=[std_time_non_rel, std_time_rel],
           align='center', alpha=0.5)
    ax.set_ylabel('Duration in seconds')
    ax.set_title('Average visit time for (not) relevant paragraphs normalized by number of words')
    plt.savefig('./graphs/avg_visit_time_normalized_by_num_of_words.svg')
    plt.show()

    avg_fixn_non_rel = fixn_num_non_rel_par.mean()
    std_fixn_non_rel = fixn_num_non_rel_par.std()
    avg_fixn_rel = fixn_num_rel_par.mean()
    std_fixn_rel = fixn_num_rel_par.std()

    fig, ax = plt.subplots()
    ax.bar(["Not relevant", "Relevant"], [avg_fixn_non_rel, avg_fixn_rel], yerr=[std_fixn_non_rel, std_fixn_rel],
           align='center', alpha=0.5)
    ax.set_ylabel('Number of fixations')
    ax.set_title('Average fixations for relevant and not relevant paragraphs per visit')
    plt.savefig('./graphs/avg_visit_fixations.svg')
    plt.show()

    avg_fixn_non_rel = fixn_num_non_rel_par_avg.mean()
    std_fixn_non_rel = fixn_num_non_rel_par_avg.std()
    avg_fixn_rel = fixn_num_rel_par_avg.mean()
    std_fixn_rel = fixn_num_rel_par_avg.std()

    number_of_user = len(scibot_data_loader.google_nq_reading) * 12
    fixn_num_non_rel_par_avg_per_user_and_document = np.divide(fixn_num_non_rel_par_avg, number_of_user)
    fixn_num_rel_par_avg_per_user_and_document = np.divide(fixn_num_rel_par_avg, number_of_user)
    avg_fixn_non_rel = fixn_num_non_rel_par_avg_per_user_and_document.mean()
    std_fixn_non_rel = fixn_num_non_rel_par_avg_per_user_and_document.std()
    avg_fixn_rel = fixn_num_rel_par_avg_per_user_and_document.mean()
    std_fixn_rel = fixn_num_rel_par_avg_per_user_and_document.std()

    fig, ax = plt.subplots()
    ax.bar(["Not relevant", "Relevant"], [avg_fixn_non_rel, avg_fixn_rel], yerr=[std_fixn_non_rel, std_fixn_rel],
           align='center', alpha=0.5)
    ax.set_ylabel('Number of fixations')
    ax.set_title('Average fixations for relevant and not relevant paragraphs')
    plt.savefig('./graphs/avg_fixations.svg')
    plt.show()

    fixn_num_non_rel_par_avg_per_user_and_document_normalized = np.divide(
        fixn_num_non_rel_par_avg_per_user_and_document, num_of_words_non_rel_par)
    fixn_num_rel_par_avg_per_user_and_document_normalized = np.divide(fixn_num_rel_par_avg_per_user_and_document,
                                                                      num_of_words_rel_par)
    avg_fixn_non_rel = fixn_num_non_rel_par_avg_per_user_and_document_normalized.mean()
    std_fixn_non_rel = fixn_num_non_rel_par_avg_per_user_and_document_normalized.std()
    avg_fixn_rel = fixn_num_rel_par_avg_per_user_and_document_normalized.mean()
    std_fixn_rel = fixn_num_rel_par_avg_per_user_and_document_normalized.std()

    fig, ax = plt.subplots()
    ax.bar(["Not relevant", "Relevant"], [avg_fixn_non_rel, avg_fixn_rel], yerr=[std_fixn_non_rel, std_fixn_rel],
           align='center', alpha=0.5)
    ax.set_ylabel('Number of fixations')
    ax.set_title('Average fixations for relevant and not relevant paragraphs normalized')
    plt.savefig('./graphs/avg_fixations_normalized.svg')
    plt.show()


def rating_analysis(df):
    avg_per_rel_per_doc = {}
    sys_rel_per_doc = {}
    init_np_array = np.asarray([0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0])
    for name, group in df:
        row = group.iloc[0]
        per_rel = np.float_(ast.literal_eval(row["perceived_rel"]))
        sys_rel =  np.float_(ast.literal_eval(row["system_rel"]))
        per_rel = np.pad(per_rel, (0, 7 - len(per_rel)), 'constant', constant_values=np.nan)
        sys_rel =  np.pad(sys_rel, (0, 7 - len(sys_rel)), 'constant', constant_values=np.nan)
        if name[2] not in avg_per_rel_per_doc:
            avg_per_rel_per_doc[name[2]] = init_np_array
            avg_per_rel_per_doc[name[2]] = np.add(avg_per_rel_per_doc[name[2]], per_rel)
            sys_rel_per_doc[name[2]] = init_np_array
            sys_rel_per_doc[name[2]] = np.add(sys_rel_per_doc[name[2]], sys_rel)

        else:
            avg_per_rel_per_doc[name[2]] = np.add(avg_per_rel_per_doc[name[2]], per_rel)

    documents = list(avg_per_rel_per_doc.keys())
    paragraphs = ["0", "1", "2", "3", "4", "5", "6"]
    per_matrix = np.array(list(avg_per_rel_per_doc.values()))
    sys_matrix = np.array(list(sys_rel_per_doc.values()))

    plt.rcParams["axes.grid"] = False

    fig, ax = plt.subplots()
    im = ax.imshow(per_matrix)

    ax.grid(which="minor", color="w", linestyle='-', linewidth=3)
    # We want to show all ticks...
    ax.set_xticks(np.arange(len(paragraphs)))
    ax.set_yticks(np.arange(len(documents)))
    # ... and label them with the respective list entries
    ax.set_xticklabels(paragraphs)
    ax.set_yticklabels(documents)

    # Rotate the tick labels and set their alignment.
    plt.setp(ax.get_xticklabels(), rotation=0, ha="right",
             rotation_mode="anchor")

    # Loop over data dimensions and create text annotations.
    for i in range(len(documents)):
        for j in range(len(paragraphs)):
            if sys_matrix[i][j] == 1.0:
                text = ax.text(j, i, str(per_matrix[i, j]) + "*",
                           ha="center", va="center", color="w")
            else:
                text = ax.text(j, i, per_matrix[i, j],
                               ha="center", va="center", color="w")


    ax.set_title("Perceived relevance for each document in GoogleNQ")
    fig.tight_layout()
    plt.savefig('./graphs/perceived_rel_rating.svg')
    plt.show()


def visualize_user_paragraph_visits():
    global analysis_data
    plt.style.use('https://github.com/dhaitz/matplotlib-stylesheets/raw/master/pitayasmoothie-light.mplstyle')


    df_rating = analysis_data.loc[(analysis_data["log_type"] == "reading")]
    df_rating = df_rating.sort_values(["participant", "dataset", "document_id", "log_type", "visit_id"])
    df_rating = df_rating.groupby(["participant", "dataset", "document_id", "log_type"])
    # How many times do readers visit relevant/irrelevant paragraphs for each document
    # How long are visits

    documents = set(analysis_data["document_id"].tolist())
    para_visits_per_document = []
    for document in documents:
        paragraphs = sorted(set(analysis_data.loc[(analysis_data["document_id"] == document)]["paragraph_id"].tolist()))
        para_visits = {}
        for paragraph in paragraphs:
            filtered_df = analysis_data.loc[
                (analysis_data["document_id"] == document) & (analysis_data["log_type"] == "reading") & (
                        analysis_data["paragraph_id"] == paragraph)]
            para_visits[paragraph] = {"count": filtered_df.shape[0],
                                      "gaze_duration": filtered_df["visit_duration"].sum(),
                                      "avg_gaze_duration": filtered_df["visit_duration"].mean(),
                                      "num_fixation": filtered_df["number_of_fixations"].sum()}
        para_visits_per_document.append({"document": document, "visits": para_visits})
    pass

    #Calling the visualizations
    avg_visit_time_and_fixations_per_rel_and_non_rel_paragraph(para_visits_per_document)
    rating_analysis(df_rating)


    # title para
    # np_count_answer(beginning with 0)
    # hist mit zahlen
    # pro dokument jeden paragraphen false positive
    #

    # How many times do user visit relevant/irrelevant paragraphs for each document
    # How long are visits
    # timegaps between visit


if __name__ == '__main__':
    load_data(path="analysis_old.csv")
    # visualize starting here with data in analysis_data
    visualize_user_paragraph_visits()
