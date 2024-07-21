import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ParkingService } from '../services/parking.service';
import { Parking } from '../models/parking.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  parkings: Parking[] = [];
  filteredParkings: Parking[] = [];
  selectedCity: string = 'angers';
  expandedParking: string | null = null;
  userLocation: { lat: number; lng: number } | null = null;

  constructor(
    private menu: MenuController, 
    private parkingService: ParkingService) {}

  ngOnInit() {
    this.getUserLocation();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.loadParkingData();
        },
        error => {
          console.error('Error getting user location:', error);
          this.loadParkingData();
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      this.loadParkingData();
    }
  }

  loadParkingData() {
    this.parkingService.getAllParkingData(this.selectedCity).subscribe((data: Parking[]) => {
      console.log('Data received from ParkingService:', data); // Log the received data
      this.parkings = data.map((parking: Parking) => {
        let distance = null;
        if (parking.location && this.userLocation) {
          const [lat, lng] = parking.location.split(', ').map(coord => parseFloat(coord));
          if (!isNaN(lat) && !isNaN(lng)) {
            distance = this.calculateDistance(lat, lng);
          }
        }
        return {
          ...parking,
          distance
        };
      });
      this.parkings.sort((a, b) => (a.distance != null && b.distance != null) ? a.distance - b.distance : 0);
      console.log('Processed parkings:', this.parkings); // Log the processed parkings
      this.filteredParkings = [...this.parkings];
    }, error => {
      console.error('Error loading parking data:', error);
    });
  }

  calculateDistance(lat: number, lng: number): number {
    if (this.userLocation) {
      const R = 6371; // Radius of the Earth in kilometers
      const dLat = this.deg2rad(lat - this.userLocation.lat);
      const dLng = this.deg2rad(lng - this.userLocation.lng);
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.deg2rad(this.userLocation.lat)) * Math.cos(this.deg2rad(lat)) * 
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }
    return 0;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  toggleMenu() {
    this.menu.toggle('main-menu');
  }

  filterParkings(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (!searchTerm) {
      this.filteredParkings = [...this.parkings];
    } else {
      this.filteredParkings = this.parkings.filter(parking =>
        parking.name.toLowerCase().includes(searchTerm) ||
        parking.location.toLowerCase().includes(searchTerm)
      );
    }
  }

  onCityChange(event: any) {
    this.selectedCity = event.detail.value;
    this.loadParkingData();
  }

  toggleExpand(parking: Parking) {
    if (this.expandedParking === parking.name) {
      this.expandedParking = null;
    } else {
      this.expandedParking = parking.name;
    }
  }

  openGoogleMaps(parking: Parking) {
    if (parking.location) {
      const [lat, lng] = parking.location.split(', ').map(coord => parseFloat(coord));
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      window.open(url, '_blank');
    }
  }
}
