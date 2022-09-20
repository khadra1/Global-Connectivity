import pandas as pd
import os
import json
from json import dumps

def world_data_processor(filename):
    '''
    This is a file loader
    :param filename: insert file name
    :return: world_data dataframe
    '''
    # Import the world internet data from world bank and rename columns for merging with location data

    world_data = pd.read_csv(f'./db/{filename}', skipfooter=446, engine="python")
    world_data = world_data.replace("..", 0)
    # Rename the Country and Country Codes column to allow merging later on
    world_data.rename(
        columns={'Country Name': 'Country', 'Country Code': 'Codes'}, inplace=True)
    # Remove the brackets and it the duplicated value in the Year columns
    world_data = world_data.rename(
        columns={col: col.split('[')[0] for col in world_data.columns})
    world_data.columns = world_data.columns.str.strip()
    cols = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    world_data.drop(world_data.columns[cols], axis=1, inplace=True)
    return world_data

def coordinate_processor(filename):
    '''
    This is a file loader
    :param filename: insert file name
    :return: coordinates dataframe
    '''

    # Import the coordinate csv file, rename columns for merging with each other later on

    coordinates = pd.read_csv(f'./db/{filename}')
    # Rename the Country Codes column to allow merging later on and long/lat for clarity
    coordinates.rename(
        columns={'iso_con': 'Codes', 'lat': 'Latitude', 'lon': 'Longitude'}, inplace=True)
    # Drop unnecessary columns
    coordinates.drop(columns=['Unnamed: 0', 'country'], inplace=True)
    return coordinates

def get_world_data(world_data, coordinates):
    '''
    This is a dataframe merger and transformer
    :param filename: datafarmes
    :return: final_world merged dataframe and transformed data df
    '''
    # Merge the world_data with the coordinates
    final_world = pd.merge(world_data, coordinates, on="Codes", how="left")
    # Find out if there are any NaN values for Latitude and Longitude and then drop them 
    final_world[final_world.isnull().any(axis=1)] 
    final_world.dropna(subset=['Latitude','Longitude'],inplace=True)
    # Turn the Year columns into Rows
    # Turn the Year columns into Rows
    data = pd.melt(final_world, id_vars=[
                   'Country', 'Codes', 'Series Name', 'Longitude', 'Latitude'], var_name='Year', value_name='Values')
    data.rename(columns={'Series Name': 'SeriesName'},inplace=True)
    data['Year']=data['Year'].astype(int)
    data['Values']=data['Values'].astype(float)
    data.to_json("../Resources/data_clean.json", orient="index", indent=4)
    return data

def get_gender_data(filename):

    '''
    This is a file loader
    :param filename: insert file name
    :return: gender_df dataframe
    '''

 # Reading the ITU excel file age and gender sheet to clean and turn into json object
    gender_df = pd.read_excel(f'./db/{filename}', skiprows=(0,1), sheet_name="Internet use by sex & age")
   # Get the gender tables from the excel file
    gender_df=gender_df.iloc[0:16,0:18] 
    gender_df.drop(gender_df.columns[[1,2,3,4,5,6,7,8]],axis=1,inplace=True)
    gender_df.drop([0,1,3,4,5,6,7,8,9],axis=0,inplace=True)
    gender_df.columns=['Percentage of individuals using the Internet, by sex', '% Total 2020','% Female 2020','% Male 2020']
    gender_df.reset_index(inplace=True, drop=True) 
    return gender_df

def get_age_data(filename):

    '''
    This is a file loader
    :param filename: insert file name
    :return: age_df dataframe
    '''

    age_df = pd.read_excel(f'./db/{filename}', skiprows=range(0,19),skipfooter=10 , sheet_name="Internet use by sex & age")
    age_table_name=age_df.iloc[0,0]
    # Get the age tables from the gender_age excel file
    age_df = age_df.iloc[3:17,0:8]
    age_df.drop([4,5,6,7,8,9,10],axis=0, inplace=True)
    age_df.drop(age_df.columns[[1,2,3,4]],axis=1,inplace=True)
    age_df.columns=[age_table_name,'% Total 2020','% Youth(15-24) 2020','% Rest of Population 2020']
    age_df.reset_index(inplace=True, drop=True)  
    return age_df


def get_world_bank_region_data(filename):
    '''
    This is a file loader
    :param filename: insert file name
    :return: regions_data dataframe
    '''

    global_regions = pd.read_excel(f'./db/{filename}', skipfooter=5 , sheet_name='Data')
    ## Remove the brackets and the duplicated value in the Year columns 
    global_regions = global_regions.rename(columns={col: col.split('[')[0] for col in global_regions.columns})
    # Remove space in Year columns
    global_regions.columns = global_regions.columns.str.strip()
    # Drop unncessary columns
    global_regions.drop(columns=['Country Code', 'Series Code'],inplace=True)
    # Rename Country column
    global_regions.rename(columns={'Country Name': 'Country'}, inplace=True)
    # Turn Series Name rows into columns using Year column value as value
    regions_data = global_regions.pivot(index='Country', columns='Series Name', values='2021')\
            .reset_index()
    regions_data.columns.name=None
    
    indexes = regions_data.index
    for index in indexes:
        if index.startswith('Borrowed'):
            regions_data.loc[index,'Cat'] = 'Borrowed'
        elif index.startswith('Made') or  index.startswith('Use') or  index.startswith('Used') :
            regions_data.loc[index,'Cat'] = 'Payment'
        elif index.startswith('Received') :
            regions_data.loc[index,'Cat'] = 'Received'
        elif index.startswith('Saved') or  index.startswith('Store') :
            regions_data.loc[index,'Cat'] = 'Saving'

    # regions_data[regions_data['Cat']=='Saving'].transpose()
    regions_data.transpose()
    return regions_data


def get_world_bank_countries_data(filename):
   
    '''
    This is a file loader
    :param filename: insert file name
    :return: countries_data dataframe
    '''

    # Reading the World Bank Countries excel file into DataFrame
    global_countries = pd.read_excel(f'./db/{filename}', skipfooter=5 , sheet_name='Data')
    # Remove the brackets and the duplicated value in the Year columns 
    global_countries = global_countries.rename(columns={col: col.split('[')[0] for col in global_countries.columns})
    # Remove space in Year columns
    global_countries.columns = global_countries.columns.str.strip()
    # Drop unncessary columns
    global_countries.drop(columns=['Series Code'],inplace=True)
    # Rename Country column
    global_countries.rename(columns={'Country Name': 'Country', 'Country Code': 'Codes'}, inplace=True)
    # Replace all ".." with 0
    global_countries = global_countries.replace("..",0)
    # Turn Series Name rows into columns using Year column value as value
    countries_data = global_countries.pivot_table(index=['Country', 'Codes'], columns='Series Name', values='2021')\
            .reset_index()
    countries_data.columns.name=None
    return countries_data



def get_region_tables(filename):   
     # Reading the ITU excel file region sheet to clean and turn into json object
    temp_df = pd.read_excel(f'./db/{filename}', header=None, sheet_name="By BDT region")
    temp_df = temp_df.iloc[2:-14,0:18].copy()
    temp_df.reset_index(drop=True, inplace=True)

    out = {}
    col_names ={}
    for i in range(1,18):
        col_names[i] = 2005 + i - 1
    for table_index in range(10):
        col_names[0] = temp_df.iloc[table_index*9,0]
        if table_index != 8:
            out[col_names[0]]=temp_df.iloc[2+table_index*9:2+table_index*9+6,:].rename(columns=col_names).reset_index(drop=True)
    return out



def apply_filters(world_data, data, age_df, gender_df,region_tables, filter1, filter2):
    # Empty dict to store the data cleaned in main.py for use in index.html and app.js
    output = {}
    # filter for world countries bar chart and world map
    output['filter1list'],output['filter2list'] = list(world_data['Series Name'].unique()),list(world_data['Country'].unique())
    output['filter1'],output['filter2'] = filter1, filter2
    world_data = world_data.loc[(world_data['Series Name'] == filter1) & (world_data['Country'] == filter2)]


    # x, y variables for the countries bar chart
    output['x'], output['y'] = list(world_data.columns.values)[4:], world_data.values.tolist()[0]

    # # Variables for the Gender and Age charts 
    output['genderData']= gender_df.to_json(orient='index', indent=4)
    output['ageData']= age_df.to_json(orient='index', indent=4)

    # output['usageData']=regions_data.tojson(orient='index', indent=4)

    # World regions internet usage excel sheet
    tracedata = {}
    table_list_keys = list(region_tables.keys())
    for i in range(len(table_list_keys)):
        tempdf = region_tables[table_list_keys[i]]
        regions = tempdf[table_list_keys[i]].tolist()
        tempregions = {}
        for j in range(len(regions)):
            tempregions[regions[j]] = tempdf.values.tolist()[j][1:]
        tracedata[table_list_keys[i]] = tempregions
    output['tracedata'] = tracedata
    output['dataWorld']=data.to_json(orient='index', indent=4)

    return output   


def load_data(filter1, filter2):

    '''
    This is a data loader
    :param filename: filter variables
    :return: output
    '''

    world_data = world_data_processor('world_bank_internet_data.csv')
    coordinates = coordinate_processor("world_country.csv")
    data = get_world_data(world_data, coordinates)
    gender_df = get_gender_data('ITU_regional_global_Key_ICT_indicator_aggregates_rev1_Jan_2022.xlsx')
    age_df = get_age_data('ITU_regional_global_Key_ICT_indicator_aggregates_rev1_Jan_2022.xlsx')
    region_tables = get_region_tables('ITU_regional_global_Key_ICT_indicator_aggregates_rev1_Jan_2022.xlsx')
    output = apply_filters(world_data, data, age_df, gender_df,region_tables, filter1, filter2)
    # countries_data = get_world_bank_countries_data('Data_Extract_From_Global_Financial_Inclusion_countries.xlsx')
    # regions_data = get_world_bank_region_data('Data_Extract_From_Global_Financial_Inclusion_regions.xlsx')

    return output

