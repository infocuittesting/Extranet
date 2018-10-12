/* tslint:disable */
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { SessionStorageService } from "ngx-webstorage";
@Injectable()
export class RoomTypeService {

  constructor(
    private http: Http,public session: SessionStorageService
  ) { }

  //registration details
  roomtypeDetails(roomparms: any): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    //let body = { "userKey": dashbrddata };

    return this.http.post('https://ivrinfocuit.herokuapp.com/RoomList', roomparms, options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }

  //get date details
  getdateDetails(dateparms: any): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    //let body = { "userKey": dashbrddata };

    return this.http.post('https://ivrinfocuit.herokuapp.com/RatesandAvailability', dateparms, options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }


  //insert sell room count and rates
  insertandUpdateRatesellcount(dateparms: any): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    //let body = { "userKey": dashbrddata };

    return this.http.post('https://ivrinfocuit.herokuapp.com/RatesInsertAndUpdate', dateparms, options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }

daterangecount(params): Observable<object[]> {
    console.log("service is came",params)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    //let body = { "userKey": dashbrddata };

    return this.http.post('https://ivrinfocuit.herokuapp.com/daterange', params, options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }

  restriction(params): Observable<object[]> {
    console.log("service is came",params)
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    //let body = { "userKey": dashbrddata };
    console.log("paramsss HHHHHHHHHHHHHHHHHHHH",params)
    return this.http.post('https://ivrinfocuit.herokuapp.com/restriction', params, options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }

  selectrestriction(): Observable<object[]> {
    console.log("service is cam")
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    let body = { "business_id":this.session.retrieve("business_id") };

    return this.http.post('https://ivrinfocuit.herokuapp.com/select_restriction',body, options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }
  selectrateplan(body): Observable<object[]> {
    console.log("service is cam")
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
   

    return this.http.post('https://ivrinfocuit.herokuapp.com/select_plan',body, options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }
  selectroomtype(): Observable<object[]> {
    console.log("service is cam")
    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
  

    return this.http.post('https://ivrinfocuit.herokuapp.com/select_room_types', options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }
  
  private extractData(res: Response) {
    //alert('hai20')
    console.log('res========---====' + res);
    let body = res.json();
    console.log(JSON.stringify(body));
    return body;
  }
}
