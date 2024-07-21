import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-google-map',
  standalone: true,
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainerRef!: ElementRef;
  private map: google.maps.Map | undefined;

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapContainerRef.nativeElement, {
      center: { lat: 51.678418, lng: 7.809007 },
      zoom: 8
    });
  }
}
