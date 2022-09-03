import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingPage } from './pages';

const routes: Routes = [{ path: '', component: ParkingPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingRoutingModule {}
