import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ImprintRoutingModule } from './imprint-routing.module';
import { ImprintPage } from './pages';

@NgModule({
  imports: [ImprintRoutingModule, SharedModule],
  declarations: [ImprintPage],
})
export class ImprintPageModule {}
