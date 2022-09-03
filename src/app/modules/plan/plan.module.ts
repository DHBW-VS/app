import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { PlanPage } from './pages';
import { PlanRoutingModule } from './plan-routing.module';

@NgModule({
  imports: [PlanRoutingModule, SharedModule],
  declarations: [PlanPage],
})
export class PlanPageModule {}
