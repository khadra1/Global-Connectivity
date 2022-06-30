import pandas as pd
import os
import json


def load_data(filter1, filter2):
    output = {}
    # Import the world internet data from world bank and rename columns for merging with location data
    data_path = os.path.join(os.path.dirname(
        __file__), '..', 'data', 'world_bank_internet_data.csv')
    world_data = pd.read_csv(data_path, skipfooter=446, engine="python")
    world_data.replace("..", 0)
    # Rename the Country and Country Codes column to allow merging later on
    world_data.rename(
        columns={'Country Name': 'Country', 'Country Code': 'Codes'}, inplace=True)
    # Remove the brackets and it the duplicated value in the Year columns
    world_data = world_data.rename(
        columns={col: col.split('[')[0] for col in world_data.columns})
    world_data.columns = world_data.columns.str.strip()
    cols = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    world_data.drop(world_data.columns[cols], axis=1, inplace=True)

    # Import the coordinate csv file, rename columns for merging with each other later on
    data_path = os.path.join(os.path.dirname(
        __file__), '..', 'data', "world_country.csv")
    coordinates = pd.read_csv(data_path)
    # Rename the Country Codes column to allow merging later on and long/lat for clarity
    coordinates.rename(
        columns={'iso_con': 'Codes', 'lat': 'Latitude', 'lon': 'Longitude'}, inplace=True)
    # Drop unnecessary columns
    coordinates.drop(columns=['Unnamed: 0', 'country'], inplace=True)
    # Merge the world_data with the coordinates
    final_world = pd.merge(world_data, coordinates, on="Codes", how="left")

    # Turn the Year columns into Rows
    data = pd.melt(final_world, id_vars=[
                   'Country', 'Codes', 'Series Name', 'Longitude', 'Latitude'], var_name='Year', value_name='Values')
    # Creating dataframes from each unique value in Series Name column
    world1 = data[data['Series Name'] ==
        'Individuals using the Internet (% of population)'].copy()
    world2 = data[data['Series Name'] == 'Secure Internet servers'].copy()
    world3 = data[data['Series Name'] ==
        'Secure Internet servers (per 1 million people)'].copy()
    world4 = data[data['Series Name'] ==
        'Mobile cellular subscriptions'].copy()
    world5 = data[data['Series Name'] ==
        'Fixed broadband subscriptions'].copy()
    world6 = data[data['Series Name'] ==
        'Fixed broadband subscriptions (per 100 people)'].copy()
    world7 = data[data['Series Name'] ==
        'Fixed telephone subscriptions'].copy()
    world8 = data[data['Series Name'] ==
        'Fixed telephone subscriptions (per 100 people)'].copy()

    # Dropping Series Name column and renaming values column to the 8 unique values we extracted from Series Name column
    world1.drop(columns=['Series Name'], inplace=True)
    world1.rename(columns={
                  'Values': 'Individuals using the Internet (% of population)'}, inplace=True)
    world2.drop(columns=['Series Name'], inplace=True)
    world2.rename(columns={'Values': 'Secure Internet servers'}, inplace=True)
    world3.drop(columns=['Series Name'], inplace=True)
    world3.rename(columns={
                  'Values': 'Secure Internet servers (per 1 million people)'}, inplace=True)
    world4.drop(columns=['Series Name'], inplace=True)
    world4.rename(
        columns={'Values': 'Mobile cellular subscriptions'}, inplace=True)
    world5.drop(columns=['Series Name'], inplace=True)
    world5.rename(
        columns={'Values': 'Fixed broadband subscriptions'}, inplace=True)
    world6.drop(columns=['Series Name'], inplace=True)
    world6.rename(columns={
                  'Values': 'Fixed broadband subscriptions (per 100 people)'}, inplace=True)
    world7.drop(columns=['Series Name'], inplace=True)
    world7.rename(
        columns={'Values': 'Fixed telephone subscriptions'}, inplace=True)
    world8.drop(columns=['Series Name'], inplace=True)
    world8.rename(columns={
                  'Values': 'Fixed telephone subscriptions (per 100 people)'}, inplace=True)

    # Resetting Index
    world1.reset_index(drop=True, inplace=True)
    world2.reset_index(drop=True, inplace=True)
    world3.reset_index(drop=True, inplace=True)
    world4.reset_index(drop=True, inplace=True)
    world5.reset_index(drop=True, inplace=True)
    world6.reset_index(drop=True, inplace=True)
    world7.reset_index(drop=True, inplace=True)
    world8.reset_index(drop=True, inplace=True)
    world = pd.merge(pd.merge(pd.merge(pd.merge(pd.merge(pd.merge(
        pd.merge(world1, world2), world3), world4), world5), world6), world7), world8)
    # Reading the ITU excel file region sheet to clean and turn into json object
    data_path = os.path.join(os.path.dirname(__file__), '..', 'data',
                             'ITU_regional_global_Key_ICT_indicator_aggregates_rev1_Jan_2022.xlsx')
    temp_df = pd.read_excel(data_path, header=None, sheet_name="By BDT region")
    # Getting the first table
    temp_df.iloc[3:10, 0:18]
    # Getting the first column names
    table_name = temp_df.iloc[2, 0]

    # dictionary of tables with key as table name and value as dataframe
    table_list = {}
    # year list
    year_list = list(range(2005, 2022))
    # range start at 4(3), all the way to row 92 with a step of 9
    for i in range(4, 92, 9):
        # table name, 2 rows from where the table start at 0 (1st) column
        table_name = temp_df.iloc[i-2, 0]
        # selecting range of rows and range of columns to extract a table into a dataframe
        region_df = temp_df.iloc[i:i+6, 0:18]
        region_df.reset_index(drop=True, inplace=True)
        # column names (year)
        column_names = [table_name] + year_list
        # using the year list and table names as column names
        region_df.columns = column_names
        table_list[table_name] = region_df

    output = {}
    output['filter1list'] = list(world_data['Series Name'].unique())
    output['filter1'] = filter1
    output['filter2list'] = list(world_data['Country'].unique())
    output['filter2'] = filter2
    world_data = world_data.loc[world_data['Series Name'] == filter1]
    world_data = world_data.loc[world_data['Country'] == filter2]
    output['x'] = list(world_data.columns.values)[4:]
    output['y'] = world_data.values.tolist()[0]
    output['Country'] = world['Country'].tolist()
    output['Longitude'] = world['Longitude'].tolist()
    output['Latitude'] = world['Latitude'].tolist()
    output['Year'] = world['Year'].tolist()
    output['Region'] = region_df['Individuals using the Internet'].tolist()
    


  
    return output
# print (load_data())
# def main():
