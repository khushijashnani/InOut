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

    // setState(() {
    //   for (int i = 0; i < graph_2_keys.length; i++) {
    //     maskIndexToLabel[i] = graph_2_keys[i].toString();
    //     MaskGraphData obj = MaskGraphData(i, graph_2_values[i]);
    //     mask_line.add(obj);
    //   }
    //   print("Mask Line" + mask_line.length.toString());
    //   print(mask_line);
    //   print(maskIndexToLabel);
    //   // print(maskIndexToLabel[2]);
    // });

    // series_mask = [
    //   charts.Series(
    //       id: 'Mask Line',
    //       domainFn: (MaskGraphData data, _) => data.date,
    //       measureFn: (MaskGraphData data, _) => data.count,
    //       data: mask_line,
    //       labelAccessorFn: (MaskGraphData data, _) => "${data.count}")
    // ];

    // line_sd

    // setState(() {
    //   for (int i = 0; i < graph_3_keys.length; i++) {
    //     sdIndexToLabel[i] = graph_3_keys[i].toString();
    //     GraphData obj = GraphData(i, graph_3_values[i]);
    //     sd_line.add(obj);
    //   }
    //   print("SD Line" + sd_line.length.toString());
    // });

    // series_sd = [
    //   charts.Series(
    //       id: 'SD Line',
    //       domainFn: (GraphData data, _) => data.date,
    //       measureFn: (GraphData data, _) => data.count,
    //       data: sd_line,
    //       labelAccessorFn: (GraphData data, _) => "${data.count}")
    // ];

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

    customTickFormatter_mask =
        charts.BasicNumericTickFormatterSpec((num value) {
      print(value);
      int index = value.toInt();
      print(index);
      return "Hello";
    });
    customTickFormatter_sd = charts.BasicNumericTickFormatterSpec((num value) {
      print(value);
      int index = value.toInt();
      return "Hello";
    });

    return Scaffold(
      appBar: AppBar(
        title: Text("Violation statistics"),
      ),
      backgroundColor: Colors.black,
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Container(
            //   margin: EdgeInsets.all(10),
            //   width: screenWidth * 0.9,
            //   height: 300,
            //   child: drawLineGraph(
            //       mask_line, series_mask, customTickFormatter_mask),
            // ),
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

  // Widget drawLineGraph(data_line, series_line, cus) {
  //   return Container(
  //     height: 300.0,
  //     width: screenWidth * 0.9,
  //     child: ShaderMask(
  //       child: charts.LineChart(
  //         series_line,
  //         animate: true,
  //         animationDuration: Duration(milliseconds: 2000),
  //         defaultRenderer: charts.LineRendererConfig(
  //           includeArea: true,
  //           includePoints: true,
  //           includeLine: true,
  //           stacked: false,
  //         ),
  //         domainAxis: charts.NumericAxisSpec(
  //           tickProviderSpec: new charts.BasicNumericTickProviderSpec(
  //               desiredTickCount: data_line.length),
  //           tickFormatterSpec: cus,
  //           renderSpec: charts.SmallTickRendererSpec(
  //             minimumPaddingBetweenLabelsPx: 10,
  //             tickLengthPx: 0,
  //             //labelOffsetFromAxisPx: 12,
  //             //labelRotation: -30,
  //             labelStyle: charts.TextStyleSpec(
  //               lineHeight: 2.5,
  //               color: charts.MaterialPalette.white,
  //               fontSize: 10,
  //             ),
  //             axisLineStyle:
  //                 charts.LineStyleSpec(color: charts.MaterialPalette.white),
  //           ),
  //         ),
  //         primaryMeasureAxis: charts.NumericAxisSpec(
  //           showAxisLine: false,
  //           tickProviderSpec: new charts.BasicNumericTickProviderSpec(
  //               desiredTickCount: data_line.length - 1),
  //           renderSpec: charts.GridlineRendererSpec(
  //             tickLengthPx: 0,
  //             labelOffsetFromAxisPx: 12,
  //             labelStyle: charts.TextStyleSpec(
  //                 color: charts.MaterialPalette.white, fontSize: 10),
  //             lineStyle: charts.LineStyleSpec(
  //               color: charts.MaterialPalette.white,
  //             ),
  //             axisLineStyle: charts.LineStyleSpec(
  //               color: charts.MaterialPalette.white,
  //             ),
  //           ),
  //         ),
  //         behaviors: [
  //           new charts.SeriesLegend(
  //               position: charts.BehaviorPosition.top,
  //               showMeasures: true,
  //               entryTextStyle:
  //                   charts.TextStyleSpec(color: charts.Color.white)),
  //           new charts.SlidingViewport(),
  //           new charts.PanAndZoomBehavior(),
  //           new charts.ChartTitle('Events V/s Attendees',
  //               behaviorPosition: charts.BehaviorPosition.top,
  //               titleOutsideJustification: charts.OutsideJustification.start,
  //               innerPadding: 25,
  //               titleStyleSpec: charts.TextStyleSpec(
  //                   color: charts.Color.fromHex(code: '#ffffff'),
  //                   fontWeight: "Bold")),
  //           new charts.ChartTitle('Count',
  //               behaviorPosition: charts.BehaviorPosition.bottom,
  //               titleOutsideJustification:
  //                   charts.OutsideJustification.middleDrawArea,
  //               titleStyleSpec: charts.TextStyleSpec(
  //                   color: charts.MaterialPalette.blue.shadeDefault)),
  //           new charts.ChartTitle('Attendees',
  //               behaviorPosition: charts.BehaviorPosition.start,
  //               titleOutsideJustification:
  //                   charts.OutsideJustification.middleDrawArea,
  //               titleStyleSpec: charts.TextStyleSpec(
  //                   color: charts.MaterialPalette.blue.shadeDefault)),
  //         ],
  //       ),
  //       shaderCallback: (Rect bounds) {
  //         return LinearGradient(
  //           begin: Alignment.bottomCenter,
  //           end: Alignment.topCenter,
  //           //colors: [Color(0xFF8A2387), Color(0xFFE94057), Color(0xFFF27121)],//[Color(0xFFFFB540), Color(0xFFFA4169)],Color(0xFF0083B0),
  //           colors: [Colors.blue, Colors.blueAccent],
  //           // stops: [
  //           //   0.0,
  //           //   0.5,
  //           //   1.0,
  //           // ],
  //         ).createShader(bounds);
  //       },
  //       blendMode: BlendMode.srcATop,
  //     ),
  //   );
  // }

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
