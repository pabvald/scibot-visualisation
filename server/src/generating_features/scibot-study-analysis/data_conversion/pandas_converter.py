import pandas as pd
import re

class PandasConverter:
    """
    The PandasConverter will convert a .csv to a new standard where every timestamp is unique.
    The datastructure is:
    timestamp|gaze_x|gaze_y|fixation_x|fixation_y|scroll_y|enter|hover|leave
    where enter|hover|leave is either None or a label_id of the corresponding label which triggered the event
    """
    df = None
    skip_empty_x = None


    def __init__(self):

        pass

    def get_new_format(self, path, output_path=None, skip_empty_x=False):
        """
        will convert a given csv to the new format where every timestamp is unique.
        :param path: input path of the csv file which will be converted
        :param output_path: optional output path. if given the new csv will be saved at 'output_path'
        :param skip_empty_x: if true, then rows where 'gaze_x'is None will be ignored (as well as 'gaze_y')
        :return: new dataframe in the format we want
        """

        self.skip_empty_x = skip_empty_x
        # create DataFrame
        data = pd.read_csv(path, delimiter="|", encoding='utf-8', float_precision='round_trip')
        dataframe = pd.DataFrame(data=data)

        # rename & delete columns because no mouse data
        new_df = dataframe.rename({'scroll_y': 'event', 'mouse_x': 'scroll_y', 'label_id': 'delete_1',
                                   'event': 'delete_2', 'mouse_y': 'label_id'}, axis='columns')
        self.df = new_df.drop(columns=['delete_1', 'delete_2'])
        # create new DataFrame with the right columns
        new_df = pd.DataFrame(columns=['timestamp', 'gaze_x', 'gaze_y', 'fixation_x', 'fixation_y', 'scroll_y',
                                       'enter', 'hover', 'leave'])

        count = 0
        # init some variables which are needed
        old = None
        time_stamp = None
        x, y, fix_x, fix_y, scroll_y, enter, hover, leave = 'None', 'None', 'None', 'None', 'None', 'None', 'None', 'None'

        # start going through every line of the csv
        for row in self.df.iterrows():

            # save the timestamp
            time_stamp = row[1]['timestamp']

            # if this is the first iteration => just save the values
            if old is None:
                if row[1]['gaze_y'] != 'None' and row[1]['gaze_y'] != 'None':
                    x = row[1]['gaze_x']
                    y = row[1]['gaze_y']
                    if row[1]['event'] != 'None':
                        event = row[1]['event']
                        label = row[1]['label_id']
                        while '[/' in label:
                            label = self._strip_label(label)
                        if event == 'ENTER':
                            enter = label
                            hover = 'None'
                        if event == 'HOVER':
                            hover = label
                        if event == 'LEAVE':
                            leave = label
                            hover = 'None'
                if row[1]['fixation_x'] != 'None' and row[1]['fixation_y'] != 'None':
                    fix_x = row[1]['fixation_x']
                    fix_y = row[1]['fixation_y']
                if row[1]['scroll_y'] != 'None':
                    scroll_y = row[1]['scroll_y']
            else:
                # check if the new timestamp is the same as in the last iteration
                if time_stamp == old['timestamp']:
                    # it is the same timestamp
                    # save values of the new iteration if not NONE
                    if row[1]['gaze_x'] != 'None' and row[1]['gaze_y'] != 'None':
                        x = row[1]['gaze_x']
                        y = row[1]['gaze_y']
                        if row[1]['event'] != 'None':
                            event = row[1]['event']
                            label = row[1]['label_id']
                            while '[/' in label:
                                label = self._strip_label(label)
                            if event == 'ENTER':
                                enter = label
                                hover = 'None'
                            if event == 'HOVER':
                                hover = label
                            if event == 'LEAVE':
                                leave = label
                                hover = 'None'
                    if row[1]['fixation_x'] != 'None' and row[1]['fixation_y'] != 'None':
                        fix_x = row[1]['fixation_x']
                        fix_y = row[1]['fixation_y']
                    if row[1]['scroll_y'] != 'None':
                        scroll_y = row[1]['scroll_y']

                    pass
                else:
                    # time_stamp wasn't hit again
                    # create new data for DataFrame
                    if leave != 'None' or enter != 'None':
                        hover = 'None'

                    data = {'timestamp': old['timestamp'], 'gaze_x': x, 'gaze_y': y, 'fixation_x': fix_x,
                            'fixation_y': fix_y, 'scroll_y': scroll_y, 'enter': enter, 'hover': hover, 'leave': leave}

                    # create dataframe and append

                    if (x == 'None' and self.skip_empty_x) or (fix_x == 'None' and x == 'None'):

                        pass
                    else:
                        converted_df = pd.DataFrame(data=data, index=[1])

                        new_df = new_df.append(converted_df, ignore_index=True)


                    # reset the values except for events because if x,y==None => events would be set None
                    # events should only be reset if x,y != None
                    x, y, fix_x, fix_y, scroll_y = 'None', 'None', 'None', 'None', 'None'

                    # save the values of the current iteration
                    if row[1]['gaze_x'] != 'None' and row[1]['gaze_y'] != 'None':
                        x = row[1]['gaze_x']
                        y = row[1]['gaze_y']
                        # reset the events
                        enter, hover, leave = 'None', 'None', 'None'
                        if row[1]['event'] != 'None':
                            event = row[1]['event']
                            event = row[1]['event']
                            label = row[1]['label_id']
                            while '[/' in label:
                                label = self._strip_label(label)
                            if event == 'ENTER':
                                enter = label
                                hover = 'None'
                            if event == 'HOVER':
                                hover = label
                            if event == 'LEAVE':
                                leave = label
                                hover = 'None'
                    else:
                        # change the events accordingly
                        if hover == 'None':
                            if enter != 'None':
                                hover = enter
                                leave = 'None'
                                enter = 'None'
                        else:
                            leave = 'None'
                        pass
                    if row[1]['fixation_x'] != 'None' and row[1]['fixation_y'] != 'None':
                        # 2nd check, this time for 'nan'
                        if row[1]['fixation_x'] != 'nan' and row[1]['fixation_y'] != 'nan':
                            fix_x = row[1]['fixation_x']
                            fix_y = row[1]['fixation_y']
                        else:
                            fix_x = 'None'
                            fix_y = 'None'
                    if row[1]['scroll_y'] != 'None':
                        scroll_y = row[1]['scroll_y']

            # set this row as new old_row
            old = row[1]

        # save the last iteration
        if (x is None or x == "None") and self.skip_empty_x:
            pass
        else:
            data = {'timestamp': time_stamp, 'gaze_x': x, 'gaze_y': y, 'fixation_x': fix_x, 'fixation_y': fix_y,
                    'scroll_y': scroll_y, 'enter': enter, 'hover': hover, 'leave': leave}
            converted_df = pd.DataFrame(data=data, index=[1])

            new_df = new_df.append(converted_df, ignore_index=True)

        # save it to a file if an output path was given
        if output_path is not None:
            new_df.to_csv(output_path, sep='|', index=False, encoding='utf-8')

        # return the new DataFrame
        return new_df

    def _strip_label(self, label):
        """
        :param label: label which has to be stripped
        :return: label stripped from [*] label [/*]
        """
        result = re.search('\](.*)\[/', label).group(1)
        if result is not None:
            return result
        return label

if __name__ == '__main__':
    super_path = '/Users/max/Desktop/Test_Input/A04/GoogleNQ/main/9_nq_6p_a3_MzA5.html_Reading.csv'
    file_reader = PandasConverter()
    df = file_reader.get_new_format(super_path, 'test2.csv', skip_empty_x=True)
    """
    test_path = "/Users/max/Desktop/Arbeit/panda/A01/GoogleNQ/main/4_nq_5p_a0_LTIz.html_Rating.csv"
    file_reader = PandasConverter()
    file_reader2 = PandasConverter2()
    now = time.time()
    df = file_reader.get_new_format(test_path, 'test.csv')
    print(time.time()-now)
    now = time.time()
    df2 = file_reader2.get_new_format(test_path, 'test2.csv')
    print(time.time()-now)
    print(df.equals(df2))
    """