import { Component, OnInit, OnDestroy, ViewChild, AfterContentInit, AfterViewInit, NgZone, Inject, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { TrackerService } from 'src/app/service/tracker.service';
import { Coordinate } from 'src/app/Model/coordinate.model';
import { AgmMap, AgmMarker, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { LatLng, MarkerOptions } from '@ionic-native/google-maps';
import { ActionSheetOptions } from '@capacitor/core';
import { ActionSheetController } from '@ionic/angular';
import { Vehicle } from 'src/app/Model/vehicle.model';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit, AfterViewInit, OnDestroy {

  private trackerImei: string;
  private socketSubscription: Subscription;
  private loop: any;

  vehicle: Vehicle;
  coordinate: Coordinate;

  @ViewChild('map', {read: AgmMap})
  map: AgmMap;

  mapZoom: number = 15;
  
  markerIconUrl: string = 'assets/pointer_24px.png'

  constructor(
    private route: ActivatedRoute,
    private rxStompService: RxStompService,
    private trackerService: TrackerService,
    private vehicleService: VehicleService
  ) { }
  
  ngOnInit() {
    
    this.coordinate = new Coordinate();

    this.route.paramMap.subscribe(params => {
      console.log(params);
      
      this.trackerImei = params.get('idVehicle');
      this.vehicle = this.vehicleService.vehicles.find(vehicle=>vehicle.imei==this.trackerImei);

      this.trackerService.getLastPosition(this.trackerImei).subscribe(coord=>{
        if(coord){
          this.coordinate = coord;
        }
        this.startSocketListener();
      });
    });

  }
  
  ngAfterViewInit() {
  
    this.map.zoomChange.subscribe(zoom=>{
      console.log('zoomChange');
      console.log(zoom);
      this.mapZoom = zoom;
    });
        
  }
  
  ngOnDestroy(): void {
    console.log('destruyendo componente...');
    this.socketSubscription.unsubscribe();
    this.stoptHeartbeatLoop();
  }

  private startSocketListener() {
    console.log(this.trackerImei);

    this.trackerService.sendHeartbeat(this.trackerImei).subscribe(val => {
      if(val){
        this.startHeartbeatLoop();
        this.socketSubscription = this.rxStompService.watch(`/topic/track-${ this.trackerImei }`).subscribe((msg: any) => {
          //console.log(msg.body);
          this.coordinate = JSON.parse(msg.body);
          console.log(this.coordinate);
        });
      }
    });
    
  }

  private startHeartbeatLoop() {
    this.loop = setInterval(()=>{
      this.trackerService.sendHeartbeat(this.trackerImei).subscribe(val=>console.log(val));
    }, 10000);
  }

  private stoptHeartbeatLoop() {
    clearInterval(this.loop);
  }
}

