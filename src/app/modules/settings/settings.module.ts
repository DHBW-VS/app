import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { SettingsPage } from './pages';
import { SettingsRoutingModule } from './settings-routing.module';

@NgModule({
  imports: [SettingsRoutingModule, SharedModule],
  declarations: [SettingsPage],
})
export class SettingsPageModule {}
