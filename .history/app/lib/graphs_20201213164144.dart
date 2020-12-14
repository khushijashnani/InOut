import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:charts_flutter/flutter.dart' as charts;

class MaskGraphData {
  int date;
  int count;

  MaskGraphData(this.date, this.count);
}

class SocialDistanceData {
  int date;
  int count;

  SocialDistanceData(this.date, this.count);
}

class BarGraphData {
  String date;
  int count;

  BarGraphData(this.date, this.count);
}

class GraphDetails extends StatefulWidget {
  GraphDetails({Key key}) : super(key: key);

  @override
  _GraphDetailsState createState() => _GraphDetailsState();
}

class _GraphDetailsState extends State<GraphDetails> {
  double screenHeight, screenWidth;
  bool loading = true;
  var customTickFormatter_mask;
  var customTickFormatter_sd;
  var series_bar, series_mask, series_sd;

  // List graph_1_keys = [];
  // List graph_2_keys = [];
  // List graph_3_keys = [];
  // List graph_1_values = [];
  // List graph_2_values = [];
  // List graph_3_values = [];
  List<MaskGraphData> mask_line = [];
  List<SocialDistanceData> sd_line = [];
  List<BarGraphData> bar = [];
  Map<int, String> maskIndexToLabel = {};
  Map<int, String> sdIndexToLabel = {};

  getgraph() async {
    
    var response =
        await http.get('https://5d4fc775e84b.ngrok.io/graph_details');
    var jsonData = json.decode(response.body);

    Map<dynamic, dynamic> data = jsonData;

    // setState(() {
    //   graph_1_keys = data['graph_1_key'];
    //   graph_2_keys = data['graph_2_key'];
    //   graph_3_keys = data['graph_3_key'];
    //   graph_1_values = data['graph_1_value'];
    //   graph_2_values = data['graph_2_value'];
    //   graph_3_values = data['graph_3_value'];
    //   loading = false;
    // });
    // print(graph_1_keys);
    // print(graph_1_values);
    // print(graph_2_keys);
    // print(graph_2_values);
    // print(graph_3_keys);
    // print(graph_3_values);

    // line_mask

    var graph_2_keys = data['graph_2_key'];
    var graph_2_values = data['graph_2_value'];

    print(data);
    print("\n");
    print(graph_2_keys);
    print("\n");
    print(graph_2_values);

    setState(() {
      for (int i = 0; i < graph_2_keys.length; i++) {
        maskIndexToLabel[i] = graph_2_keys[i].toString().substring(0, 6);
        MaskGraphData obj = new MaskGraphData(i, graph_2_values[i]);
        mask_line.add(obj);
      }
      print("Mask Line " + mask_line.length.toString());
      print(mask_line);
      print(maskIndexToLabel[0]);
      // print(maskIndexToLabel[2]);
    });

    series_mask = [
      charts.Series(
          id: 'Mask',
          domainFn: (MaskGraphData data, _) => data.date,
          measureFn: (MaskGraphData data, _) => data.count,
          data: mask_line,
          labelAccessorFn: (MaskGraphData data, _) => "${data.count}")
    ];

    print(series_mask);

    // line_sd

    var graph_3_keys = data['graph_3_key'];
    var graph_3_values = data['graph_3_value'];

    setState(() {
      for (int i = 0; i < graph_3_keys.length; i++) {
        sdIndexToLabel[i] = graph_3_keys[i].toString().substring(0, 6);;
        SocialDistanceData obj = SocialDistanceData(i, graph_3_values[i]);
        sd_line.add(obj);
      }
      print("SD Line " + sd_line.length.toString());
    });

    series_sd = [
      charts.Series(
          id: 'SD Line',
          domainFn: (SocialDistanceData data, _) => data.date,
          measureFn: (SocialDistanceData data, _) => data.count,
          data: sd_line,
          labelAccessorFn: (SocialDistanceData data, _) => "${data.count}")
    ];

    //bar graph data
    // setState(() {
    //   for (int i = 0; i < graph_1_keys.length; i++) {
    //     BarGraphData cat = BarGraphData(graph_1_keys[i], graph_1_values[i]);
    //     bar.add(cat);
    //   }
    // });
    // series_bar = [
    //   charts.Series(
    //       id: 'Bar Graph',
    //       domainFn: (BarGraphData data, _) => data.date,
    //       measureFn: (BarGraphData data, _) => data.count,
    //       data: bar,
    //       labelAccessorFn: (BarGraphData data, _) => "${data.count}")
    // ];

    setState(() {
      loading = false;
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getgraph();
  }

  @override
  Widget build(BuildContext context) {
    screenWidth = MediaQuery.of(context).size.width;
    screenHeight = MediaQuery.of(context).size.height;

    customTickFormatter_mask = charts.BasicNumericTickFormatterSpec((num value) {
      print(value);
      int index = value.toInt();
      print(index);
      return maskIndexToLabel[index];
    });

    customTickFormatter_sd = charts.BasicNumericTickFormatterSpec((num value) {
      print(value);
      int index = value.toInt();
      return sdIndexToLabel[index];
    });

    return Scaffold(
      appBar: AppBar(
        title: Text("Violation statistics"),
      ),
      backgroundColor: Colors.black,
      body: loading ? Container(
        height: screenHeight,
        width: screenWidth,
        child: Center(
          child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircularProgressIndicator(),
            SizedBox(height: 10,),
            Text("Loading violation data")
          ],
        )),
      ) : SingleChildScrollView(
        child: Column(
          children: [

            SizedBox(height: 20,),

            Container(
              margin: EdgeInsets.all(10),
              height: 300,
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Container(
                  child: drawMaskLineGraph(),
                )),
            ),

            SizedBox(height: 20,),

            Container(
              margin: EdgeInsets.all(10),
              height: 300,
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Container(
                  child: drawSocialDistanceLineGraph(),
                )),
            )
            // Container(
            //   margin: EdgeInsets.all(10),
            //   width: screenWidth*0.9,
            //   height: 300,
            //   child: drawLineGraph(
            //             sd_line, series_sd, customTickFormatter_sd),

            // ),
            // Container(
            //   margin: EdgeInsets.all(10),
            //   height: 300,
            //   width: screenWidth * 0.9,
            //   child: buildBarGraph(bar, series_bar),
            // )
          ],
        ),
      ),
    );
  }

  Widget drawMaskLineGraph() {
    return Container(
      height: 300.0,
      width: mask_line.length > 4 ? screenWidth * 0.9 + (mask_line.length - 4) * 0.225 : screenWidth * 0.95,
      child: ShaderMask(
        child: charts.LineChart(
          series_mask,
          animate: true,
          animationDuration: Duration(milliseconds: 2000),
          defaultRenderer: charts.LineRendererConfig(
            includeArea: true,
            includePoints: true,
            includeLine: true,
            stacked: false,
          ),
          domainAxis: charts.NumericAxisSpec(
            tickProviderSpec: new charts.BasicNumericTickProviderSpec(
                desiredTickCount: mask_line.length),
            tickFormatterSpec: customTickFormatter_mask,
            renderSpec: charts.SmallTickRendererSpec(
              minimumPaddingBetweenLabelsPx: 10,
              tickLengthPx: 0,
              //labelOffsetFromAxisPx: 12,
              //labelRotation: -30,
              labelStyle: charts.TextStyleSpec(
                lineHeight: 2.5,
                color: charts.MaterialPalette.white,
                fontSize: 10,
              ),
              axisLineStyle:
                  charts.LineStyleSpec(color: charts.MaterialPalette.white),
            ),
          ),
          primaryMeasureAxis: charts.NumericAxisSpec(
            showAxisLine: false,
            tickProviderSpec: new charts.BasicNumericTickProviderSpec(
                desiredTickCount: mask_line.length - 1),
            renderSpec: charts.GridlineRendererSpec(
              tickLengthPx: 0,
              labelOffsetFromAxisPx: 12,
              labelStyle: charts.TextStyleSpec(
                  color: charts.MaterialPalette.white, fontSize: 10),
              lineStyle: charts.LineStyleSpec(
                color: charts.MaterialPalette.white,
              ),
              axisLineStyle: charts.LineStyleSpec(
                color: charts.MaterialPalette.white,
              ),
            ),
          ),
          behaviors: [
            new charts.SeriesLegend(
                position: charts.BehaviorPosition.top,
                showMeasures: true,
                entryTextStyle:
                    charts.TextStyleSpec(color: charts.Color.white)),
            new charts.SlidingViewport(),
            new charts.PanAndZoomBehavior(),
            new charts.ChartTitle('Mask Defaulters',
                behaviorPosition: charts.BehaviorPosition.top,
                titleOutsideJustification: charts.OutsideJustification.start,
                innerPadding: 25,
                titleStyleSpec: charts.TextStyleSpec(
                    color: charts.Color.fromHex(code: '#ffffff'),
                    fontWeight: "Bold")),
            new charts.ChartTitle('Date',
                behaviorPosition: charts.BehaviorPosition.bottom,
                titleOutsideJustification:
                    charts.OutsideJustification.middleDrawArea,
                titleStyleSpec: charts.TextStyleSpec(
                    color: charts.MaterialPalette.blue.shadeDefault)),
            new charts.ChartTitle('No of Responses',
                behaviorPosition: charts.BehaviorPosition.start,
                titleOutsideJustification:
                    charts.OutsideJustification.middleDrawArea,
                titleStyleSpec: charts.TextStyleSpec(
                    color: charts.MaterialPalette.blue.shadeDefault)),
          ],
        ),
        shaderCallback: (Rect bounds) {
          return LinearGradient(
            begin: Alignment.bottomCenter,
            end: Alignment.topCenter,
            //colors: [Color(0xFF8A2387), Color(0xFFE94057), Color(0xFFF27121)],//[Color(0xFFFFB540), Color(0xFFFA4169)],Color(0xFF0083B0),
            colors: [Color(0xFF00d2ff), Color(0xFF56CCF2), Color(0xFFffffff)],
            stops: [
              0.0,
              0.5,
              1.0,
            ],
          ).createShader(bounds);
        },
        blendMode: BlendMode.srcATop,
      ),
    );
  }

  Widget drawSocialDistanceLineGraph() {
    return Container(
      height: 300.0,
      width: sd_line.length > 4 ? screenWidth * 0.9 + (sd_line.length - 4) * 0.225 : screenWidth * 0.95,
      child: ShaderMask(
        child: charts.LineChart(
          series_sd,
          animate: true,
          animationDuration: Duration(milliseconds: 2000),
          defaultRenderer: charts.LineRendererConfig(
            includeArea: true,
            includePoints: true,
            includeLine: true,
            stacked: false,
          ),
          domainAxis: charts.NumericAxisSpec(
            tickProviderSpec: new charts.BasicNumericTickProviderSpec(
                desiredTickCount: sd_line.length),
            tickFormatterSpec: customTickFormatter_sd,
            renderSpec: charts.SmallTickRendererSpec(
              minimumPaddingBetweenLabelsPx: 10,
              tickLengthPx: 0,
              //labelOffsetFromAxisPx: 12,
              //labelRotation: -30,
              labelStyle: charts.TextStyleSpec(
                lineHeight: 2.5,
                color: charts.MaterialPalette.white,
                fontSize: 10,
              ),
              axisLineStyle:
                  charts.LineStyleSpec(color: charts.MaterialPalette.white),
            ),
          ),
          primaryMeasureAxis: charts.NumericAxisSpec(
            showAxisLine: false,
            tickProviderSpec: new charts.BasicNumericTickProviderSpec(
                desiredTickCount: sd_line.length - 1),
            renderSpec: charts.GridlineRendererSpec(
              tickLengthPx: 0,
              labelOffsetFromAxisPx: 12,
              labelStyle: charts.TextStyleSpec(
                  color: charts.MaterialPalette.white, fontSize: 10),
              lineStyle: charts.LineStyleSpec(
                color: charts.MaterialPalette.white,
              ),
              axisLineStyle: charts.LineStyleSpec(
                color: charts.MaterialPalette.white,
              ),
            ),
          ),
          behaviors: [
            new charts.SeriesLegend(
                position: charts.BehaviorPosition.top,
                showMeasures: true,
                entryTextStyle:
                    charts.TextStyleSpec(color: charts.Color.white)),
            new charts.SlidingViewport(),
            new charts.PanAndZoomBehavior(),
            new charts.ChartTitle('Social Distancing',
                behaviorPosition: charts.BehaviorPosition.top,
                titleOutsideJustification: charts.OutsideJustification.start,
                innerPadding: 25,
                titleStyleSpec: charts.TextStyleSpec(
                    color: charts.Color.fromHex(code: '#ffffff'),
                    fontWeight: "Bold")),
            new charts.ChartTitle('Date',
                behaviorPosition: charts.BehaviorPosition.bottom,
                titleOutsideJustification:
                    charts.OutsideJustification.middleDrawArea,
                titleStyleSpec: charts.TextStyleSpec(
                    color: charts.MaterialPalette.blue.shadeDefault)),
            new charts.ChartTitle('Responses',
                behaviorPosition: charts.BehaviorPosition.start,
                titleOutsideJustification:
                    charts.OutsideJustification.middleDrawArea,
                titleStyleSpec: charts.TextStyleSpec(
                    color: charts.MaterialPalette.blue.shadeDefault)),
          ],
        ),
        shaderCallback: (Rect bounds) {
          return LinearGradient(
            begin: Alignment.bottomCenter,
            end: Alignment.topCenter,
            //colors: [Color(0xFF8A2387), Color(0xFFE94057), Color(0xFFF27121)],//[Color(0xFFFFB540), Color(0xFFFA4169)],Color(0xFF0083B0),
            colors: [Colors.deepPurple, Colors.deepPurple[200]],
            // stops: [
            //   0.0,
            //   0.5,
            //   1.0,
            // ],
          ).createShader(bounds);
        },
        blendMode: BlendMode.srcATop,
      ),
    );
  }

  // Widget buildBarGraph(data, series) {
  //   return Padding(
  //     padding: const EdgeInsets.all(0.0),
  //     child: Container(
  //       height: 300,
  //       width: screenWidth * 0.9,
  //       child: ShaderMask(
  //         child: charts.BarChart(
  //           series,
  //           animate: true,
  //           animationDuration: Duration(milliseconds: 3000),
  //           defaultRenderer: new charts.BarRendererConfig(
  //               cornerStrategy: const charts.ConstCornerStrategy(30),
  //               barRendererDecorator: new charts.BarLabelDecorator<String>(
  //                   insideLabelStyleSpec: charts.TextStyleSpec(
  //                       color: charts.Color.white, fontSize: 10),
  //                   outsideLabelStyleSpec: charts.TextStyleSpec(
  //                       color: charts.Color.white, fontSize: 10),
  //                   labelPosition: charts.BarLabelPosition.outside,
  //                   labelAnchor: charts.BarLabelAnchor.end),
  //               minBarLengthPx: 10),
  //           domainAxis: new charts.OrdinalAxisSpec(
  //               renderSpec: new charts.SmallTickRendererSpec(
  //                   labelStyle: new charts.TextStyleSpec(
  //                       fontSize: 10, color: charts.MaterialPalette.white),
  //                   lineStyle: new charts.LineStyleSpec(
  //                       color: charts.Color.fromHex(code: '#102733'))),
  //               showAxisLine: false),
  //           primaryMeasureAxis: new charts.NumericAxisSpec(
  //               renderSpec: new charts.GridlineRendererSpec(
  //                   labelStyle: new charts.TextStyleSpec(
  //                       fontSize: 12, // size in Pts.
  //                       color: charts.MaterialPalette.white),
  //                   lineStyle: new charts.LineStyleSpec(
  //                       color: charts.Color.fromHex(code: '#102733'))),
  //               showAxisLine: false),
  //           behaviors: [
  //             new charts.ChartTitle(
  //               'Voilations',
  //               behaviorPosition: charts.BehaviorPosition.top,
  //               titleOutsideJustification: charts.OutsideJustification.start,
  //               innerPadding: 25,
  //             ),
  //             new charts.ChartTitle('Count',
  //                 behaviorPosition: charts.BehaviorPosition.bottom,
  //                 titleOutsideJustification:
  //                     charts.OutsideJustification.middleDrawArea),
  //             new charts.ChartTitle('Date',
  //                 behaviorPosition: charts.BehaviorPosition.start,
  //                 titleOutsideJustification:
  //                     charts.OutsideJustification.middleDrawArea),
  //           ],
  //         ),
  //         shaderCallback: (Rect bounds) {
  //           return LinearGradient(
  //             begin: Alignment.bottomCenter,
  //             end: Alignment.topCenter,
  //             //colors: [Color(0xFF8A2387), Color(0xFFE94057), Color(0xFFF27121)],//[Color(0xFFFFB540), Color(0xFFFA4169)],
  //             colors: [Color(0xFF2980B9), Color(0xFF6DD5FA), Color(0xFFffffff)],
  //             stops: [
  //               0.0,
  //               0.4,
  //               1.0,
  //             ],
  //           ).createShader(bounds);
  //         },
  //         blendMode: BlendMode.srcATop,
  //       ),
  //     ),
  //   );
  // }
}
