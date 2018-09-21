import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';
import { SessionStorageService } from 'ngx-webstorage';

// declare var $:any;
/* tslint:disable */
@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute ,public session: SessionStorageService) { }

  public dasharrowflag = true;
  public reservationarrowflag = false;
  public ratesavailarrowflag = false;
  public promotionsarrowflag = false;
  public policyarrowflag = false;
  public staticsarrowflag = false;
  public configurationsarrowflag = false;
  public reportsarrowflag =false;
  

  ngOnInit() {
    this.router.navigate(['dashboard'], { relativeTo: this.route });
  }

  dashboardtab() {
    this.router.navigate(['dashboard'], { relativeTo: this.route });
    this.dasharrowflag = true;
    this.reservationarrowflag = false;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = false;
    this.policyarrowflag = false;
    this.staticsarrowflag = false;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =false;
  }
  reservation() {
    this.router.navigate(['reservation'], { relativeTo: this.route });
    this.dasharrowflag = false;
    this.reservationarrowflag = true;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = false;
    this.policyarrowflag = false;
    this.staticsarrowflag = false;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =false;
  }
  ratesAvailtab() {
    this.router.navigate(['roomtypes'], { relativeTo: this.route });
    this.dasharrowflag = false;
    this.reservationarrowflag = false;
    this.ratesavailarrowflag = true;
    this.promotionsarrowflag = false;
    this.policyarrowflag = false;
    this.staticsarrowflag = false;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =false;
  }
  promotionstab() {
    this.router.navigate(['promotions'], { relativeTo: this.route });
    this.dasharrowflag = false;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = true;
    this.policyarrowflag = false;
    this.staticsarrowflag = false;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =false;
  }

  statisticstab() {
    this.router.navigate(['statistics'], { relativeTo: this.route });
    this.dasharrowflag = false;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = false;
    this.policyarrowflag = false;
    this.staticsarrowflag = true;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =false;
  }

  cancellationtab() {
    this.router.navigate(['cancellationpaymentComponent'], { relativeTo: this.route });
    this.dasharrowflag = false;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = false;
    this.policyarrowflag = true;
    this.staticsarrowflag = false;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =false;
  }

  // configuration
  configuration() {
    this.router.navigate(['configuration'], { relativeTo: this.route });
    this.dasharrowflag = false;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = false;
    this.policyarrowflag = false;
    this.staticsarrowflag = false;
    this.configurationsarrowflag = true;
    this.reportsarrowflag =false;
  }
  //reports
  Reports() {
    this.router.navigate(['Reports'], { relativeTo: this.route });
    this.reportsarrowflag =false;
    this.dasharrowflag = false;
    this.ratesavailarrowflag = false;
    this.promotionsarrowflag = false;
    this.policyarrowflag = false;
    this.staticsarrowflag = false;
    this.configurationsarrowflag = false;
    this.reportsarrowflag =true;
  }

  // sign out function

  signout() {
    this.session.clear;
    this.router.navigate(['/login']);
  }

}
