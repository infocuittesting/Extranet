/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { ConfigurationService } from "./configuration.service";

import $ from 'jquery';
import { subscribeOn } from 'rxjs/operator/subscribeOn';

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
  constructor( private configurationService:ConfigurationService,
  public session: SessionStorageService) { }

  showMore=false;
  add={};
  roomdetails:any;
  amentiesarr = [];
  amenitiestemp:any =[];
  ngOnInit() {
    this.configurationService.getRoomDetails()
.subscribe((resp:any)=>{
   this.roomdetails=resp.Result;
   this.amenitiestemp = this.roomdetails.amenitie;
  //  for(var i=0;i<this.roomdetails.length;i++)
  //  {
    this.amentiesarr = this.roomdetails.amenitie.split("|");
  //  }
   
   console.log("AMENTIESSSSSSSSSSS",this.amenitiestemp);
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

}

