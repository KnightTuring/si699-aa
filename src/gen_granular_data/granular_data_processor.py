import csv
import json
import pandas as pd

class GranularDataProcessor:
    def __init__(self) -> None:
        pass

    def serve_granular_data(self):
        # for now read the file data and serve it as a list of json objects
        all_rows = []
        input_file = csv.DictReader(open("/Users/knightturing/UMich/Sem5_Winter2023/SI699_project/codebase/si699-aa/resources/yelp_enriched_data_with_tract.csv"))
        for row in input_file:
            all_rows.append(row)
        all_rows = self.filter_granular_data(all_rows)
        return all_rows

    def serve_granular_data_for_tract(self, tract_num):
        print(f"Fetching data for tract {tract_num}")
        df = pd.read_csv("/Users/knightturing/UMich/Sem5_Winter2023/SI699_project/codebase/si699-aa/resources/yelp_enriched_data_with_tract.csv")
        tract_data = df[df['census_tract_fips'] == int(tract_num)].to_dict(orient='records')
        print(f"Tratcf data: {tract_data}")
        all_rows = self.filter_granular_data(tract_data)
        return all_rows

    def filter_granular_data(self, all_data):
        all_filtered_data = []
        i = 0
        for row in all_data:
            row_data = {}
            coord_str_data = row['coordinates'].replace("'", "\"")
            coord_data = json.loads(coord_str_data)
            row_data['id'] = str(i+1)
            row_data['lat'] = coord_data['latitude']
            row_data['lng'] = coord_data['longitude']
            row_data['name'] = row['name']
            row_data['alias'] = row['alias']
            row_data['yelp_review_count'] = row['review_count']
            row_data['rating'] = row['rating']
            row_data['price'] = row['price']
            row_data['crime_count'] = row['crime_count']
            row_data['census_tract_fips'] = row['census_tract_fips']
            row_data['url'] = row['url']
            all_filtered_data.append(row_data)
            i += 1
        return all_filtered_data

if __name__ == "__main__":
    granular_data_proc = GranularDataProcessor()
    data = granular_data_proc.serve_granular_data()
    print(data)
