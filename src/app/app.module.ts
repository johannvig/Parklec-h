import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapComponent } from './google-map/google-map.component';

@NgModule({
  declarations: [
    // AppComponent is standalone, so it should not be declared here unless it is needed as part of a module for routing or other reasons
    GoogleMapComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [] // Make sure no component is bootstrapped here if using standalone components
})
export class AppModule { }
