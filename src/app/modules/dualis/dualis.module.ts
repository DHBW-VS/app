import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { DualisSemesterGpaBarComponent, DualisSemesterSelectComponent, DualisUnitCardComponent } from './components';
import { DualisPageRoutingModule as DualisPageRoutingModule } from './dualis-routing.module';
import { DualisLoginPage, DualisPage } from './pages';
import { DualisEmptyStringPipe, DualisGradePipe, DualisUnitFilterPipe } from './pipes';

@NgModule({
  imports: [DualisPageRoutingModule, SharedModule],
  declarations: [
    DualisPage,
    DualisLoginPage,
    DualisSemesterGpaBarComponent,
    DualisSemesterSelectComponent,
    DualisUnitCardComponent,
    DualisEmptyStringPipe,
    DualisGradePipe,
    DualisUnitFilterPipe,
  ],
})
export class DualisPageModule {}
