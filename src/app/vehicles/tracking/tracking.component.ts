import { Component, OnInit, OnDestroy, ViewChild, AfterContentInit, AfterViewInit, NgZone, Inject, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Observable, Subscription } from 'rxjs';
import { TrackerService } from 'src/app/service/tracker.service';
import { Coordinate } from 'src/app/Model/coordinate.model';
import { AgmMap } from '@agm/core';
import { Marker } from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
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

  @ViewChild('vehicleMarker', {static: false, read: Marker})
  vehicleMarker: Marker;

  mapZoom: number = 15;
  
  markerIconUrl: string = 'assets/pointer_24px.png'
  personMarkerIconUrl: string = 'assets/person2_32px.png'

  private geolocationWatcherSubscription: Subscription;
  deviceGeoposition: Geoposition;

  constructor(
    private route: ActivatedRoute,
    private rxStompService: RxStompService,
    private trackerService: TrackerService,
    private vehicleService: VehicleService,
    private geolocation: Geolocation
  ) { }
  
  ngOnInit() {
    
    this.coordinate = new Coordinate();

    this.route.paramMap.subscribe(params => {
      console.log(params);
      
      this.trackerImei = params.get('idVehicle');
      this.vehicle = this.vehicleService.vehicles.find(vehicle=>vehicle.imei==this.trackerImei);

      this.initVehicleTracking();

    });

    this.initDeviceGeolocationWatcher();

  }
  
  ngAfterViewInit() {
    this.map.zoomChange.subscribe(zoom=>{
      console.log('zoomChange');
      console.log(zoom);
      this.mapZoom = zoom;
    });
  }
  
  ngOnDestroy(): void {
    console.log('destroying tracking...');
    this.socketSubscription.unsubscribe();
    this.geolocationWatcherSubscription.unsubscribe();
    this.stoptHeartbeatLoop();
  }

  private initVehicleTracking() {
    this.trackerService.getLastPosition(this.trackerImei).subscribe(coord=>{
      if(coord){
        this.coordinate = coord;
      }
      this.startSocketListener();
    });
  }

  private initDeviceGeolocationWatcher() {
    this.geolocationWatcherSubscription = this.geolocation.watchPosition().subscribe((data:Geoposition)=>{
      console.log('watchPosition data:');
      console.log(data);
      this.deviceGeoposition = data;
    });
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

