import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { CanteenRoutingModule } from './canteen-routing.module';
import { CanteenCardBalanceModalComponent, CanteenDishCardComponent, CanteenMenuPopoverComponent } from './components';
import { CanteenPage } from './pages';
import { CanteenFoodLabelPipe } from './pipes';

@NgModule({
  imports: [CanteenRoutingModule, SharedModule],
  declarations: [
    CanteenPage,
    CanteenCardBalanceModalComponent,
    CanteenDishCardComponent,
    CanteenMenuPopoverComponent,
    CanteenFoodLabelPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CanteenPageModule {}
