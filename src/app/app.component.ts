import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { GeocodingService } from './services/geocoding.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  address!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private geocodingService: GeocodingService) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    const lat = 48.13259;
    const lon = -1.620879;

    this.geocodingService.reverseGeocode(lat, lon).subscribe(
      (address: string) => {
        this.address = address;
      },
      (error) => {
        console.error('Error fetching address:', error);
      }
    );
  }

  shouldShowMenu(): boolean {
    return this.router.url !== '/login';
  }
}
