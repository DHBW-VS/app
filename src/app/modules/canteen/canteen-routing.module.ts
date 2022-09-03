import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanteenPage } from './pages';

const routes: Routes = [{ path: '', component: CanteenPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CanteenRoutingModule {}
