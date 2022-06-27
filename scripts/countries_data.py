import pandas as pd

def clean_data():
    # Import the world internet data from world bank and rename columns for merging with location data
    world_data= pd.read_csv("../data/world_bank_internet_data.csv", skiprows=[2395,2396,2397,2398,2399,2400])
    world_data = world_data.replace("..",0)
    world_data.rename(columns={"Country Name": "Country", "Country Code": "Codes"}, inplace=True)
    #Import the coordinate csv file, rename columns for merging with each other later on
    coordinates = pd.read_csv("..data/world_country.csv")
    coordinates.rename(columns={"iso_con" : "Codes", "lat": "Latitude", "lon": "Longitude"},inplace=True)
    coordinates.drop(columns=["Unnamed: 0", "country"],inplace=True)
    # Merge the world_data with the coordinates
    final_world = pd.merge(world_data, coordinates, on="Codes", how="left")
    
    return final_world