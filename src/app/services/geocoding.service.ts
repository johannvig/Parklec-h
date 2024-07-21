import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private nominatimUrl = 'https://nominatim.openstreetmap.org/reverse';

  constructor(private http: HttpClient) {}

  reverseGeocode(lat: number, lon: number): Observable<string> {
    const params = {
      format: 'json',
      lat: lat.toString(),
      lon: lon.toString()
    };
    return this.http.get<any>(this.nominatimUrl, { params }).pipe(
      map(response => response.display_name)
    );
  }
}
