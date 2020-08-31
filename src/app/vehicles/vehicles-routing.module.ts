import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  /* {
    path: '',
    component: VehiclesComponent
  }, */
  {
    path: 'list',
    component: ListComponent
  },
  {
    path: 'tracking',
    component: TrackingComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesRoutingModule {}
