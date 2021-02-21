import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/Model/vehicle.model';
import { VehicleService} from '../../service/vehicle.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  vehicles : Vehicle[];

  constructor(private service : VehicleService) { }

  ngOnInit() {
    this.service.getVehicles().subscribe((data: Vehicle[]) =>{ 
      this.vehicles = data;
    });
  }

}
