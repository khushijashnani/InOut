from flask import Flask 
import pymongo
import urllib
from flask_restful import Resource, Api
  
# Replace your URL here. Don't forget to replace the password. 
connection_url = 'mongodb+srv://priyavmehta:priyavmehta@inout.a9ism.mongodb.net/inout?retryWrites=true&w=majority'

app = Flask(__name__) 
client = pymongo.MongoClient(connection_url)
app.config['SECRET_KEY'] = 'assembler'

# Database
Database = client.get_database('inout')
# Table
LocationTable = Database.Locations

class Add(Resource):
    
    def get(self, name, id):
        queryObject = { 
            'Name': name, 
            'ID': id
        } 
        query = LocationTable.insert_one(queryObject) 
        return "Query inserted...!!!"

class Validate(Resource):

    def post(self):
        pass

api = Api(app)
api.add_resource(Add, '/insert-one/<string:name>/<int:id>')

if __name__ == '__main__': 
    app.run(debug=True) 