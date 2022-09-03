import { Pipe, PipeTransform } from '@angular/core';
import { IContactGroup, SearchHelper } from '@app/core';

@Pipe({
  name: 'contactGroupFilter',
})
export class ContactGroupFilterPipe implements PipeTransform {
  public transform(contactGroups: IContactGroup[], searchValue: string): IContactGroup[] {
    if (!searchValue) {
      return contactGroups;
    }
    const filteredContactGroups: IContactGroup[] = [];
    for (const contactGroup of contactGroups) {
      const filteredContacts = contactGroup.contacts.filter(contact =>
        SearchHelper.objectContainsString(contact, searchValue),
      );
      if (filteredContacts.length === 0) {
        continue;
      }
      filteredContactGroups.push({ groupname: contactGroup.groupname, contacts: filteredContacts });
    }
    return filteredContactGroups;
  }
}
