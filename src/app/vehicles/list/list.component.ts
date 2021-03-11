import { Component, OnInit } from '@angular/core';
import { LocalNotification } from '@capacitor/core';
import { Vehicle } from 'src/app/Model/vehicle.model';
import { VehicleService} from '../../service/vehicle.service'
//import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  vehicles : Vehicle[];

  constructor(
    private service : VehicleService/* ,
    private localNotification: LocalNotifications */
  ) { }

  ngOnInit() {
    LocalNotifications.requestPermission();
    this.service.getVehicles().subscribe((data: Vehicle[]) =>{ 
      this.vehicles = data;
    });
  }

  notification() {
    LocalNotifications.schedule({
      notifications: [
        {
          title:'my notification',
          body: 'notification test',
          id: 1,
          extra: {data: 'random data'},
          iconColor: '#0000FF'
        }
      ]
    });
    /* this.localNotification.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: 'file://sound.mp3',
      data: { secret: 'key' }
    }); */
  }

}
