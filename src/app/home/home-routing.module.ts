import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MapComponent } from '../map/map.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    MapComponent
  ],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
