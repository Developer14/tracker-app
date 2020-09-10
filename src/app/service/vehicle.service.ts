import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Vehicle } from '../Model/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicle : Vehicle[];
  constructor( private h: HttpClient) { }
  Url = 'http://142.93.74.100:9990/vehicle/20987351-3';

  getVehicle(){
    return this.h.get<Vehicle[]>(this.Url);
  }


}
