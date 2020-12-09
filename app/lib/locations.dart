import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class Locations extends StatefulWidget {
  Locations({Key key}) : super(key: key);

  @override
  _LocationsState createState() => _LocationsState();
}

class _LocationsState extends State<Locations> {
  List<List<double>> l;

  getlocations() async {
    var response = await http.get('http://375ca8f1ebdf.ngrok.io/register');
    var jsonData = json.decode(response.body);
  }

  maskdetection() async {
    var response = await http.get('http://375ca8f1ebdf.ngrok.io/check_mask');
    var jsonData = json.decode(response.body);
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getlocations();
    maskdetection();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Crowded locations"),
      ),
      body: ListView.builder(
        itemBuilder: (context, index) {
          return Container(child: ListTile());
        },
      ),
    );
  }
}
