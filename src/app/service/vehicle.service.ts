import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Vehicle } from '../Model/vehicle.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  Url = 'http://142.93.74.100:9990/vehicle/15775152-2';
  vehicles : Vehicle[];

  constructor( private h: HttpClient) { }

  getVehicles(){
    return this.h.get<Vehicle[]>(this.Url).pipe(map(vehicles=>{
      this.vehicles = vehicles;
      return vehicles;
    }));
  }


}
