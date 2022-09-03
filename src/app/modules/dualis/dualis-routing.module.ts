import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DualisAuthGuard } from './guards';
import { DualisLoginPage, DualisPage } from './pages';

const routes: Routes = [
  { path: '', component: DualisPage, canActivate: [DualisAuthGuard] },
  { path: 'login', component: DualisLoginPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DualisPageRoutingModule {}
