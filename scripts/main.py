import pandas as pd
from countries_data import clean_data
def load_data():
    clean_world_data = clean_data()
    return clean_world_data


# print (load_data())


