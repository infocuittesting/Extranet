import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { SessionStorageService } from "ngx-webstorage";
import { NgClass,DatePipe  } from '@angular/common';
// services
import { DashboardService } from '../dashboard/dashboard.service';
import { StatisticsService } from "./statistics.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [DashboardService,StatisticsService]
})
/* tslint:disable */ 
export class StatisticsComponent implements OnInit {

  private chart: AmChart;

  constructor(private dashboardservice: DashboardService,private AmCharts: AmChartsService,
    private statisticsService:StatisticsService,
    public session: SessionStorageService,private datePipe: DatePipe) { }

    public chartDatas=[];
    getroomdetails=[];
  ngOnInit() {
 
    let statsParms={
      "business_id":this.session.retrieve("business_id")
    }
    console.log("business id is came",this.session.retrieve("business_id"))
      this.statisticsService.statisticsDetails(statsParms)
        .subscribe((resp: any) => {
          if (resp.ServiceStatus == 'Success') {
            this.getroomdetails=resp.Result;
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
    this.chart = this.AmCharts.makeChart('weekAvailable', {
      "theme": "light",
      'hideCredits':true,
    "type": "serial",
    'titleField': ['Standard Room'],
    "dataProvider": this.getroomdetails,
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
    	"legend": {
               "display":"none"
             }
      },
    //  "titles": [
    //       {
    //          "text": "",
    //          "size": 15
    //        }
    //      ],
    });


//booked count rooms
// var chart = this.AmCharts.makeChart("weekAvailable",
// {
//   'type': 'pie',
//   'theme': 'light',
//   'hideCredits':true,
//   'dataProvider':this.chartDatas,
//   'titleField': 'title',
//   'valueField': 'value',
//   'labelRadius': 5,

//   'radius': '42%',
//   'innerRadius': '60%',
//   'labelText': '[[title]]',
//   'export': {
//     "legend": {
//       "display":"none"
//     }
//   },
//   "titles": [
//     {
//       "text": "Available Room(Week)",
//       "size": 15
//     }
//   ],
//   "allLabels": [
// 		{
// 			"text": "Free label",
// 			"bold": false,
//       "display":"none",
//       "align":"right",
//       "color":"white"
// 		}
// 	]
// });
  }
});

  }
}
