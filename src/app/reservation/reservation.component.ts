import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Route } from "@angular/router";
import {ReservationService} from './reservation.service';
import { NgbDateCustomParserFormatter} from "../customdateformat";
import { NgbModule,NgbDateStruct } from '@ng-bootstrap/ng-bootstrap'; 

const now = new Date();

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers:[ReservationService,NgbDateCustomParserFormatter]
})
export class ReservationComponent implements OnInit {
  public hello=[];
  constructor(private ReservationService:ReservationService,private dateFormate:NgbDateCustomParserFormatter,private route:Router) { }

  NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  arriv: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  depart: NgbDateStruct = {day: now.getDate() , month:now.getMonth() + 1, year:  now.getFullYear()};
  ngOnInit() {
   
    this.ReservationService.reservationdetails()
    .subscribe((resp: any) => {
   this.hello=resp.result;
   console.log("hello",this.hello)
    });
  }
    Roomtype;
    Confirmation;
    Arrival;
    Bookingcon;
    Booked;
    Mobile;
    Departure;
    creditcard;
    Expdate;
    Roomno;
    channel;
    adults;
    country;
    Language;
    child;
    rate;
    Status;
    pickup;
    modification;
    sms;
    selectindex;
  selectMembersEdit(details,index){
    console.log(details)  
    this.selectindex=index;
    this.Roomtype=details.customer_room_type;
    this.Confirmation=details.customer_confirmation_number;
    this.Arrival=details.customer_arrival_date;
    this.Bookingcon=details.customer_booking_confirmed;
    this.Booked=details.customer_booked_date;
    this.Mobile=details.customer_mobile;
    this.Departure=details.customer_depature_date;
    this.creditcard=details.customer_cc;
    this.Expdate=details.customer_expirydate;
    this.Roomno=details.customer_no_of_room;
    this.channel=details.channel;
    this.adults=details.customer_adult;
    this.country=details.cntry_code;
    this.Language=details.language;
    this.child=details.customer_child;
    this.rate=details.customer_room_rate;
    this.Status=details.customer_booked_status;
    this.pickup=details.customer_pickup_drop;
    this.modification=details.modification;
    this.sms=details.send_sms;
    console.log(this.Roomtype);
  }
 
  // this.route.navigate(['/roomtypes']);
  
}
