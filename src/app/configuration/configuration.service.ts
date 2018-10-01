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
    let body = {
        "room_id":insertDet.room_id,
        "room_name":insertDet.room_name,
        "max_adults":insertDet.max_adults,
        "max_child":insertDet.max_child,
        "room_size_id":insertDet.room_size_id,
        "size_of_room":insertDet.size_of_room,
        "bedding_option_id":insertDet.bedding_option_id,
        "bed_option":insertDet.bed_option,
        "extrabed_id":insertDet.extrabed_id,
        "extrabed":insertDet.extrabed,
        "bed_size_id":insertDet.bed_size_id,
        "bed_size":insertDet.bed_size,
        "upload_photos":insertDet.upload_photos,
        "amenitie_id":insertDet.amenitie_id,
        "amenitie":insertDet.amenitie,
        "smoking":insertDet.smoking,
        "rate_plan_id":insertDet.rate_plan_id,
        "advance_booking_window":insertDet.advance_booking_window,
        "prepayment_policy":insertDet.prepayment_policy,
        "cancellation_policy":insertDet.cancellation_policy,
        "inclusion_id":insertDet.inclusion_id,
        "inclusion":insertDet.inclusion,
        "important_information":insertDet.important_information
        }

      return this.http.post('https://ivrinfocuit.herokuapp.com/insert_configuration', body, options)
          .map(this.extractData);

  }

  //get room details
       // insert room details
       getRoomDetails(): Observable<object[]> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

  
        return this.http.post('https://ivrinfocuit.herokuapp.com/select_configuration',options)
            .map(this.extractData);
  
    }
  //get room details
       // insert room details
       getRoom(): Observable<object[]> {

        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

  
        return this.http.post('https://ivrinfocuit.herokuapp.com/SelectRoomsizeConfiguration',options)
            .map(this.extractData);
  
    }    
    private extractData(res: Response) {
        const body = res.json();
        return body;
    }
}
