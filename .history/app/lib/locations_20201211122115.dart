import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
// import 'package:bubble_tab_indicator/bubble_tab_indicator.dart';

class Locations extends StatefulWidget {
  Locations({Key key}) : super(key: key);

  @override
  _LocationsState createState() => _LocationsState();
}

class _LocationsState extends State<Locations> {
  List<List<double>> l;
  double height, width;

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
    // getlocations();
    // maskdetection();
  }

  // TabBar _getTabBar() {
  //   return TabBar(
  //     unselectedLabelColor: Colors.white,
  //     indicatorColor: BACKGROUND,
  //     indicatorSize: TabBarIndicatorSize.tab,
  //     indicator: new BubbleTabIndicator(
  //       indicatorHeight: 43.0,
  //       indicatorColor: Colors.yellow[800],
  //       indicatorRadius: 10,
  //       tabBarIndicatorSize: TabBarIndicatorSize.label,
  //     ),
  //     tabs: <Widget>[
  //       Tab(text: "Your events"),
  //       Tab(
  //         text: "Your reviews",
  //       ),
  //     ],
  //     controller: tabController,
  //   );
  // }

  @override
  Widget build(BuildContext context) {

    height = MediaQuery.of(context).size.height;
    width = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: AppBar(
        title: Text("Crowded locations"),
      ),
      body: ListView(
        children: [
          Container(
            height: height,
            child: Scaffold(
              body: Container(
                height: height,
                child: Column(
                  children: <Widget>[
                    // _getTabBar(),
                    // Container(
                    //   height: 450,
                    //   child: _getTabBarView(
                    //     <Widget>[eventsTab(), reviewsTab()],
                    //   ),
                    // )
                  ],
                ),
              ),
            ),
          )
        ],
      ),
    );
  }
}
