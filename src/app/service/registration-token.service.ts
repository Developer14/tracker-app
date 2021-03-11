import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MobileRegistration } from "../Model/mobile-regisration.model";

@Injectable({providedIn: 'root'})
export class RegistrationTokenService {

    baseUrl = 'http://142.93.74.100:9990/mobile-registration/';

    constructor(private httpClient: HttpClient) {}

    public registerToken(mobileRegistration: MobileRegistration): Observable<any> {
        return this.httpClient.post(`${ this.baseUrl }`, mobileRegistration);
    }
}