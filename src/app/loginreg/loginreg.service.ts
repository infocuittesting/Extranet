/* tslint:disable */
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions,Headers, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginregService {

    constructor (
        private http: Http
      ) {}

     //registration details
      registerDetails(regdata:any):  Observable<object[]> {

         const headers = new Headers({'Content-Type':'application/json'})
         const options = new RequestOptions({ headers: headers });
         let body={"user_name":regdata.username,"user_password":regdata.password,
        "user_conf_password":regdata.password,"user_mobile":regdata.mobileNo,
        "hotel_name":regdata.hotelname,"user_email":regdata.email};

         return this.http.post('https://ivrinfocuit.herokuapp.com/SignupExtranet',body,options)
            .map(this.extractData)
            //.catch(this.handleErrorObservable);
     }


     //login details
     loginDetails(logindata:any):  Observable<object[]> {

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const options = new RequestOptions({ headers: headers });
        let body={"user_email":logindata.username,"user_password":logindata.password};

        return this.http.post('https://ivrinfocuit.herokuapp.com/LoginExtranet',body,options)
           .map(this.extractData)
           //.catch(this.handleErrorObservable);
    }

 private extractData(res: Response) {
    //alert('hai20')
    console.log('res========---===='+res);
    let body = res.json();
    console.log(JSON.stringify(body));
        return body;
    }




    private handleErrorObservable (error: Response | any) {
        console.error("error mesage e=-=-=-=-"+error);
      return Observable.throw(error.message || error);
     }
}
