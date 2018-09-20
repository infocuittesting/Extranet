import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigurationService {

    constructor(
        private http: Http
    ) { }

    // registration details
    configurationDetails(regdata: any): Observable<object[]> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        const body = {
            'username': regdata.username, 'password': regdata.password,
            'email': regdata.email, 'mobileNo': regdata.mobileNo, 'businessid': regdata.businessid,
            'hotelname': regdata.hotelname
        };

        return this.http.post('http://localhost:3333/springMVC/commonService', body, options)
            .map(this.extractData);

    }


     // insert room details
     inserRoomDetails(insertDet: any): Observable<object[]> {

      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: headers });
      // const body = {
      //   'business_id': insertDet.businessid,
      //     'roomdetailsList': insertDet.roomdetails
      // };

      return this.http.post('https://ivrinfocuit.herokuapp.com/InsertRoomList', insertDet, options)
          .map(this.extractData);

  }

    private extractData(res: Response) {
        const body = res.json();
        return body;
    }
}
