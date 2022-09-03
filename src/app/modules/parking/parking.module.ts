import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ParkingCardComponent } from './components';
import { ParkingPage } from './pages';
import { ParkingRoutingModule } from './parking-routing.module';

@NgModule({
  imports: [ParkingRoutingModule, SharedModule],
  declarations: [ParkingPage, ParkingCardComponent],
  providers: [],
})
export class ParkingPageModule {}
