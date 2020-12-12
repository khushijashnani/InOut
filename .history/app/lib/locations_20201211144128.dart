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
      body: ListView(
        children: [
          SizedBox(height: width * 0.05),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: width * 0.9,
                alignment: Alignment.center,
                height: height,
                child: Scaffold(
                  body: Container(
                    width: width * 0.9,
                    alignment: Alignment.center,
                    height: height,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        _getTabBar(),
                        Container(
                          height: height,
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
      primary: false,
      shrinkWrap: true,
      physics: NeverScrollableScrollPhysics(),
      itemCount: 6,
      itemBuilder: (context, index) {
        return card();
      }
    );
  }

  Widget social_distancing_tab() {
    return ListView.builder(
      itemCount: 6,
      itemBuilder: (context, index) {
        return card();
      }
    );
  }

  Widget card() {
    return Padding(
      padding: const EdgeInsets.only(top: 8.0, bottom: 8, left: 5, right: 5),
      child: Material(
        borderRadius: BorderRadius.all(Radius.circular(30)),
        elevation: 10,
        shadowColor: Colors.black,
        child: Padding(
          padding: const EdgeInsets.fromLTRB(10, 20, 20, 10),
          child: Column(
            children: [
              Text(
                "B/ 404, Suraj Plaza, opp. Dena bank, station road, Bhayandar(W), Thane, 401101",
                style: TextStyle(
                  fontSize: 20,
                  color: Colors.black
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
