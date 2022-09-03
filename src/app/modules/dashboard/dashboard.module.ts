import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { MoodleNewsCardComponent, MoodleNewsModalComponent } from './components';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './pages';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule],
  declarations: [DashboardPage, MoodleNewsCardComponent, MoodleNewsModalComponent],
})
export class DashboardPageModule {}
