from flask import Flask
from flask_restful import Resource, Api
from granular_data_processor import GranularDataProcessor

app = Flask(__name__)
api = Api(app)
granular_data_processor = GranularDataProcessor()

class Initialize(Resource):
    def get(self):
        return {'hello': 'world'}

class ServeBusinessData(Resource):
    def get(self):
        granular_data = granular_data_processor.serve_granular_data()
        return granular_data

api.add_resource(Initialize, '/')
api.add_resource(ServeBusinessData, '/ServeBData')

if __name__ == '__main__':
    app.run(debug=True)