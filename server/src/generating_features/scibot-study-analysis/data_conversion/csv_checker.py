import pandas as pd

class CsvChecker:

    def __init__(self):

        pass


    def check(self, input_1, input_2):
        # TODO: check input

        # read data
        orig_data = pd.read_csv(input_1, delimiter="|", encoding='utf-8', float_precision='round_trip')
        new_data = pd.read_csv(input_2, delimiter="|", encoding='utf-8', float_precision='round_trip')

        # convert to list
        original_values =orig_data.values.tolist()
        new_values = new_data.values.tolist()

        num_errors = 0
        last_error_index = 0

        not_close_errors = 0
        essential_errors = 0
        # check data
        for i in range(len(original_values)):
            o_v = original_values[i]
            o_tmp = [o_v[0],o_v[1], o_v[2],o_v[6], o_v[7], o_v[8]]
            n_v = new_values[i]
            n_tmp = [n_v[0], n_v[1], n_v[2], n_v[7], n_v[8], n_v[9]]

            # TODO: extract right values
            if o_tmp != n_tmp:
                contains = False


                if o_tmp[3:] != ['None', 'None', 'None'] or  n_tmp[3:] != ['None', 'None', 'None']:
                    for x in n_tmp[3:]:
                        if x != "None":
                            if x in o_tmp:

                                contains = True
                                break
                    if not contains:
                        not_close_errors += 1

                """
                print(str(i) + " ___________")
                print(o_tmp)
                print(n_tmp)
                """
                if(n_tmp[:3]!=o_tmp[:3]):
                    essential_errors +=1

                num_errors += 1
                last_error_index = i

            pass
        pass
        print("errors: " + str(num_errors) + "  -> scroll_y, and label errors, which can be explained by screen resolution")
        print("last error: " + str(last_error_index))
        print("essential erros are " + str(essential_errors) + " -> errors like (timestamp, x, y)")
        print("errors which dont contain the same events: " + str(not_close_errors))



if __name__ == '__main__':
    checker = CsvChecker()
    path = "/Users/max/Desktop/input_folder/"
    input1 = path + "0_nq_6p_a1_NTc1.html_Reading.csv"
    input2 =  path + "0_nq_6p_a1_NTc1.html_Reading_.csv"
    checker.check(input1, input2)



    pass