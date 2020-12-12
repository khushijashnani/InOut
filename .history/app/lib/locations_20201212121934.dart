import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:bubble_tab_indicator/bubble_tab_indicator.dart';
import 'package:maps_launcher/maps_launcher.dart';


class Locations extends StatefulWidget {
  Locations({Key key}) : super(key: key);

  @override
  _LocationsState createState() => _LocationsState();
}
class _LocationsState extends State<Locations> {

  TabController tabController;
  bool loading = true;
  List<Map<dynamic, dynamic>> noMask = [];
  List<Map<dynamic, dynamic>> noSocialDistance = [];
  double height, width;

  getlocations() async {
    var response = await http.get('https://6d3d0baea9a9.ngrok.io/location_details');
    var jsonData = json.decode(response.body);
    Map<dynamic, dynamic> data = jsonData;
    print(data.keys);
    print(data.values);
    
    setState(() {

      data.forEach((key, value) async { 
        if (value['type'] == "Social Distancing Violation") {
          noSocialDistance.add(value);
        } else {
          noMask.add(value);
        }
      });

      print(noSocialDistance);
      print(noMask);

      loading = false;
    });
  }

  void initState() {
    // TODO: implement initState
    super.initState();
    tabController = TabController(length: 2, vsync: this);
    getlocations();
    // maskdetection();
  }

  TabBar _getTabBar() {
    return TabBar(
      unselectedLabelColor: Colors.black,
      indicatorColor: Colors.white,
      indicatorSize: TabBarIndicatorSize.tab,
      indicator: new BubbleTabIndicator(
        indicatorHeight: 43.0,
        indicatorColor: Colors.blue,
        indicatorRadius: 10,
        tabBarIndicatorSize: TabBarIndicatorSize.label,
      ),
      tabs: <Widget>[
        Tab(text: "No Masks"),
        Tab(
          text: "Social Distancing",
        ),
      ],
      controller: tabController,
    );
  }

  TabBarView _getTabBarView(tabs) {
    return TabBarView(
      children: tabs,
      controller: tabController,
    );
  }

  @override
  Widget build(BuildContext context) {

    height = MediaQuery.of(context).size.height;
    width = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: AppBar(
        title: Text("Crowded locations"),
        elevation: 0,
      ),
      body: loading ? 
      CircularProgressIndicator() : ListView(
        children: [
          SizedBox(height: width * 0.05),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: width * 0.9,
                alignment: Alignment.center,
                height: height - 70,
                child: Scaffold(
                  body: Container(
                    width: width * 0.9,
                    alignment: Alignment.center,
                    height: height - 70,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        _getTabBar(),
                        SizedBox(height: 5),
                        Container(
                          height: height-155,
                          child: _getTabBarView(
                            <Widget>[no_masks_tab(), social_distancing_tab()],
                          ),
                        )
                      ],
                    ),
                  ),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }

  Widget no_masks_tab() {
    return ListView.builder(
      // primary: false,
      // shrinkWrap: true,
      // physics: NeverScrollableScrollPhysics(),
      itemCount: noMask.length,
      itemBuilder: (context, index) {
        return card(noMask[index]);
      }
    );
  }

  Widget social_distancing_tab() {
    return ListView.builder(
      itemCount: noSocialDistance.length,
      itemBuilder: (context, index) {
        return card(noSocialDistance[index]);
      }
    );
  }

  Widget card(Map map) {
    return Padding(
      padding: const EdgeInsets.only(top: 8.0, bottom: 8, left: 5, right: 5),
      child: Material(
        borderRadius: BorderRadius.all(Radius.circular(10)),
        elevation: 5,
        shadowColor: Colors.black,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(20, 15, 20, 10),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Container(
                width: width * 0.65,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      map['address'],
                      //"B/ 404, Suraj Plaza, opp. Dena bank, station road, Bhayandar(W), Thane, 401101",
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.black
                      ),
                    ),
                    SizedBox(height: 10,),
                    Text(
                      map['date'],
                      //"11th Dec, 2020",
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey
                      ),
                    )
                  ],
                ),
              ),

              InkWell(
                borderRadius: BorderRadius.all(Radius.circular(20)),
                onTap: () async {
                  // MapsLauncher.launchCoordinates(
                  //   map['latitude'], map['longitude'], 'Google Headquarters are here');
                  // final availableMaps = await MapLauncher.installedMaps;
                  // print(availableMaps); // [AvailableMap { mapName: Google Maps, mapType: google }, ...]

                  // await availableMaps.first.showMarker(
                  //   coords: Coords(map['latitude'], map['longitude']),
                  //   title: "Ocean Beach",
                  // );
                  await MapsLauncher.launchQuery(map['address']);
                },
                child: Icon(
                  Icons.arrow_forward_ios,
                  color: Colors.blue,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
