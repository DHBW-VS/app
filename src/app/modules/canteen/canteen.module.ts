import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { CanteenRoutingModule } from './canteen-routing.module';
import { CanteenDishCardComponent } from './components';
import { CanteenPage } from './pages';
import { CanteenFoodLabelPipe } from './pipes';

@NgModule({
  imports: [CanteenRoutingModule, SharedModule],
  declarations: [CanteenPage, CanteenDishCardComponent, CanteenFoodLabelPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CanteenPageModule {}
