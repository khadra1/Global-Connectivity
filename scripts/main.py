import pandas as pd
import os 
# from countries_data import clean_data
def load_data():
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', "world_bank_internet_data.csv")
      
    world_data = pd.read_csv(data_path, skiprows=[2395,2396,2397,2398,2399,2400])
    world_data.replace("..",0)
    world_data.rename(columns={"Country Name": "Country"}, inplace=True)

    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', "world_coordinates.csv")
    coordinates = pd.read_csv(data_path)

    final_world = pd.merge(world_data, coordinates, on="Country")
    print(final_world)
    return final_world
# print (load_data())


