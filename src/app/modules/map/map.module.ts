import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { MapRoutingModule } from './map-routing.module';
import { MapPage } from './pages';

@NgModule({
  imports: [MapRoutingModule, SharedModule],
  declarations: [MapPage],
  providers: [],
})
export class MapPageModule {}
