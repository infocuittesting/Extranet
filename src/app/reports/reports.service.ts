import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportsService {

  constructor(
    private http: Http
  ) { }

  
  //statistics details
  statisticsDetails(statisticsddata: any): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    //let body = { "userKey": dashbrddata };

    return this.http.post('https://ivrinfocuit.herokuapp.com/Getreservationcancelmodification', statisticsddata , options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }  
  channeldetails(params): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  //let body = { "userKey": dashbrddata };

  return this.http.post('https://ivrinfocuit.herokuapp.com/Getchannelcounts', params , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}  
Roomoccupancy(params): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  //let body = { "userKey": dashbrddata };

  return this.http.post('https://ivrinfocuit.herokuapp.com/GetRoomOccupancyall', params , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}

BookingvsConfirmation(params): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  //let body = { "userKey": dashbrddata };

  return this.http.post('https://ivrinfocuit.herokuapp.com/GetBookingConfirmation', params , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}

Languages(params): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  //let body = { "userKey": dashbrddata };

  return this.http.post('https://ivrinfocuit.herokuapp.com/GetLanguagecount', params , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}

Sms(params): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  //let body = { "userKey": dashbrddata };

  return this.http.post('https://ivrinfocuit.herokuapp.com/Getsmscount', params , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}

countryreservation(params): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  //let body = { "userKey": dashbrddata };

  return this.http.post('https://ivrinfocuit.herokuapp.com/GetCountryreservation', params , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}

yearreservation(): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  //let body = { "userKey": dashbrddata };

  return this.http.post('https://ivrinfocuit.herokuapp.com/GetYearbyyeareservationcount',   options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}
monthreservation(params): Observable<object[]> {
  const headers = new Headers({ 'Content-Type': 'application/json' })
  const options = new RequestOptions({ headers: headers });
  //let body = { "userKey": dashbrddata };

  return this.http.post('https://ivrinfocuit.herokuapp.com/monthreservation', params , options)
    .map(this.extractData)
  //.catch(this.handleErrorObservable);
}

  //statistics details
  statistics(statisticsddata: any): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    //let body = { "userKey": dashbrddata };

    return this.http.post('https://ivrinfocuit.herokuapp.com/QueryStatistics', statisticsddata , options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  }  
  futurebooking(): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    //let body = { "userKey": dashbrddata };

    return this.http.get('https://ivrinfocuit.herokuapp.com/futurebooking',  options)
      .map(this.extractData)
    //.catch(this.handleErrorObservable);
  } 
  Historybooking(): Observable<object[]> {

    const headers = new Headers({ 'Content-Type': 'application/json' })
    const options = new RequestOptions({ headers: headers });
    //let body = { "userKey": dashbrddata };

    return this.http.get('https://ivrinfocuit.herokuapp.com/HistoryBooking',  options)
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
