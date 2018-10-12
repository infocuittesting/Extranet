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
import { UiSwitchModule } from 'ngx-toggle-switch';
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
  restricefrom: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  restricefromMin: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  setper = true;
  selectrestr = [];
  public rateplan=[];
  public roomtypes=[];
  enrate:boolean=true;

  mini = false;
  max = false;
  openarrival = false;
  opendeparture = false;
  closearrival = false;
  closedeparture = false;
  houseclose = false;
  

  showhiderestriction(param){
    if(param == "Minimum Stay"){
      this.mini = false;
    }else{
      this.mini = true;
    }
    if(param == "Maximum Stay"){
      this.max = true;
    }
    else{
      this.max = false;
    }
    if(param == "Open For Arrival"){
      this.openarrival = true;
    }
    else{
      this.openarrival = false;
    }
    if(param == "Open For Departure"){
      this.opendeparture = true;
    }
    else{
      this.opendeparture = false;
    }
    if(param == "Close For Arrival"){
      this.closearrival = true;
    }
    else{
      this.closearrival = false;
    }
    if(param == "Close For Departure"){
      this.closedeparture = true;
    }
    else{
      this.closedeparture = false;
    }
    if(param == "House Close"){
      this.houseclose = true;
    }
    else{
      this.houseclose = false;
    }
  }

  RateandAvailability = [
    {
    "month":"jan",
    "day":"mon",
    "date":"1",
    "room_status":"no",
    "room_to_sell":"5",
    "standard_rate":"yes",
    "NR_rate_with_breakfast":"no",
    "Summer_special":"no",
    },
    {
    "month":"Jan",
    "day":"tue",
    "date":"2",
    "room_status":"yes",
    "room_to_sell":"5",
    "standard_rate":"yes",
    "NR_rate_with_breakfast":"no",
    "Summer_special":"no",
    },
    {
    "month":"jan",
    "day":"wed",
    "date":"3",
    "room_status":"yes",
    "room_to_sell":"10",
    "standard_rate":"yes",
    "NR_rate_with_breakfast":"no",
    "Summer_special":"no",
    },
    {
    "month":"jan",
    "day":"thu",
    "date":"4",
    "room_status":"yes",
    "room_to_sell":"10",
    "standard_rate":"yes",
    "NR_rate_with_breakfast":"no",
    "Summer_special":"no",
    },
    {
    "month":"jan",
    "day":"fri",
    "date":"5",
    "room_status":"yes",
    "room_to_sell":"10",
    "standard_rate":"yes",
    "NR_rate_with_breakfast":"no",
    "Summer_special":"no",
    },
    {
    "month":"jan",
    "day":"sat",
    "date":"6",
    "room_status":"yes",
    "room_to_sell":"8",
    "standard_rate":"yes",
    "NR_rate_with_breakfast":"no",
    "Summer_special":"no",
    },
    {
    "month":"jan",
    "day":"sun",
    "date":"7",
    "room_status":"yes",
    "room_to_sell":"5",
    "standard_rate":"yes",
    "NR_rate_with_breakfast":"no",
    "Summer_special":"no",
    }
  ]
  onChangeObj(event,room_id){
    this.enrate = false
    let body = { "business_id":this.session.retrieve("business_id"),
    "room_id":room_id };
    console.log("rommmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",body)
    this.roomTypeService.selectrateplan(body)
    .subscribe((resp: any) => {
      this.rateplan = resp.Result;
      // this.todate4=this.selectrestr.house_close;
      console.log("Rate plannnnnnnnnnnnnnnn",this.rateplan)
    });
  }

  ngOnInit() {  
   
this.roomTypeService.selectroomtype()
.subscribe((resp: any) => {
  this.roomtypes = resp.Result;
  // this.todate4=this.selectrestr.house_close;
  console.log("room plannnnnnnnnnnnnnnn",this.roomtypes)
});
   this.roomTypeService.selectrestriction()
.subscribe((resp: any) => {
  this.selectrestr = resp.Result;
  // this.todate4=this.selectrestr.house_close;
  console.log("select restriction",this.selectrestr)
});
    this.dateFormate.format(this.fromdate);
    this.dateFormate.format(this.fromdate);
this.setper = false
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
  retrictto:any;
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
  todate3:any;
  todate2:any;
  todate1:any;
  todate4:any;
  getperioddays(getdate) {
  //  if (getdate.period !=null){
  //    this.setper = false
  //  }
  //  else{
  //    this.setper = true
  //  }
    if(getdate.period==null){
    this.parms={
      "business_id":this.session.retrieve("business_id"),
      "from_date":this.fromdate.year+'-'+this.fromdate.month+'-'+this.fromdate.day,
      "to_date":this.todate3.year+'-'+this.todate3.month+'-'+this.todate3.day,
      "room_type":this.labelforroom,
      "room_name":this.roomName,
      
      }
    }else{
      this.parms={
        "business_id":this.session.retrieve("business_id"),
       "date_range":getdate.period,
        "room_type":this.labelforroom,
        "room_name":this.roomName
        }
    }
      console.log("getdatedaetails#####################",this.parms)
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
  toggleon = true;
  indexvalprice: number;
  editbasciprice(event, index, model) {
    this.indexvalprice = 0;
    
    if (this.start == (14 * this.clountnextprev)) {
      this.indexvalprice = index + (14 * this.clountnextprev);
      this.countdates[this.indexvalprice].Price = model;
      this.countdates[this.indexvalprice].Room_Status = 'Declared';
      // this.toggleon=true;
    } else {
      this.countdates[index].Price = model;
      this.countdates[index].Room_Status = 'Declared';
      // this.toggleon=false;
    }
  }
  tooglebutton(index){
    if (this.countdates[index].Room_Status == 'Declared')
    {
      
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
 console.log("openvalue*****************",this.open)
 console.log("arrayvalue",this.countdates)
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
  // date range
  public sunday:number;
  public  monday:number;
  public tuesday:number;
  public wednesday:number;
  public thursday:number;
  public friday:number;
  public saturday:number;
  public from:any;
  public to:any;
  public price:number;
  public sell:number;
  public extra_price:number;
  daterangedetails(getdate,todate,sun,mon,tue,wed,thur,fri,sat,roomtosell,rangeprice,extra_adult_rate,room_id,rate_plan_id){
    console.log("daterange details",getdate,todate,sun,mon,tue,wed,thur,fri,sat,roomtosell,rangeprice,extra_adult_rate,room_id,rate_plan_id)
    // days checkbox input
  this.extra_price = extra_adult_rate
  this.price = rangeprice;
  this.sell = roomtosell;
    if(sun == true)
    {
      this.sunday = 1;
      // console.log("checkif", this.sunday)
    }else{
      this.sunday = 0;
      // console.log("checkelse", this.sunday)
    }
    if(mon == true){
      this.monday = 1;
    }
    else{
      this.monday = 0;
    }
    if(tue == true){
      this.tuesday = 1;
    }
    else{
      this.tuesday = 0;
    }
    if(wed == true){
      this.wednesday = 1;
    }
    else{
      this.wednesday = 0;
    }
    if(thur == true){
      this.thursday = 1;
    }
    else{
      this.thursday = 0;
    }
    if(fri == true){
      this.friday = 1;
    }
    else{
      this.friday = 0;
    }
    if(sat == true){
      this.saturday = 1;
    }
    else{
      this.saturday = 0;
    }
    

    // console.log("details", this.sunday,this.monday,this.rangefrom.year+'-'+this.rangefrom.month+'-'+this.rangefrom.day,this.todate.year+'-'+this.todate.month+'-'+this.todate.day,)
    console.log("dayscount",this.monday,this.tuesday,this.sunday, this.thursday )
    this.from = this.rangefrom.year+'-'+this.rangefrom.month+'-'+this.rangefrom.day
    this.to = this.todate2.year+'-'+this.todate2.month+'-'+this.todate2.day
    let params = {
      
        "business_id": this.session.retrieve("business_id").toString(),
        "st_date": this.from.toString(),
        "ed_date": this.to.toString() ,
        "days":{
          "sun": this.sunday,
          "mon":this.monday,
          "tue":this.tuesday,
          "wed":this.wednesday,
          "thu":this.thursday,
          "fri":this.friday,
          "sat":this.saturday
        },
        "available_count": this.sell ,
        "room_rate":this.price,
        "extra_adult_rate":this.extra_price,
        "room_id":room_id,
        "rate_plan_id":rate_plan_id
      
    }
    console.log("input********************",params)
    this.roomTypeService.daterangecount(params)
    
    .subscribe((resp: any) => {
      if (resp.ServiceStatus == 'Success') {
        alert("resp.ServiceStatus "+resp.ServiceStatus);
      }

    });
  }
  restrcitdeatils(min_stay,min_date,max_stay,max_date,close_arrival_from,close_arrival_to,close_departure_from,close_departure_to,house_close,open_arrival_from,open_departure_from,open_arrival_to,open_departure_to){
    console.log("restrictdetails",min_stay,min_date,max_stay,max_stay,close_arrival_from,close_arrival_to,close_departure_from,close_departure_to,house_close)
    let body = {
       
      
        // "business_id":this.session.retrieve("business_id").toString(),
        "business_id": this.session.retrieve("business_id").toString(),
        "min_stay": min_stay != null ? min_stay.toString() : "",
        "max_stay": max_stay !=null ? max_stay.toString():"",
        "close_arrival":close_arrival_from !=null  ? close_arrival_from :"",
        "close_departure":close_departure_from !=null ? close_departure_from:"",
        "house_close":house_close !=null ? house_close:"",
        "min_stay_date":min_date !=null ? min_date:"",
        "max_stay_date":max_date !=null ? max_date:"",
        "close_arrival_to":close_arrival_to !=null ? close_arrival_to:"",
        "close_departure_to":close_departure_to !=null ? close_departure_to:"",
        "open_arrival":open_arrival_from !=null ? open_arrival_from:"",
        "open_departure":open_departure_from !=null ? open_departure_from:"",
        "open_arrival_to":open_arrival_to !=null ? open_arrival_to:"",
        "open_departure_to":open_departure_to !=null ? open_departure_to:""
      
      
    }
  
    console.log("params details",body)
    this.roomTypeService.restriction(body)
    
    .subscribe((resp: any) => {
      if (resp.ServiceStatus == 'Success') {
        alert("resp.ServiceStatus "+resp.ServiceStatus);
      }
     
    });
  
  }
  public toggleValue:any;
public open:any;
public toggdate;
tog:boolean = false;

public togdate;

 
   
  toggleClicked(lt){
    // this.toggle_on = toggleValue
    console.log("all value is",lt)
    console.log("toggelevalue",lt.room_open)
    this.toggleValue = true
    this.togdate = lt.date;
    console.log("get date",this.togdate)
    // console.log('the toggle has been clicked! ' + this.toggleValue);
    if (lt.room_open == true ){
        this.open = 1
       this.tog = false
      //  this.toggdate = this.fromdate.year+'-'+this.fromdate.month+'-'+this.fromdate.day,
       console.log("set toggle value",lt.room_open ,this.tog )
    }
    else{
     this.open = 0
      this.tog=true
      console.log("else set toggle value",lt.room_open ,this.tog )
    }
   return this.open
  }
  preventSingleClick = false;
  timer: any;
 
  doubleClick () {
    this.preventSingleClick = true;
    clearTimeout(this.timer);
    alert('Double Click Event')

  }
}
