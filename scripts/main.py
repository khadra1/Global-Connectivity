import pandas as pd
import os 

def load_data():
    # Import the world internet data from world bank and rename columns for merging with location data
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', "world_bank_internet_data.csv")
    world_data = pd.read_csv(data_path, skiprows=[2395,2396,2397,2398,2399,2400])
    world_data.replace("..",0)
    world_data.rename(columns={"Country Name": "Country", "Country Code": "Codes"}, inplace=True)
    # Import the coordinate csv file, rename columns for merging with each other later on
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', "world_country.csv")
    coordinates = pd.read_csv(data_path)
    coordinates.rename(columns={"iso_con" : "Codes", "lat": "Latitude", "lon": "Longitude"},inplace=True)
    coordinates.drop(columns=["Unnamed: 0", "country"],inplace=True)
    # Merge the world_data with the coordinates
    final_world = pd.merge(world_data, coordinates, on="Codes", how="left")
    # print(final_world["2014 [YR2014]"])
    return final_world
# print (load_data())

# def main():

