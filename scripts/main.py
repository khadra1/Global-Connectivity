import pandas as pd
# from countries_data import clean_data
def load_data():
    world_data = pd.read_csv("../data/world_bank_internet_data.csv", skiprows=[2395,2396,2397,2398,2399,2400])
    world_data.replace("..",0)

    world_data.rename(columns={"Country Name": "Country"}, inplace=True)

    coordinates = pd.read_csv("../data/world_coordinates.csv")

    final_world = pd.merge(world_data, coordinates, on="Country")
    return final_world
# print (load_data())


