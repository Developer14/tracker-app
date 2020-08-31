import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { AgmCoreModule } from '@agm/core';
import { VehiclesComponent } from './vehicles.component';
import { GooleMapsComponent } from '../goole-maps/goole-maps.component';
import { ListComponent } from './list/list.component';
import { TrackingComponent } from './tracking/tracking.component';


@NgModule({
  declarations: [VehiclesComponent, ListComponent, TrackingComponent],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD33MbOGarKsyrFskv_xv4YFD2pAJNm5mc'
    })
  ]
})
export class VehiclesModule { }
