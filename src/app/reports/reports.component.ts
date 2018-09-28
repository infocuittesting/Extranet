import { Component, OnInit } from '@angular/core';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { DashboardService } from '../dashboard/dashboard.service';
import * as jsPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'; import 'jspdf-autotable';
// import { StatisticsService } from "./statistics.service";
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { SessionStorageService } from "ngx-webstorage";
import { NgClass, DatePipe } from '@angular/common';
// import { StatisticsService } from "./statistics.service";
import { ReportsService } from "./reports.service";
import {Chart} from 'chart.js'
// import *as D3 from "d3";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  private chart: AmChart;

  constructor(private AmCharts: AmChartsService,
    private ReportsService: ReportsService,
    public session: SessionStorageService, private datePipe: DatePipe) { }
  public chartDatas = [];
  public getroomdetails=[] ;
  public cancelcount=[];
  public modifycount;
  LineChart = [];
  public getyear=[];
  staticdetails = [];

public charts = [];
  ngOnInit() {
    let statsParms={
      "business_id":this.session.retrieve("business_id")
    }
    console.log("business id is came",this.session.retrieve("business_id"))
    this.ReportsService.statistics(statsParms)
    .subscribe((resp: any) => {
      if (resp.ServiceStatus == 'Success') {
        this.staticdetails=resp.Result;
      //   this.getroomdetails= [
      //     {
      //       month:"June",          
      // standardRoomTotal:41,          
      // deluxRoomTotal:30,          
      // deluxSuiteRoomTotal:13,           
      // superiorRoomTotal:14,         
      //     year:2018 },        
      // {          
      //     month:"July",          
      // standardRoomTotal:91,          
      // deluxRoomTotal:70,           
      // deluxSuiteRoomTotal:32,           
      // superiorRoomTotal:23,         
      //     year:2018},          
      // {          
      //     month:"Augest",          
      // standardRoomTotal:45,         
      // deluxRoomTotal:59,           
      // deluxSuiteRoomTotal:43,           
      // superiorRoomTotal:20,           
      //     year:2018}];

    //availale count rooms   
this.chart = this.AmCharts.makeChart('chart10', {
  "theme": "light",
  'hideCredits':true,
"type": "serial",
'titleField': ['Standard Room'],
"dataProvider": this.staticdetails,
"valueAxes": [{
    //"unit": "%",
    "position": "left",
    "title": "Arrived Room Count",
}],
"startDuration": 1,
"graphs": [{
    "balloonText": "Standard Room in [[category]] ([[year]]): <b>[[value]]</b>",
    "fillAlphas": 0.9,
    "lineAlpha": 0.2,
    "labelText":'Standard',
    "title": "2004",
    "type": "column",
    "valueField": "standardRoomTotal"
}, {
    "balloonText": "Delux Room in [[category]] ([[year]]): <b>[[value]]</b>",
    "fillAlphas": 0.9,
    "lineAlpha": 0.2,
    "labelText":'Delux',
    "title": "2005",
    "type": "column",
    // "clustered":false,
    // "columnWidth":0.5,
    "valueField": "deluxRoomTotal"
}, {
  "balloonText": "Delux Suite Room in [[category]] ([[year]]): <b>[[value]]</b>",
  "fillAlphas": 0.9,
  "lineAlpha": 0.2,
  "labelText":'Delux Suite',
  "title": "2005",
  "type": "column",
  // "clustered":false,
 // "columnWidth":0.5,
  "valueField": "deluxSuiteRoomTotal"
}, {
"balloonText": "Superior Room in [[category]] ([[year]]): <b>[[value]]</b>",
"fillAlphas": 0.9,
"lineAlpha": 0.2,
"labelText":'Superior',
"title": "2005",
"type": "column",    
// "clustered":false,
//"columnWidth":0.5,
"valueField": "superiorRoomTotal"
}],
"plotAreaFillAlphas": 0.1,
"categoryField": "month",
"categoryAxis": {
    "gridPosition": "start"
},
"export": {
  "enabled": true,
  "menu": []
  },
//  "titles": [
//       {
//          "text": "",
//          "size": 15
//        }
//      ],
});

this.charts.push( this.chart );
}
});
    this.ReportsService.yearreservation()
    .subscribe((resp: any) => {
      // if (resp.ServiceStatus == 'Success') {
        this.getroomdetails = resp.Returnvalue;
        // this.cancelcount = resp.cancelcount;
        // this.modifycount = resp.Totalbookingcount;
        console.log("pie chrt work",this.getroomdetails);
        this.chartDatas=[];
        for(var i=0;i<this.getroomdetails.length;i++){
          this.chartDatas.push({
             'title':this.getroomdetails[i].title,
             'value':this.getroomdetails[i].value })
        }
        // this.getroomdetails=[];
          // console.log("$$$$$$",this.chartDatas);
        this.chart = this.AmCharts.makeChart('chart1', {
          'type': 'pie',
          'theme': 'light',
          'hideCredits':true,
          'dataProvider':this.chartDatas,
          'export': {
            "enabled": true,
            "menu": [],
           
          },
          'titleField': 'title',
          'valueField': 'value',
          'labelRadius': 5,
  
          'radius': '42%',
          'innerRadius': '60%',
          'labelText': '[[title]]',
         
          
        
          
        });
         this.charts.push(this.chart)
      });
      this.ReportsService.yearreservation()
      .subscribe((resp: any) => {
        // if (resp.ServiceStatus == 'Success') {
          this.getyear = resp.Returnvalue;
          console.log("get year",this.getyear)
      });
      // this.LineChart = new Chart('linechart',{
      //  type:'line',
      //  data:{
      //    labels:["jan","Feb","march","april","may","june","july","august","september","october","november","december"],
      //    datasets:[{
      //      label:"Number of items sold in months",
      //      data:[],
      //      fill:false,
      //      lineTension:0.2,
      //      borderColor:"red",
      //      borderwidth:1
      //    }],
      //    options:{
      //      title:{
      //        text:"Line Chart",
      //        display:true
      //      },
      //      scales:{
      //        yAxes:[{
      //          ticks:{
      //            beginAtZero:true
      //          }
      //        }]
      //      }
      //    }
      //   }
      // })
      
}
fetchrecord(start_date,end_date){
  console.log("its coming to chart")
  let statsParms = {
    
      "arrival_from":start_date,
      "arrival_to":end_date
  
  }
  this.ReportsService.statisticsDetails(statsParms)
    .subscribe((resp: any) => {
      // if (resp.ServiceStatus == 'Success') {
        this.getroomdetails = resp.Returnvalue;
        // this.cancelcount = resp.cancelcount;
        // this.modifycount = resp.Totalbookingcount;
        console.log("pie chrt work",this.getroomdetails);
        this.chartDatas=[];
        for(var i=0;i<this.getroomdetails.length;i++){
          this.chartDatas.push({
             'title':this.getroomdetails[i].title,
             'value':this.getroomdetails[i].value })
        }
        // this.getroomdetails=[];
          // console.log("$$$$$$",this.chartDatas);
        this.chart = this.AmCharts.makeChart('chart2', {
          'type': 'pie',
          'theme': 'light',
          'hideCredits':true,
          'dataProvider':this.chartDatas,
          'titleField': 'title',
          'valueField': 'value',
          'labelRadius': 5,

          'radius': '39%',
          'innerRadius': '50%',
          'labelText': '[[title]]',
          'export': {
            "enabled": true,
            "menu": [ ],
            
          }
        });
        this.charts.push( this.chart );
      });
      this.ReportsService.channeldetails(statsParms)
       .subscribe((resp: any) => {   
        this.getroomdetails = resp.Returnvalue;
        // this.cancelcount = resp.cancelcount;
        // this.modifycount = resp.Totalbookingcount;
        console.log("pie chrt work",this.getroomdetails);
        this.chartDatas=[];
        for(var i=0;i<this.getroomdetails.length;i++){
          this.chartDatas.push({
             'title':this.getroomdetails[i].title,
             'value':this.getroomdetails[i].value })
        }
        // this.getroomdetails=[];
          // console.log("$$$$$$",this.chartDatas);
        this.chart = this.AmCharts.makeChart('chart3', {
          'type': 'pie',
          'theme': 'light',
          'hideCredits':true,
          'dataProvider':this.chartDatas,
          'titleField': 'title',
          'valueField': 'value',
          'labelRadius': 5,

          'radius': '42%',
          'innerRadius': '0%',
          'labelText': '[[title]]',
          'export': {
            "enabled": true,
            "menu": [],
            
          }
        });
        this.charts.push( this.chart );
      });
      // this.getroomdetails = [];
      this.ReportsService.Roomoccupancy(statsParms)
      .subscribe((resp: any) => {   
        this.getroomdetails = resp.Returnvalue;
        // this.cancelcount = resp.cancelcount;
        // this.modifycount = resp.Totalbookingcount;
        console.log("pie chrt work",this.getroomdetails);
        this.chartDatas=[];
        for(var i=0;i<this.getroomdetails.length;i++){
          this.chartDatas.push({
             'title':this.getroomdetails[i].title,
             'value':this.getroomdetails[i].value })
        }
        // this.getroomdetails=[];
          // console.log("$$$$$$",this.chartDatas);
          this.chart = this.AmCharts.makeChart('chart4', {
            'type': 'pie',
            'theme': 'light',
            'hideCredits':true,
            'dataProvider':this.chartDatas,
            'titleField': 'title',
            'valueField': 'value',
            'labelRadius': 5,
  
            'radius': '42%',
            'innerRadius': '0%',
            'labelText': '[[title]]',
            'export': {
              "enabled": true,
              "menu": [ ],
             
            }
          });
          this.charts.push( this.chart );
      });
      //Booking vs conformation
      this.ReportsService.BookingvsConfirmation(statsParms)
      .subscribe((resp: any) => {   
        this.getroomdetails = resp.Returnvalue;
        // this.cancelcount = resp.cancelcount;
        // this.modifycount = resp.Totalbookingcount;
        console.log("BookingvsConfirmation",this.getroomdetails);
        this.chartDatas=[];
        for(var i=0;i<this.getroomdetails.length;i++){
          this.chartDatas.push({
             'title':this.getroomdetails[i].title,
             'value':this.getroomdetails[i].value })
        }
        // this.getroomdetails=[];
          // console.log("$$$$$$",this.chartDatas);
          this.chart = this.AmCharts.makeChart('chart5', {
            'type': 'pie',
            'theme': 'light',
            'hideCredits':true,
            'dataProvider':this.chartDatas,
            'titleField': 'title',
            'valueField': 'value',
            'labelRadius': 5,
  
            'radius': '42%',
            'innerRadius': '60%',
            'labelText': '[[title]]',
            'export': {
              "enabled": true,
              "menu":  [  ],
              
            }
          });
          this.charts.push( this.chart );
      });
    
      //Languages
      this.ReportsService.Languages(statsParms)
      .subscribe((resp: any) => {   
        this.getroomdetails = resp.Returnvalue;
        // this.cancelcount = resp.cancelcount;
        // this.modifycount = resp.Totalbookingcount;
        console.log("pie chrt work",this.getroomdetails);
        this.chartDatas=[];
        for(var i=0;i<this.getroomdetails.length;i++){
          this.chartDatas.push({
             'title':this.getroomdetails[i].title,
             'value':this.getroomdetails[i].value })
        }
        // this.getroomdetails=[];
          // console.log("$$$$$$",this.chartDatas);
          this.chart = this.AmCharts.makeChart('chart6', {
            'type': 'pie',
            'theme': 'light',
            'hideCredits':true,
            'dataProvider':this.chartDatas,
            'titleField': 'title',
            'valueField': 'value',
            'labelRadius': 5,
  
            'radius': '42%',
            'innerRadius': '60%',
            'labelText': '[[title]]',
            'export': {
              "enabled": true,
              "menu":  [ ],
             
            }
          });
          this.charts.push( this.chart );
      });
      //SMS
      this.ReportsService.Sms(statsParms)
      .subscribe((resp: any) => {   
        this.getroomdetails = resp.Returnvalue;
        // this.cancelcount = resp.cancelcount;
        // this.modifycount = resp.Totalbookingcount;
        console.log("pie chrt work",this.getroomdetails);
        this.chartDatas=[];
        for(var i=0;i<this.getroomdetails.length;i++){
          this.chartDatas.push({
             'title':this.getroomdetails[i].title,
             'value':this.getroomdetails[i].value })
        }
        // this.getroomdetails=[];
          // console.log("$$$$$$",this.chartDatas);
          this.chart = this.AmCharts.makeChart('chart7', {
            'type': 'pie',
            'theme': 'light',
            'hideCredits':true,
            'dataProvider':this.chartDatas,
            'titleField': 'title',
            'valueField': 'value',
            'labelRadius': 5,
  
            'radius': '42%',
            'innerRadius': '0%',
            'labelText': '[[title]]',
            'export': {
              "enabled": true,
              "menu":  [  ],
              
            }
          });
          this.charts.push( this.chart );
      });
      //country reservation
      this.ReportsService.countryreservation(statsParms)
      .subscribe((resp: any) => {   
        this.getroomdetails = resp.Returnvalue;
        // this.cancelcount = resp.cancelcount;
        // this.modifycount = resp.Totalbookingcount;
        console.log("pie chrt work",this.getroomdetails);
        this.chartDatas=[];
        for(var i=0;i<this.getroomdetails.length;i++){
          this.chartDatas.push({
             'title':this.getroomdetails[i].title,
             'value':this.getroomdetails[i].value })
        }
        // this.getroomdetails=[];
          // console.log("$$$$$$",this.chartDatas);
          this.chart = this.AmCharts.makeChart('chart8', {
            'type': 'pie',
            'theme': 'light',
            'hideCredits':true,
            'dataProvider':this.chartDatas,
            'titleField': 'title',
            'valueField': 'value',
            'labelRadius': 5,
  
            'radius': '42%',
            'innerRadius': '0%',
            'labelText': '[[title]]',
            'export': {
              "enabled": true,
               "menu": []

              
            }
          });
          this.charts.push( this.chart );
      });
}
// User count report in pdf file
public usercount = [];
public columns=[];
public rowsvalue=[];
public uservalue=[];
public rows = [];
public channelcount = [];
public channelrows=[];
public fun1_arr=[];

fun1(statsParms){

  this.ReportsService.channeldetails(statsParms)
  .subscribe((resp: any) => {   
    this.channelcount = resp.Returnvalue;
    console.log("this is come",this.channelcount)
    for(var i=0;i<this.channelcount.length;i++){
      
      this.channelrows.push([this.channelcount[i].title, this.channelcount[i].value])

      var columns = ["Title", "Value"];
      console.log("rowwww",this.channelrows)
    }
  });
  return(this.channelrows)
 }

DownloadPDF(start_date,end_date){
  // var jsPDF = require('jspdf');
  // require('jspdf-autotable');
  let statsParms = {
    
    "arrival_from":start_date,
    "arrival_to":end_date

}

console.log("startdate",statsParms)
  this.ReportsService.statisticsDetails(statsParms)
      .subscribe((resp: any) => {   
        this.usercount = resp.Returnvalue;
        console.log("this is come",this.usercount)
        for(var i=0;i<this.usercount.length;i++){
       
          this.rows.push([this.usercount[i].title, this.usercount[i].value,this.usercount[i].percentage])
       
         var columns = ["Title", "Count","percentage"];
       
          console.log("rowwww",this.rows)
          
        }
        let doc = new jsPDF('p', 'pt');
       
        doc.text("Booking Reservation", 10, 10)
        doc.autoTable( columns, this.rows, { startY: 20 });
      //  doc.autoTable( columns,  logBar = () => {
      //  console.log("Bar's value is: ");}
      //  , { startY: 20 }
      // );
        doc.save('usercount.pdf')
    
      });
      
// ***********************************

      // *****************************************
    

      // var columns = ["ID", "Name", "Country"];
      // var rows = [
      //     [1, "Shaw", "Tanzania"],
      //     [2, "Nelson", "Kazakhstan"],
      //     [3, "Garcia", "Madagascar"],
          
      // ];
  //  let doc = new jsPDF();
  //  doc.autoTable( this.columns, this.rows);
  // //  console.log("aw",this.chartDatas)
  // //  doc.text("hello", 10, 10)
  //  doc.save('usercount.pdf')
}

DownloadchannelPDF(start_date,end_date){
  let statsParms = {
    
    "arrival_from":start_date,
    "arrival_to":end_date

}

console.log("startdate",statsParms)
  this.ReportsService.channeldetails(statsParms)
      .subscribe((resp: any) => {   
        this.channelcount = resp.Returnvalue;
        console.log("this is come",this.channelcount)
        for(var i=0;i<this.channelcount.length;i++){
          // this.rowsvalue = []
          this.channelrows.push([this.channelcount[i].title, this.channelcount[i].value,this.channelcount[i].percentage])
          // this.rows.push(this.rowsvalue) 
          // console.log("new array",this.uservalue)
         var columns = ["Title", "Value","Percentage"];
          // var rows = [this.uservalue];
          console.log("rowwww",this.channelrows)
          
        }
        let doc = new jsPDF('p', 'pt');
         doc.text("Channelcount", 10, 10)
          doc.autoTable( columns, this.channelrows);
         //  console.log("aw",this.chartDatas)
         //  doc.text("hello", 10, 10)
          doc.save('channel.pdf')
      });
}
download(){
  var columns = [
    {title: "ID", dataKey: "id"},
    {title: "Name", dataKey: "name"}, 
    {title: "Country", dataKey: "country"}, 
    
];
var rows = [
    {"id": 1, "name": "Shaw", "country": "Tanzania"},
    {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
    {"id": 3, "name": "Garcia", "country": "Madagascar"}
  
];
var col1 = [
  {title: "ID", dataKey: "id"},
  {title: "Name", dataKey: "name"}, 
  {title: "Country", dataKey: "country"}, 
  
];
var rows1 = [
  {"id": 1, "name": "Shaw", "country": "Tanzania"},
  {"id": 2, "name": "Nelson", "country": "Kazakhstan"},
  {"id": 3, "name": "Garcia", "country": "Madagascar"}

];
 
// Only pt supported (not mm or in)
var doc = new jsPDF('p', 'pt');
// var res = doc.autoTableHtmlToJson(document.getElementById('tbl1'));
// doc.autoTable(res.columns, res.data);
doc.autoTable(columns, rows, { startY: 10 });

doc.autoTable(col1, rows1, { startY: 100 });

doc.save('table.pdf');
}
public monthdetails=[];
public month_name = [];
public month_val = [];
selectdropdown(roomtype){
  console.log("year is came",roomtype)
  let statsParms = {
     "year":roomtype.toString()
  }
  this.ReportsService.monthreservation(statsParms)
  .subscribe((resp: any) => {   
    this.monthdetails = resp.Returnvalue;
    // this.cancelcount = resp.cancelcount;
    // this.modifycount = resp.Totalbookingcount;
    console.log("month is came",this.monthdetails);
    // this.chartDatas=[];
    this.month_name = [];
    this.month_val = [];
    for(var i=0;i<this.monthdetails.length;i++){
      this.month_name.push(this.monthdetails[i].title)
      this.month_val.push(this.monthdetails[i].value)
    }
    console.log("month,value",this.month_name,this.month_val)
    this.chart = new Chart('chart9',{
    type:'line',
    data:{
      labels:this.month_name,
      datasets:[{
        label:"Number of reservation booked in months",
        data:this.month_val,
        fill:false,
        lineTension:1.0,
        borderColor:"green",
        borderwidth:2
      }],
      options:{
        title:{
          text:"Line Chart",
          display:true
        },
        scales:{
          yAxes:[{
            ticks:{
              beginAtZero:true
            }
          }]
        }
      }
     }
   })
  //  this.charts.push( this.chart );
  });
}
// generate pdf
 x:Number;
 exportChart() {
   // iterate through all of the charts and prepare their images for export
   var images = [];
  var pending = this.AmCharts.charts.length;
  console.log("pending**************",pending)
  for ( var i = 0; i < this.AmCharts.charts.length; i++ ) {
    var chart = this.AmCharts.charts[ i ];
    console.log("its came&&&&&&&&&&&&&&",chart)
    chart["export"].toJPG( {}, function() {
      this.toJPG( {
        multiplier: 2
      }, function( data ) {
        images.push( {
          "image": data,
          "fit": [ 523.28, 769.89 ]
        } );
        pending--;
        if ( pending === 0 ) {
          // all done - construct PDF
          chart.export.toPDF( {
            content: images
          }, function( data ) {
            this.download( data, "application/pdf", " .pdf" );
          } );
        }
      } );
    } );
  }

}
//   console.log("Starting export...");
//   // Define IDs of the charts we want to include in the report
//   var ids = [ "chartdiv2", "chartdiv3", "chartdiv4","chartdiv5","chartdiv6","chartdiv7"];


//  // Collect actual chart objects out of the AmCharts.charts array
//  var charts = {}
//  var charts_remaining = ids.length;
//  console.log("charts length",charts_remaining)
//  for (var i = 0; i < ids.length; i++) {
//    for (var x = 0; x < chart.charts.length; x++) {
//      if (chart.charts[x].div.id == ids[i])
//        charts[ids[i]] = chart.charts[x];
//    }
//  }

//  // Trigger export of each chart

//  for (var s in charts) {
//    if (charts.hasOwnProperty(s)) {
//      var chart = charts[s];
//      chart["export"].capture({}, function() {
//        this.toPNG({}, function(data) {

//          // Save chart data into chart object itself
//          this.setup.chart.exportedImage = data;

//          // Reduce the remaining counter
//          charts_remaining--;

//          // Check if we got all of the charts
//          if (charts_remaining == 0) {
//            // Yup, we got all of them
//            // Let's proceed to putting PDF together
//            generatePDF();
//          }

//        });
//      });
//    } 
  
  // function generatePDF() {

  //   // Log
    
  //   console.log("Generating PDF...");

  // }
// statics report


downloadReport(){
  var images = [];
  var pending = this.charts.length;
  console.log("length value*********",pending)
  for (var i = 0; i < this.charts.length; i++) {
      var chart = this.charts[i];
      var content = [];
      chart.export.capture({}, function () {
          var dataArray = this.toArray({
              withHeader: true
          });
          var columns = dataArray[0].length;
          var columnWidths = (Array(columns).join("auto,") + "*").split(","); // ["auto", ... "*"]
          //
          // EXTRA LOGS TO CHECK THE NUMBER OF COLUMNS (ALL SHOULD BE THE SAME)
          console.log("header: ", columns);
          console.log("widths: ", columnWidths.length);
          for (var i2 = 0; i2 < dataArray.length; i2++) {
              console.log("columns: ", dataArray[i2].length);
          }

          // GENERATE IMAGE
          this.toJPG({}, function (data) {

              // ADD IMAGE
              content.push({
                  "image": data,
                  "fit": [523.28, 769.89] // A4 Dimensions less 20px because of the page margins
              });

              // ADD TABLE
              content.push({
                  layout: 'headerLineOnly',
                  margin: [0, 20, 0, 0], // [left, top, right, bottom]
                  table: {
                      headerRows: 1,
                      widths: columnWidths,
                      body: dataArray
                  }
              });

              pending--;
              if (pending === 0) {
                  // all done - construct PDF
                  chart.export.toPDF({
                      content: content
                  }, function (data) {
                      this.download(data, "application/pdf", "Amchart.pdf");
                  });

                  // ADD PAGE BREAK
              } else {
                  content[content.length - 1].pageBreak = "after";
              }
          });
      });
  }   
}

}
