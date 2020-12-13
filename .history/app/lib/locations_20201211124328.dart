import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:bubble_tab_indicator/bubble_tab_indicator.dart';

class Locations extends StatefulWidget {
  Locations({Key key}) : super(key: key);

  @override
  _LocationsState createState() => _LocationsState();
}

class _LocationsState extends State<Locations> with SingleTickerProviderStateMixin {
  List<List<double>> l;
  double height, width;
  TabController tabController;

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
    tabController = TabController(length: 2, vsync: this);
    // getlocations();
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
        Tab(text: "Your events"),
        Tab(
          text: "Your reviews",
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
      body: ListView(
        children: [
          Container(
            height: height,
            child: Scaffold(
              body: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  width: width * 0.9,
                  height: height,
                  child: Column(
                    children: <Widget>[
                      _getTabBar(),
                      Container(
                        height: 450,
                        child: _getTabBarView(
                          <Widget>[no_masks_tab(), social_distancing_tab()],
                        ),
                      )
                    ],
                  ),
                ),
              ),
            ),
          )
        ],
      ),
    );
  }

  Widget no_masks_tab() {
    return Text("In no masks tab");
  }

  Widget social_distancing_tab() {
    return Text("In social distancing tab");
  }
}
