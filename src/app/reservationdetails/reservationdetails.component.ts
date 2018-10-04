import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ReservationService} from '../reservation/reservation.service';
@Component({
  selector: 'app-reservationdetails',
  templateUrl: './reservationdetails.component.html',
  styleUrls: ['./reservationdetails.component.sass'],
  providers:[ReservationService]
})
export class ReservationdetailsComponent implements OnInit {

  constructor(private ReservationService:ReservationService) { }

  ngOnInit() {
  }

}
