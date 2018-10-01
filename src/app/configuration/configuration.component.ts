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
  room;
  constructor( private configurationService:ConfigurationService,
    public session: SessionStorageService) { }

  showMore=false;
add={};
  roomdetails = [];
  ngOnInit() {
    this.configurationService.getRoomDetails()
.subscribe((resp:any)=>{
this.roomdetails=resp.Result;
});

this.configurationService.getRoom()
.subscribe((resp:any)=>{
this.room=resp.Result;
});
  }
  
insertroom(param){
  this.configurationService.inserRoomDetails(param)
  .subscribe((resp:any)=>{

  });
}


}

