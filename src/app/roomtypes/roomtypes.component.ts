/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// date picker
import { NgbModule,NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { isNumber, toInteger, padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
//custom date format
import { NgbDateCustomParserFormatter} from "../customdateformat";

import { NgClass,DatePipe  } from '@angular/common';
import { RoomTypeService } from "./roomtypes.service";
import { SessionStorageService } from "ngx-webstorage";
import $ from 'jquery';

declare var jquery:any;
declare var $ :any;

const now = new Date();

@Component({
  selector: 'app-roomtypes',
  templateUrl: './roomtypes.component.html',
  styleUrls: ['./roomtypes.component.css'],
  providers: [RoomTypeService,NgbDateCustomParserFormatter]
})
/* tslint:disable */
export class RoomtypesComponent implements OnInit {

  constructor(private roomTypeService: RoomTypeService,public session: SessionStorageService
  ,private datePipe: DatePipe ,
  private dateFormate:NgbDateCustomParserFormatter) { }

  
  getroomTypedetails=[];
  NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  fromdate: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  fromMinDate: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  rangefrom: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  rangefromMin: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  ngOnInit() {

    this.dateFormate.format(this.fromdate);
    this.dateFormate.format(this.fromdate);

    let roomParms={
      "business_id":this.session.retrieve("business_id")
    }
      this.roomTypeService.roomtypeDetails(roomParms)
        .subscribe((resp: any) => {
          if (resp.ServiceStatus == 'Success') {
           // this.getroomTypedetails=resp.Room_List;


            for(var i=0;i<resp.Room_List.length;i++){
              this.getroomTypedetails.push({
                "business_id":resp.Room_List[i].business_id,
                "facilitie1":resp.Room_List[i].facilitie1,
                "facilitie2":resp.Room_List[i].facilitie2,
                "facilitie3":resp.Room_List[i].facilitie3,
                "id":resp.Room_List[i].id,
                "room_type":resp.Room_List[i].room_type,
                "room_code":resp.Room_List[i].room_code,
                "room_name":resp.Room_List[i].room_name,
                "standard_rate":resp.Room_List[i].standard_rate,
                "standard_rate_currency":resp.Room_List[i].standard_rate_currency,
                "totel_room":resp.Room_List[i].totel_room,
                "editFlag":false,
                "srcfile":resp.Room_List[i].room_type==null ?"assets/images/Standard Room.jpg"  :"assets/images/"+resp.Room_List[i].room_type+".jpg"
              });

       }
          }

        });

  }
  roomName:String;
  // model define
  public sellroomorbasicrate: number;
  public roomdetailsflg = false;
  public labelforroom: any;
  standardRoom(flag) {
    this.roomdetailsflg = true; 
      this.labelforroom = flag.room_type;
      this.roomName=flag.room_name;
  }
  todate:any;
  // get period count \
  setperiod=[];
  public dataa = [];
  public countdates = [];
  public monthh = [];
  public monthhh = [];
  public dayscountt = [];
  public countdys: number;
  public cnt: number;
  public showlabelname = false;
  getdatedetails=[];
  parms:{};
  getperioddays(getdate) {

    if(getdate.period==null){
    this.parms={
      "business_id":this.session.retrieve("business_id"),
      "from_date":this.fromdate.year+'-'+this.fromdate.month+'-'+this.fromdate.day,
      "to_date":this.todate.year+'-'+this.todate.month+'-'+this.todate.day,
      "room_type":this.labelforroom,
      "room_name":this.roomName
      }
    }else{
      this.parms={
        "business_id":this.session.retrieve("business_id"),
       "date_range":getdate.period,
        "room_type":this.labelforroom,
        "room_name":this.roomName
        }
    }

      this.roomTypeService.getdateDetails(this.parms)
      .subscribe((resp: any) => {
        if (resp.ServiceStatus == 'Success') {
          this.countdates=resp.Result;
        }

      });

    this.showlabelname = true;

  }

  // previous and next button functions
  public prevflag = false;
  public nextflag = true;
  clountnextprev = 0;
  start: number = 0;
  end: number = 14;
  nextColumns() {
    this.clountnextprev++;
    if (this.countdates.length >= this.end) {
      this.start = this.start + 14;
      this.end = this.end + 14;
      if (this.start == 0) {
        this.prevflag = false;
      } else if (this.start > 0) {
        this.prevflag = true;
      }
    } if (this.countdates.length == this.end || this.countdates.length < this.end) {
      this.prevflag = true;
      this.nextflag = false;
    }

  }
  preveviousColumns() {
    this.clountnextprev--;
    if (this.start > 0) {
      this.start = this.start - 14;
      this.end = this.end - 14;
    } if (this.start == 0) {
      this.prevflag = false;
      this.nextflag = true;
    }
    if (this.countdates.length > this.end) {
      this.nextflag = true;
    }
  }


  // call modal popup room to sell start
  public labelundrinfo: any;
  public sellmodalsavebut = false;
  callmodalroomsell() {
    this.labelundrinfo = 'Number of room to sell';
    this.sellmodalsavebut = true;
    this.editsavebut = false;
    this.sellroomorbasicrate = null;
  }

  savesellroom() {
    for (var j = 0; j < this.countdates.length; j++) {
      this.countdates[j].Available_Room_Count = this.sellroomorbasicrate;
    }

  }

  // change sell room  based on index
  indexval: number;
  editsellroom(event, index, model) {
    this.indexval = 0;
    if (this.start == (14 * this.clountnextprev)) {
      this.indexval = index + (14 * this.clountnextprev);
      this.countdates[this.indexval].Available_Room_Count = model;
    } else {
      this.countdates[index].Available_Room_Count = model;
    }
  }
  // end sell to room functions


  // standard rate
  public hideedit = false;
  standardrate() {
    this.hideedit = true;
  }

  // click edit basci button startcallmodalroomsell
  public editsavebut = false;
  clickeditbasicpricebut() {
    this.labelundrinfo = 'New price per night';
    this.sellmodalsavebut = false;
    this.editsavebut = true;
  }

  // edit basic price based on index
  indexvalprice: number;
  editbasciprice(event, index, model) {
    this.indexvalprice = 0;
    if (this.start == (14 * this.clountnextprev)) {
      this.indexvalprice = index + (14 * this.clountnextprev);
      this.countdates[this.indexvalprice].Price = model;
      this.countdates[this.indexvalprice].Room_Status = 'Declared';
    } else {
      this.countdates[index].Price = model;
      this.countdates[index].Room_Status = 'Declared';
    }
  }

  saveeditbasicprice() {
    for (var j = 0; j < this.countdates.length; j++) {
      this.countdates[j].Price = this.sellroomorbasicrate;
      this.countdates[j].Room_Status = 'Declared';
    }
  }

  // end edit basic price this.sellroomorbasicrate=null;

  // click back button
  cleartemp() {
    this.sellroomorbasicrate = null;
    this.countdates = [];
    this.showlabelname = false;
    this.fromdate=null;
    this.todate=null;
  }

  //save room count and rates

  saveRoomNoandRate(){
    let parmsroom={
      "business_id":this.session.retrieve("business_id"),
       "room_type":this.labelforroom,
       "rooms":this.countdates
    }

    this.roomTypeService.insertandUpdateRatesellcount(parmsroom)
    .subscribe((resp: any) => {
      if (resp.ServiceStatus == 'Success') {
        alert("resp.ServiceStatus "+resp.ServiceStatus);
      }

    });
  }
  daterangedetails(rangefrom,todate,sun,mon,tue,wed,thur,fri,sat,roomtosell,price){
    console.log("daterange details",rangefrom,todate,sun,mon,tue,wed,thur,fri,sat,roomtosell,price)
    // days checkbox input
    // if(user.sun == true)
    // {
    //   user.sun =1;
    // }else{
    //   user.sun =0;
    // }
    let params = {
      "st_date":"2018-09-20",
      "ed_date":"2018-10-01",
      "days":{
        "sun":0,
        "mon":0,
        "tue":0,
        "wed":0,
        "thu":0,
        "fri":1,
        "sat":1
      },
      "room_to_sell":5,
      "price":100.0
    }
  }
}
