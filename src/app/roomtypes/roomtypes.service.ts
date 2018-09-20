/* tslint:disable */
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class RoomTypeService {

  constructor(
    private http: Http
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


  private extractData(res: Response) {
    //alert('hai20')
    console.log('res========---====' + res);
    let body = res.json();
    console.log(JSON.stringify(body));
    return body;
  }
}
