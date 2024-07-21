import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ParkingService } from '../services/parking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  template: `
    <div class="map-container">
      <google-map height="300px" width="100%" [center]="center" [zoom]="zoom">
        <map-marker
          *ngFor="let marker of markers"
          [position]="marker.position"
          [title]="marker.title"
          (mapClick)="selectMarker(marker, mapMarker)"
          #mapMarker="mapMarker"
        ></map-marker>
        <map-info-window #infoWindow>
          <div class="info-window-content" *ngIf="selectedMarker">
            <h3>{{ selectedMarker.title }}</h3>
            <p>{{ selectedMarker.details }}</p>
            <p>{{ selectedMarker.etat }}</p>
            <button *ngIf="selectedMarker.position" class="info-window-button" (click)="openGoogleMaps(selectedMarker)">S'y rendre</button>
          </div>
        </map-info-window>
      </google-map>
    </div>
  `,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  center: google.maps.LatLngLiteral = { lat: 48.8566, lng: 2.3522 }; // Paris par défaut
  zoom = 12;
  markers: any[] = []; // Ajout de la propriété markers
  selectedMarker: any = null; // Marqueur sélectionné

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  constructor(private parkingService: ParkingService, private router: Router) {}

  ngAfterViewInit(): void {
    this.getUserLocation();
    this.loadMarkers();
  }

  getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          console.log(`User location: [${this.center.lat}, ${this.center.lng}]`);
        },
        error => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  loadMarkers(): void {
    // Villes à afficher
    const cities = ['rennes', 'nantes', 'paris', 'strasbourg', 'marseille', 'tours', 'dijon', 'nimes', 'toulouse', 'angers', 'bordeaux', 'issy', 'orleans'];

    cities.forEach(city => {
      this.parkingService.getAllParkingData(city).subscribe(data => {
        data.forEach((parking: any) => {
          const location = parking.location ? parking.location.split(', ') : [];
          if (location.length === 2) {
            const lat = parseFloat(location[0]);
            const lng = parseFloat(location[1]);

            if (!isNaN(lat) && !isNaN(lng)) {
              console.log(`Creating marker for ${parking.name} at [${lat}, ${lng}]`);
              this.markers.push({
                position: { lat: lat, lng: lng },
                title: parking.name,
                details: `Nombre de places: ${parking?.spaces}`,
                etat: `Etat: ${parking?.state}`
              });
            } else {
              console.error(`Invalid coordinates for parking: ${parking.name}`, parking.location);
            }
          } else {
            console.error(`Invalid location format for parking: ${parking.name}`, parking.location);
          }
        });
      });
    });
  }

  selectMarker(marker: any, mapMarker: MapMarker) {
    this.selectedMarker = marker;
    if (this.infoWindow) {
      this.infoWindow.open(mapMarker);
    }
  }

  openGoogleMaps(parking: any) {
    if (parking.position) {
      const { lat, lng } = parking.position;
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      window.open(url, '_blank');
    }
  }
}
