import { Component, OnInit } from '@angular/core';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { DashboardService } from '../dashboard/dashboard.service';
// import { StatisticsService } from "./statistics.service";
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { SessionStorageService } from "ngx-webstorage";
import { NgClass, DatePipe } from '@angular/common';
// import { StatisticsService } from "./statistics.service";
import { ReportsService } from "./reports.service";
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
}
