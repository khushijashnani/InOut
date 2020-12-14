from flask import Flask,request, jsonify
import pymongo
import urllib
from flask_restful import Resource, Api
from model.social_distance_detector import detectSocialDistancing
import numpy as np
import cv2
from datetime import datetime
from geopy.geocoders import Nominatim
from mask_model.detect_mask import detect_and_predict_mask
# import imutils
  
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
        data = request.get_json()
        url = data['url']
        url_response = urllib.request.urlopen(url)
        img_array = np.array(bytearray(url_response.read()), dtype=np.uint8)
        img = cv2.imdecode(img_array, -1)
        v = detectSocialDistancing(img)
        print(v)
        if (v[0] / v[1]) * 100 > 30:

            queryObject = {
                'latitude': data['latitude'],
                'longitude': data['longitude'],
                'datetime': datetime.now(),
                'imageURL': data['url'],
                'type': "Social Distancing Violation"
            }

            query = LocationTable.insert_one(queryObject)
            print(query)
        return {"msg": "Total people violating social distancing are : {}".format(v[0])}
        
class GraphDetails(Resource):
    
    def get(self):

        data = LocationTable.find({})

        output = {}
        dates = set()
        i = 0
        for x in data:
            output[i] = x
            date = output[i]['datetime']
            day, month, year = date.day, date.month, date.year
            output[i]['datetime'] = output[i]['datetime'].strftime("%d %B, %Y")
            date = datetime(year, month, day)
            dates.add(date)
            output[i].pop('_id')
            i += 1

        data = dict()
        data_mask = dict()
        data_social_distance = dict()

        for date in dates:
            data[date] = 0
            data_mask[date] = 0
            data_social_distance[date] = 0

        for key in output:
            thisDate = output[key]['datetime']
            for date in dates:
                if date.strftime("%d %B, %Y") == thisDate:
                    data[date] = data[date] + 1
                    if output[key]['type'] == "Social Distancing Violation":
                        data_social_distance[date] = data_social_distance[date] + 1
                    elif output[key]['type'] == "Mask Defaulter":
                        data_mask[date] = data_mask[date] + 1
                    break
        
        graph_1 = sorted(data.items(), key=lambda x: x[0])
        graph_1_keys = []
        graph_1_values = []
        for k, v in graph_1:
            graph_1_keys.append(k.strftime("%d %B"))
            graph_1_values.append(v)

        graph_2 = sorted(data_mask.items(), key=lambda x: x[0])
        graph_2_keys = []
        graph_2_values = []
        for k, v in graph_2:
            graph_2_keys.append(k.strftime("%d %B"))
            graph_2_values.append(v)

        graph_3 = sorted(data_social_distance.items(), key=lambda x: x[0])
        graph_3_keys = []
        graph_3_values = []
        for k, v in graph_3:
            graph_3_keys.append(k.strftime("%d %B"))
            graph_3_values.append(v)

        output['graph_1_key'] = graph_1_keys
        output['graph_1_value'] = graph_1_values
        output['graph_2_key'] = graph_2_keys
        output['graph_2_value'] = graph_2_values
        output['graph_3_key'] = graph_3_keys
        output['graph_3_value'] = graph_3_values
        return output

class LocationDetails(Resource):

    def get(self):
        data = LocationTable.find({})
        print(data)
        locations = dict()
        geolocator = Nominatim(user_agent = 'https')
        i = 0
        for x in data:
            date = x['datetime']
            day, month, year = date.day, date.month, date.year
            date = datetime(year, month, day)

            if (datetime.now() - date).days <= 7:
                location = dict()
                
                st = str(x['latitude'])+', '+str(x['longitude'])

                location['latitude'] = x['latitude']
                location['longitude'] = x['longitude']
                location['address'] = geolocator.reverse(st).address
                location['date'] = date.strftime("%d %B, %Y")
                location['type'] = x['type']
                locations[i] = location
                i += 1

        return locations

class MaskTest(Resource):
    
    def post(self):

        data = request.get_json()
        imageUrl = data['url']
        url_response = urllib.request.urlopen(imageUrl)
        img_array = np.array(bytearray(url_response.read()), dtype=np.uint8)
        img = cv2.imdecode(img_array, -1)
        
        (locs, preds) = detect_and_predict_mask(img)
        length_ = len(preds)
        mask_count = 0
        for pred in preds:
            if pred[0] > pred[1]:
                mask_count += 1         
        print(length_,mask_count)


        if ((length_ - mask_count) / length_) * 100 > 10:
    
            queryObject = {
                'latitude': data['latitude'],
                'longitude': data['longitude'],
                'datetime': datetime.now(),
                'imageURL': data['url'],
                'type': "Mask Defaulter"
            }

            query = LocationTable.insert_one(queryObject)
            print(query)
        return {"msg": "Total people not wearing the mask are : {}".format(length_ - mask_count)}

api = Api(app)
api.add_resource(Add, '/insert-one/<string:name>/<int:id>')
api.add_resource(Validate, '/validate')
api.add_resource(GraphDetails, '/graph_details')
api.add_resource(LocationDetails, '/location_details')
api.add_resource(MaskTest, '/check_face_mask')

if __name__ == '__main__': 
    app.run(debug=True) 