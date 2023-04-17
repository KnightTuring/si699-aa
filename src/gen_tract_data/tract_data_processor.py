import pandas as pd
import csv

class TractDataProcessor:
    def __init__(self) -> None:
        pass

    def serve_tract_data(self):
        # read file
        # tract_summarized_df = pd.read_csv("/Users/knightturing/UMich/Sem5_Winter2023/SI699_project/codebase/si699-aa/resources/tract_characteristics.csv")
        all_rows = []
        input_file = csv.DictReader(open("/Users/knightturing/UMich/Sem5_Winter2023/SI699_project/codebase/si699-aa/resources/tract_characteristics.csv"))
        for row in input_file:
            all_rows.append(row)
        filtered_tract_dicts = self.filter_tract_data(all_rows)
        return filtered_tract_dicts

    def filter_tract_data(self, tract_rows):
        all_tract_dicts = []
        for tract_row in tract_rows:
            fips = tract_row['FIPS']
            population = tract_row['pop']
            property_val = tract_row['Property Values']
            kirwan_opp_index = tract_row['Kirwan Opportunity Index']
            total_count_reviews = tract_row['total_reviews']
            mean_rating = tract_row['mean_rating']
            avg_sentiment = tract_row['avg_sent']
            biz_count = tract_row['business_ct']
            all_tract_dicts.append({
                'FIPS': fips,
                'population': population,
                'property_val': property_val,
                'kirwan_opp_index': kirwan_opp_index,
                'total_review_count': total_count_reviews,
                'mean_rating': mean_rating,
                'avg_sent': avg_sentiment,
                'biz_count': biz_count
            })
        return all_tract_dicts

def main():
    tdp = TractDataProcessor()
    print(tdp.serve_tract_data())

if __name__ == "__main__":
    main()

