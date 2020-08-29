import { Component, OnInit, Renderer2, Input, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Plugins } from '@capacitor/core';

const { Geolocation, Network } = Plugins;


declare var google: any;

@Component({
  selector: 'app-goole-maps',
  templateUrl: './goole-maps.component.html',
  styleUrls: ['./goole-maps.component.scss'],
})
export class GooleMapsComponent implements OnInit {

  @Input('apiKey') apiKey: string;

    public map: any;
    public markers: any[] = [];
    private mapsLoaded: boolean = false;
    private networkHandler = null;

    constructor(private renderer: Renderer2, private element: ElementRef, @Inject(DOCUMENT) private _document){

    }

    ngOnInit(){
        
    }


    onMarkerClick() {
        console.log('onMarkerClick()');
    }


}
