from gen_granular_data.granular_data_processor import GranularDataProcessor
from gen_tract_data.tract_data_processor import TractDataProcessor
from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class BusinessData(Resource):
    def get(self):
        granular_data = granular_data_proc.serve_granular_data()
        return granular_data

class BusinessDataForTract(Resource):
    def get(self, tract_num):
        

class TractData(Resource):
    def get(self):
        tract_data = tdp.serve_tract_data()
        return tract_data


api.add_resource(BusinessData, '/get_business_data')
api.add_resource(BusinessDataForTract, '/get_business_data/<tract_num>')
api.add_resource(TractData, '/get_tract_data')

if __name__ == '__main__':
    granular_data_proc = GranularDataProcessor()
    tdp = TractDataProcessor()
    app.run(port=9500, debug=True)