import { Component, OnInit } from '@angular/core';
import {ReservationService} from './reservation.service';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers:[ReservationService]
})
export class ReservationComponent implements OnInit {
  public hello=[];
  constructor(private ReservationService:ReservationService) { }

  ngOnInit() {
    this.ReservationService.reservationdetails()
    .subscribe((resp: any) => {
   this.hello=resp.result;
   console.log("hello",this.hello)
    });
  }

}
