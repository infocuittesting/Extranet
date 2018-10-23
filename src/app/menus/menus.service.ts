import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class MenusService {

  constructor(private http: Http) { }

  dashBoardToolbar():Observable<object[]>{

    return this.http.get('https://ivrinfocuit.herokuapp.com/lastreservationcount')
    .map(this.extractData)
  }
  
  private extractData(res: Response) {
    //alert('hai20')
    console.log('res========---====' + res);
    let body = res.json();
    console.log(JSON.stringify(body));
    return body;
  }
}
