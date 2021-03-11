import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { VehiclesComponent } from './vehicles.component';
import { ListComponent } from './list/list.component';
import { TrackingComponent } from './tracking/tracking.component';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
/* import { IonicModule } from '@ionic/angular'; */

const myRxStompConfig: InjectableRxStompConfig = {
  // Which server?
  brokerURL: 'ws://142.93.74.100:9990/positions/websocket',

  // Headers
  // Typical keys: login, passcode, host
  /* connectHeaders: {
    login: 'guest',
    passcode: 'guest'
  }, */

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 20000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 200
};

@NgModule({
  declarations: [VehiclesComponent, ListComponent, TrackingComponent],
  imports: [
    CommonModule,
    /* IonicModule.forRoot(), */
    VehiclesRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD33MbOGarKsyrFskv_xv4YFD2pAJNm5mc'    
    })
  ],
  providers: [
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    Geolocation
  ]
})
export class VehiclesModule { }
