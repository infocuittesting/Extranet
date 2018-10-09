/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { ConfigurationService } from "./configuration.service";

import $ from 'jquery';
import { subscribeOn } from 'rxjs/operator/subscribeOn';
import { viewClassName } from '@angular/compiler';


declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  providers: [ConfigurationService]
})
export class ConfigurationComponent implements OnInit {
  roomsize=[];
  bedding=[];
  beddingsize=[];
  roomamenities=[];
  extrabed=[];
  inclusion=[];
  public plan={};
  i=0;
  constructor( private configurationService:ConfigurationService,
  public session: SessionStorageService) { }

  showMore=false;
  add={};
  roomdetails:any;
  roomdetails1:any=[];
  amentiesarr = [];
  amenitiestemp:any =[];
  amentiesss = [];
  roomamentites = []
  public roomtypes = [];
  public cancelpolicy = [];
  public rateplan=[];
  public pakages=[];
          //show more
          showlessBut(){
            this.showMore=false;
          }
    

  //show record 
    room;
    rmsize;
    maxadult;
    maxchild;
    beding;
    bedsize;
    extrabeds;
    amenitie;
    photo;
    smoke;
  viewdata(flags){
    this.showMore=true;
this.room=flags.room_name;
this.rmsize=flags.room_size_id;
this.maxadult=flags.max_adults;
this.maxchild=flags.max_child
this.beding=flags.bed_option;
this.bedsize=flags.bed_size;
this.extrabeds=flags.extrabed;
this.amenitie=flags.amenitie;
this.photo=flags.upload_photos;
this.smoke=flags.smoking;


  }
  
  ngOnInit() {
    this.configurationService.packages()
    .subscribe((resp:any)=>{
       this.pakages=resp.Result;
       console.log(this.pakages)
    });
    this.configurationService.selectrateplan()
    .subscribe((resp:any)=>{
       this.rateplan=resp.Result;
       console.log(this.rateplan)
    });
    this.configurationService.selectroomtype()
.subscribe((resp:any)=>{
   this.roomtypes=resp.Result;
   console.log(this.roomtypes)
});
this.configurationService.cancellationpolicy()
.subscribe((resp:any)=>{
   this.cancelpolicy=resp.Result;
   console.log(this.cancelpolicy)
});
    this.configurationService.getRoomDetails()
.subscribe((resp:any)=>{
   this.roomdetails=resp.Result;
   console.log(this.roomdetails)
   
   for (let amenitiestemp of this.roomdetails ){
    // this.amenitiestemp = amenitiestemp[amenitiestemp.length-1]
    //  this.amentiesss = amenitiestemp.amenitie.split("|");
    //  this.amentiesss = this.amentiesss.slice(0,3);

     console.log("this is amenties**************",this.amentiesss)
     this.i=this.i+1;
   }
 
   console.log("new value", this.roomdetails)

console.log("get room details response",JSON.stringify(this.roomdetails));
});
}
  
insertroom(param){
  param.business_id = this.session.retrieve("business_id");
  console.log("$$$$$$$$$$$$$",JSON.stringify(param));
  if(param.smoking == true){
    param.smoking = 1;
  }else{
    param.smoking = 0;
  }
  console.log("Checking smoking value",param.smoking);
  this.configurationService.insertRoomDetails(param)
  .subscribe((resp:any)=>{
    if (resp.ReturnCode == 'RIS') {
      alert("resp.ServiceStatus "+resp.ReturnCode);
    }
    console.log("RETURN VALUE FOR INSERT ROOM",resp.Return);
  });
}

Queryselectoptions(){
  this.configurationService.getRoom()
  .subscribe((resp:any)=>{
  this.roomsize=resp.Result;
  console.log("1) Roomsizeeeeee",this.roomsize);
  });
  this.configurationService.getBedding()
  .subscribe((resp:any)=>{
  this.bedding=resp.Result;
  console.log("2) Beddinggggg",this.bedding);
  });
  this.configurationService.getBeddingSize()
  .subscribe((resp:any)=>{
  this.beddingsize=resp.Result;
  console.log("3) Bedding Sizeeee",this.beddingsize);
  });
  this.configurationService.getExtraBed()
  .subscribe((resp:any)=>{
  this.extrabed=resp.Result;
  console.log("3) Extra Beddd",this.extrabed);
  });
  this.configurationService.getRoomAmenities()
  .subscribe((resp:any)=>{
  this.roomamenities=resp.Result;
  console.log("4) Room Amenities",this.roomamenities);
  });
  this.configurationService.getInclusion()
  .subscribe((resp:any)=>{
  this.inclusion=resp.Result;
  console.log("5) Inclusion",this.inclusion);
  });
}
public checkedList = [];
public roomcheckedList = [];
onCheckboxChange(option, event) {
  if(event.target.checked) {
    this.checkedList.push(option.packages_id);
    console.log("checkedlist",this.checkedList)
  } else {
    for(var i=0 ; i < this.pakages.length; i++) {
      if(this.checkedList[i] == option.packages_id){
        this.checkedList.splice(i,1);
      }
    }
  }
  console.log(this.checkedList);
  }
  onroomCheckboxChange(option, event) {
    if(event.target.checked) {
      this.roomcheckedList.push(option.room_id);
      console.log("checkedlist",this.roomcheckedList)
    } else {
      for(var i=0 ; i < this.roomtypes.length; i++) {
        if(this.roomcheckedList[i] == option.room_id){
          this.roomcheckedList.splice(i,1);
        }
      }
    }
    console.log(this.roomcheckedList);
    }
  
insertrateplan(rate_plan_id,policy_id,fromdate,todate){
console.log("rateplan screen",rate_plan_id,policy_id,fromdate,todate)
let body = {   
	"business_id":  this.session.retrieve("business_id").toString(),
	"rate_plan":rate_plan_id,
	"cancellation_policy_id":policy_id,
	"room_types_id":this.roomcheckedList,
	"packages_id":this.checkedList,
	"start_date":fromdate,
	"end_date":todate
}
console.log("body value",body)
this.configurationService.create_rate_plan(body)
.subscribe((resp:any)=>{
  if (resp.ServiceStatus == 'Success') {
    alert("resp.ServiceStatus "+resp.ServiceStatus);
  }
  console.log("RETURN VALUE FOR INSERT ROOM",resp.ServiceStatus);
});
}

}

