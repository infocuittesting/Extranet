/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { SessionStorageService } from "ngx-webstorage";
//import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import { NgClass,DatePipe  } from '@angular/common';
// services
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
}) 
export class DashboardComponent implements OnInit {


  private chart: AmChart;
  // chart = [];

  constructor(private dashboardservice: DashboardService, private AmCharts: AmChartsService,
    public session: SessionStorageService,private datePipe: DatePipe

  ) { }
//,    public session: SessionStorageService
  userkey: any;
  value: any = null;
  getroomdetails=[];
  public chartDatas=[];
  public notification = [];
  public chat = [];
  

  ngOnInit() {
    
    this.dashboardservice.dashBoardNotification()
      .subscribe((resp:any) =>{
        if(resp.Return_code == "Success"){
          this.notification = resp.Return_value;
          console.log("1) Notification service -", this.notification);
        } 
      });    

     

      this.dashboardservice.dashBoardChat()
      .subscribe((resp:any) =>{
        if(resp.Return_code == "Success"){
          this.chat = resp.Return_value;
          console.log("3) Chat service -", this.chat);
        }
      });
    //get dashboard datas
    //  this.value = this.session.get("business_id");

    // get dash board details
    //for chart

let dasParms={
    "business_id":this.session.retrieve("business_id"),
    "available_date":this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  }
    this.dashboardservice.dashboardDetails(dasParms)
      .subscribe((resp: any) => {
        if (resp.ServiceStatus == 'Success') {
          console.log("************************",resp.Available_Rooms);
          
          this.getroomdetails=resp.Available_Rooms;
         for(var i=0;i<this.getroomdetails.length;i++){
           this.chartDatas.push({
              'title':this.getroomdetails[i].room_name,
              'value':this.getroomdetails[i].available_count
           })
         }

         console.log("##############",this.chartDatas);
          this.chart = this.AmCharts.makeChart('chartdiv', {
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
                "display":"none"
              }
            }
          });

        }



      });

    //        this.AmCharts.updateChart(this.chart, () => {
    //    //  Change whatever properties you want
    //    this.chart.dataProvider = [];
    //  });

  //}
  // am chart
  // tslint:disable-next-line:use-life-cycle-interface

  // tslint:disable-next-line:use-life-cycle-interface
  // ngOnDestroy() {
  //   if (this.chart) {
  //     this.AmCharts.destroyChart(this.chart);
  //   }
  }
}
