import pandas as pd
import countries_data
def load_data():
    clean_world_data = countries_data.clean_data()
    return clean_world_data


print (load_data())


