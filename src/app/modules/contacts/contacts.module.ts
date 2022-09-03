import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { ContactCardComponent } from './components';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsPage } from './pages';
import { ContactGroupFilterPipe } from './pipes';

@NgModule({
  imports: [ContactsRoutingModule, SharedModule],
  declarations: [ContactsPage, ContactCardComponent, ContactGroupFilterPipe],
  providers: [],
})
export class ContactsPageModule {}
