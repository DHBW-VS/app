import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SosPage } from './pages';

const routes: Routes = [{ path: '', component: SosPage }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SosRoutingModule {}
