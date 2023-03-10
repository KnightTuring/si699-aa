class YelpDataProcessor:
    def __init__(self, config, location, sort_by, offset) -> None:
        # self.base_api_url = f"https://api.yelp.com/v3/businesses/search?location={location}&sort_by={sort_by}&offset={offset}"
        self.base_api_url = f"https://api.yelp.com/v3/businesses/search?location={location}&sort_by={sort_by}&offset={offset}"

    def fetch_business_data(self):
        pass