import configparser

class ConfigReader:
    def __init__(self) -> None:
        CONFIG_FILE_PATH = "../../config/app.config"
        self.api_key_section = "KEYS"
        self.api_key_names = ["YelpKey", "GeocodingKey", "WalkScoreKey"]
        # read config file
        self.config = configparser.ConfigParser()
        self.config.read(CONFIG_FILE_PATH)

    def fetch_all_api_keys(self):
        all_keys = []
        for key_name in self.api_key_names:
            all_keys.append(self.config[self.api_key_section][key_name])
        return all_keys

    def fetch_api_key(self, service_name):
        return self.config[self.api_key_section][service_name]

if __name__ == "__main__":
    conf_obj = ConfigReader()
    print(conf_obj.fetch_all_api_keys())
    val = conf_obj.fetch_api_key("YelpKey")
    print(f"Config file value: {val}")
