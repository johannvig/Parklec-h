/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeocodingService } from './geocoding.service';

describe('Service: Geocoding', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeocodingService]
    });
  });

  it('should ...', inject([GeocodingService], (service: GeocodingService) => {
    expect(service).toBeTruthy();
  }));
});
