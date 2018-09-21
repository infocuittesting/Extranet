import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ReservationService {

  constructor( private http: Http) { }
  reservationdetails(): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    //let body = { "userKey": dashbrddata };

    return this.http.get('https://ivrinfocuit.herokuapp.com/Query_Reservation')
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
