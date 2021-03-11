import { Component, NgZone, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  DeviceInfo,
} from '@capacitor/core';
import { RegistrationTokenService } from './service/registration-token.service';
import { MobileRegistration } from './Model/mobile-regisration.model';

const { PushNotifications, Device } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  
  deviceInfo: DeviceInfo;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private registrationTokenService: RegistrationTokenService,
    private ngZone: NgZone
    ) {
      this.initializeApp();
    }
    
    initializeApp() {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    }
    
    ngOnInit() {
      
      Device.getInfo().then((data: DeviceInfo)=>{
        this.deviceInfo = data;
        this.initializePushNotifacions();
      });


  }

  private initializePushNotifacions() {

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then(result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    //PushNotifications.
    PushNotifications.addListener(
      'registration',
      (token: PushNotificationToken) => {
        alert('Push registration success, token: ' + token.value);
        this.registrationTokenService.registerToken(this.buildMbileRegistration(token.value)).subscribe(data=>{
          //alert('Push registration token registered.');
        });
      },
    );

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }

  private buildMbileRegistration(token: string) {
    let m: MobileRegistration = new MobileRegistration();
    m.clientId = 1;
    m.fcmToken = token;
    m.imei = this.deviceInfo.uuid;
    return m;
  }
}
