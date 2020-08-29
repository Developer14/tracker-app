import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { GooleMapsComponent } from '../goole-maps/goole-maps.component';

import { AgmCoreModule } from "@agm/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD33MbOGarKsyrFskv_xv4YFD2pAJNm5mc'
    })
  ],
  declarations: [FolderPage,GooleMapsComponent]
})
export class FolderPageModule {}
