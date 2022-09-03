import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { SosPage } from './pages';
import { SosRoutingModule } from './sos-routing.module';

@NgModule({
  imports: [SosRoutingModule, SharedModule],
  declarations: [SosPage],
})
export class SosPageModule {}
