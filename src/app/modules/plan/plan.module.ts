import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {
  CalendarComponent,
  CalendarModalComponent,
  CalendarToolbarComponent,
  CalendarViewOptionsPopoverComponent,
} from './components';
import { PlanPage } from './pages';
import { PlanRoutingModule } from './plan-routing.module';

@NgModule({
  imports: [PlanRoutingModule, SharedModule],
  declarations: [
    PlanPage,
    CalendarComponent,
    CalendarModalComponent,
    CalendarToolbarComponent,
    CalendarViewOptionsPopoverComponent,
  ],
})
export class PlanPageModule {}
