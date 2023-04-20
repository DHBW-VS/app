import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ApartmentsRoutingModule } from './apartments-routing.module';
import { ApartmentCardComponent, ApartmentModalComponent, ApartmentsMenuPopoverComponent } from './components';
import { ApartmentsPage } from './pages';
import { ApartmentDatePipe } from './pipes';

@NgModule({
  imports: [ApartmentsRoutingModule, SharedModule],
  declarations: [
    ApartmentsPage,
    ApartmentCardComponent,
    ApartmentModalComponent,
    ApartmentsMenuPopoverComponent,
    ApartmentDatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ApartmentsPageModule {}
