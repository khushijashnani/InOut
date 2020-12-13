import 'dart:convert';

import 'package:app/graphs.dart';
import 'package:app/locations.dart';
import 'package:flutter/material.dart';
import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:firebase_core/firebase_core.dart' as firebase_core;
import 'package:geolocator/geolocator.dart';
import 'package:flutter/services.dart';
import 'package:location/location.dart';
import 'package:http/http.dart' as http;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await firebase_core.Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'InOut Hack',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Home(),
    );
  }
}

class Home extends StatefulWidget {
  Home({Key key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  File image;
  double height, width;
  Position currentPosition;
  bool loading = false;
  String text;

  List<String> choices = ['Upload an image','View statistics', 'View locations'];
  void choiceAction(String choice) async {
    if (choice == 'Upload an image') {
      File selected = await ImagePicker.pickImage(source: ImageSource.gallery);
      setState(() {
        image = selected;
        print(image);
        loading = true;
        text = "Uploading your image";
      });
      if (image != null) {
        String imageUrl;
        final String picture1 =
            "${DateTime.now().millisecondsSinceEpoch.toString()}.jpg";
        FirebaseStorage storage = FirebaseStorage.instance;
        UploadTask task1 = storage.ref().child(picture1).putFile(image);
        task1.then((res) async {
          imageUrl = await res.ref.getDownloadURL();
          print(imageUrl);
          // Position position = await Geolocator.getCurrentPosition(
          //     desiredAccuracy: LocationAccuracy.high);
          // print(position);

          setState(() {
            text = "Gathering your location";
          });
          Location location = new Location();

          bool _serviceEnabled;
          PermissionStatus _permissionGranted;
          LocationData _locationData;

          _serviceEnabled = await location.serviceEnabled();
          if (!_serviceEnabled) {
            _serviceEnabled = await location.requestService();
            if (!_serviceEnabled) {
              return;
            }
          }

          _permissionGranted = await location.hasPermission();
          if (_permissionGranted == PermissionStatus.denied) {
            _permissionGranted = await location.requestPermission();
            if (_permissionGranted != PermissionStatus.granted) {
              return;
            }
          }
          _locationData = await location.getLocation();
          print(_locationData.latitude);
          print(_locationData.longitude);

          var data = {
            "url": imageUrl,
            "latitude": _locationData.latitude,
            "longitude": _locationData.longitude
          };

          Map<String, String> headers = {
            "Content-type": "application/json",
            "Accept": "application/json",
            "charset": "utf-8"
          };

          setState(() {
            text = "Waiting to detect social distancing";
          });

          var response = await http.post(
              'https://c680f43c9351.ngrok.io/validate',
              headers: headers,
              body: json.encode(data));
          var jsonData = json.decode(response.body);
          String message = jsonData["msg"];
          print(message);

          setState(() {
            text = message + "\nWaiting to detect mask on faces";
          });
          
          var response2 = await http.post('https://c680f43c9351.ngrok.io/check_face_mask',headers: headers,
              body: json.encode(data));
          var jsonData2 = json.decode(response2.body);
          String message2 = jsonData2["msg"];
          print(message2);

          setState(() {
            loading = false;
            text = "";
          });
          Fluttertoast.showToast(
            timeInSecForIosWeb: 4,
            msg: message + " and " + message2,
            toastLength: Toast.LENGTH_LONG,
            gravity: ToastGravity.BOTTOM);
        
        });

      }
    } else if (choice == 'View locations') {
      Navigator.of(context)
          .push(MaterialPageRoute(builder: (context) => Locations()));
    }
    else if(choice == 'View statistics'){
      Navigator.of(context)
          .push(MaterialPageRoute(builder: (context) => GraphDetails()));
    }
  }

  @override
  Widget build(BuildContext context) {
    height = MediaQuery.of(context).size.height;
    width = MediaQuery.of(context).size.width;

    return Material(
      color: Colors.transparent,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.grey[900],
          title: Text("InOut Hack"),
          actions: [
            PopupMenuButton(
              icon: Icon(
                Icons.more_vert,
                color: Colors.white,
              ),
              onSelected: choiceAction,
              itemBuilder: (BuildContext context) {
                return choices.map((String choice) {
                  return PopupMenuItem(
                      textStyle: TextStyle(color: Colors.black),
                      value: choice,
                      child: Text(choice));
                }).toList();
              },
            ),
          ],
        ),
        body: loading ? 
        Container(
          color: Colors.grey[850],
          height: height,
          width: width,
          child: Center(
            child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(),
              SizedBox(height: 10,),
              Text(text)
            ],
          )
        ),
      ) : Container(
            width: width,
            height: height,
            child: Image.asset('assets/image.jpeg')),
      ),
    );
  }
}
