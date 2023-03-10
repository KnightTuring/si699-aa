from flask import Flask
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class Initialize(Resource):
    def get(self):
        return {'hello': 'world'}

class ServeBusinessData(Resource):
    def get(self):
        return [{'name': 'Test_1', 'lat': 42.36414, 'lng': -83.08835, 'avg_rating': 4.5},
        {'name': 'Test_2', 'lat': 42.3128699, 'lng': -83.12296, 'avg_rating': 4.0}]

api.add_resource(Initialize, '/')
api.add_resource(ServeBusinessData, '/ServeBData')

if __name__ == '__main__':
    app.run(debug=True)