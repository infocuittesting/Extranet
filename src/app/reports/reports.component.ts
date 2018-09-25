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
  ngOnInit() {
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
        this.chart = this.AmCharts.makeChart('chartdiv7', {
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
            "legend": {
              "display":"Users"
            }
          }
        });
        
      });
      this.ReportsService.yearreservation()
      .subscribe((resp: any) => {
        // if (resp.ServiceStatus == 'Success') {
          this.getyear = resp.Returnvalue;
      });
      this.LineChart = new Chart('linechart',{
       type:'line',
       data:{
         labels:["jan","Feb","march","april","may","june","july","august","september","october","november","december"],
         datasets:[{
           label:"Number of items sold in months",
           data:[],
           fill:false,
           lineTension:0.2,
           borderColor:"red",
           borderwidth:1
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
        this.chart = this.AmCharts.makeChart('chartdivid', {
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
            "legend": {
              "display":"Users"
            }
          }
        });
        
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
        this.chart = this.AmCharts.makeChart('chartdivid1', {
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
            "legend": {
              "display":"Users"
            }
          }
        });
        
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
          this.chart = this.AmCharts.makeChart('chartdiv2', {
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
              "legend": {
                "display":"Users"
              }
            }
          });
        
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
          this.chart = this.AmCharts.makeChart('chartdiv3', {
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
              "legend": {
                "display":"Users"
              }
            }
          });
        
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
          this.chart = this.AmCharts.makeChart('chartdiv4', {
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
              "legend": {
                "display":"Users"
              }
            }
          });
        
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
          this.chart = this.AmCharts.makeChart('chartdiv5', {
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
              "legend": {
                "display":"Users"
              }
            }
          });
        
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
          this.chart = this.AmCharts.makeChart('chartdiv6', {
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
              "legend": {
                "display":"Users"
              }
            }
          });
        
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
      //  doc.autoTable( columns, let sample = () => 
      //  {
      //     this.fun1();
      //  }, { startY: 20 });
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
          this.channelrows.push([this.channelcount[i].title, this.channelcount[i].value])
          // this.rows.push(this.rowsvalue) 
          // console.log("new array",this.uservalue)
         var columns = ["Title", "Value"];
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
  this.LineChart = new Chart('linechart',{
    type:'line',
    data:{
      labels:this.month_name,
      datasets:[{
        label:"Number of reservation booked in months",
        data:this.month_val,
        fill:false,
        lineTension:1.0,
        borderColor:"green",
        borderwidth:1
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
  });
}
}
