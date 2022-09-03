import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '@app/core/guards';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('@app/modules/dashboard').then(m => m.DashboardPageModule),
    canActivate: [AuthenticationGuard],
  },
  { path: 'parking', loadChildren: () => import('@app/modules/parking').then(m => m.ParkingPageModule) },
  {
    path: 'dualis',
    loadChildren: () => import('@app/modules/dualis').then(m => m.DualisPageModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'contact',
    loadChildren: () => import('@app/modules/contacts').then(m => m.ContactsPageModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'plan',
    loadChildren: () => import('@app/modules/plan').then(m => m.PlanPageModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'map',
    loadChildren: () => import('@app/modules/map').then(m => m.MapPageModule),
    canActivate: [AuthenticationGuard],
  },
  { path: 'login', loadChildren: () => import('@app/modules/login').then(m => m.LoginPageModule) },
  { path: 'canteen', loadChildren: () => import('@app/modules/canteen').then(m => m.CanteenPageModule) },
  {
    path: 'sos',
    loadChildren: () => import('@app/modules/sos').then(m => m.SosPageModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'settings',
    loadChildren: () => import('@app/modules/settings').then(m => m.SettingsPageModule),
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'apartments',
    loadChildren: () => import('@app/modules/apartments').then(m => m.ApartmentsPageModule),
  },
  { path: 'imprint', loadChildren: () => import('@app/modules/imprint').then(m => m.ImprintPageModule) },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
