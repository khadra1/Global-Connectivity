import pandas as pd
import os 

def load_data():
    output={}
    # Import the world internet data from world bank and rename columns for merging with location data
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', "world_bank_internet_data.csv")
    world_data = pd.read_csv(data_path, skipfooter=433)
    world_data.replace("..",0)
    #Rename the Country and Country Codes column to allow merging later on
    world_data.rename(columns={"Country Name": "Country", "Country Code": "Codes"}, inplace=True)
    # Remove the brackets and it the duplicated value in the Year columns 
    world_data = world_data.rename(columns={col: col.split('[')[0] for col in world_data.columns})
    # Import the coordinate csv file, rename columns for merging with each other later on
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', "world_country.csv")
    coordinates = pd.read_csv(data_path)
    #Rename the Countr Codes column to allow merging later on and long/lat for clarity
    coordinates.rename(columns={"iso_con" : "Codes", "lat": "Latitude", "lon": "Longitude"},inplace=True)
    # Drop unnecessary columns
    coordinates.drop(columns=["Unnamed: 0", "country"],inplace=True)
    # Merge the world_data with the coordinates
    final_world = pd.merge(world_data, coordinates, on="Codes", how="left")
    final_world.drop(columns=['Series Code', 'Codes'], axis=1, inplace=True)
    cols = [2,3,4,5,6,7,8,9,10]
    final_world.drop(final_world.columns[cols],axis=1,inplace=True)
    #Import the regions data from csv file
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data', "world_bank_internet_data.csv")
    world_regions = pd.read_csv(data_path, skiprows=range(1,1954), skipfooter=5)
    # Replace all ".." with 0
    world_regions = world_regions.replace("..",0)
    # #Rename the Country and Country Codes columns
    world_regions.rename(columns={"Country Name": "Country", "Country Code": "Codes"}, inplace=True)
    # # Remove the brackets and the duplicated value in the Year columns 
    world_regions = world_regions.rename(columns={col: col.split('[')[0] for col in world_regions.columns})
    world_regions.drop(columns=['Series Code', 'Codes'], axis=1, inplace=True)
    world_regions.drop(world_regions.columns[cols],axis=1,inplace=True)
    
    output["world"]=final_world.to_json()
    output["world_regions"]=world_regions.to_json()

    # print(final_world["2014 [YR2014]"])
    return output
# print (load_data())

# def main():

