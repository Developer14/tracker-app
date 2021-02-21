import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Coordinate } from '../Model/coordinate.model';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  baseUrl = 'http://142.93.74.100:9990/tracker-realtime';

  constructor(
    private httpClient: HttpClient
  ) { }

  public sendHeartbeat(imei: string): Observable<any> {
    return this.httpClient.get(`${ this.baseUrl }/${ imei }/listen`);
  }

  public getLastPosition(imei: string): Observable<Coordinate> {
    return this.httpClient.get<Coordinate>(`${this.baseUrl}/${ imei }/last-position`);
  }
}
