/* tslint:disable */
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RoomTypeService } from '../roomtypes/roomtypes.service';
import { SessionStorageService } from 'ngx-webstorage';
import { ConfigurationService } from "./configuration.service";

import $ from 'jquery';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
  providers: [RoomTypeService,ConfigurationService]
})
export class ConfigurationComponent implements OnInit {

  constructor(private roomTypeService: RoomTypeService, private configurationService:ConfigurationService,
    public session: SessionStorageService) { }

  showMore=false;
add={};
  roomdetails = [];
  ngOnInit() {
    let roomParms={
      "business_id":this.session.retrieve("business_id")
    }
      this.roomTypeService.roomtypeDetails(roomParms)
        .subscribe((resp: any) => {
          if (resp.ServiceStatus == 'Success') {
           // this.roomdetails =resp.Room_List;
            for(var i=0;i<resp.Room_List.length;i++){
                   this.roomdetails.push({
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
                     "editFlag":false
                   });

            }
          }

        });

        $(document).ready(function(){
          $('[data-toggle="popover"]').popover();
          
      });
  }




//add rows
public affFlagg=false;
addRows(val){
  if(val.id!=null && val.room_type!=null && val.room_name!=null && val.room_code!=null){
  if(this.roomdetails.length>0){
  for(var i=0;i<this.roomdetails.length;i++){
        if(this.roomdetails[i].id==val.id && this.roomdetails[i].room_type==val.room_type  &&
          this.roomdetails[i].room_name==val.room_name && this.roomdetails[i].room_code==val.room_code){
            this.affFlagg=false;
               break;
        }else{
          this.affFlagg=true;
        }
  }

}else{
  this.affFlagg=true;
}

if( this.affFlagg==true){
  this.roomdetails.push({
    "business_id":this.session.retrieve("business_id"),
    "facilitie1":val.facilitie1,
    "facilitie2":val.facilitie2,
    "facilitie3":val.facilitie3,
    "id":val.id,
    "room_type":val.room_type,
    "room_code":val.room_code,
    "room_name":val.room_name,
    "standard_rate":val.standard_rate,
    "standard_rate_currency":this.roomdetails.length==0 ? "Dollar":this.roomdetails[0].standard_rate_currency,
    "totel_room":val.totel_room,
    "editFlag":false
  });
  this.add={};
}
  }
}
  //delete buttons
  deleterows(index){
    this.roomdetails.splice(index,1);
  }

  //edit rows
  editrows(index){
    this.roomdetails[index].editFlag=true;
  }

  saveButton(index){
    this.roomdetails[index].editFlag=false;
  }

  //show more
  showMoreBut(){
    this.showMore=true;
  }
  //show less
  showLessBut(){
    this.showMore=false;
  }

  //insert list
  message:String;
  saveroomDetails(){
    let parms={
      "businessid":this.session.retrieve("business_id"),
      "roomdetails":this.roomdetails
    }
    this.configurationService.inserRoomDetails(this.roomdetails)
    .subscribe((resp: any) => {
      if (resp.ServiceStatus == 'Success') {
        $('#myModal').modal('show');
        this.message="Insert Data Successfully"
      }else{
        $('#myModal').modal('show');
        this.message="failed to insert data"
      }
    })
  }


}
