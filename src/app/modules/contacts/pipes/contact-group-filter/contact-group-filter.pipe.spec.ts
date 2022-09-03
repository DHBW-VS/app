import { IContactGroup } from '@app/core';
import { ContactGroupFilterPipe } from './contact-group-filter.pipe';

describe('ContactGroupFilterPipe', () => {
  let pipe: ContactGroupFilterPipe;

  beforeEach(() => {
    pipe = new ContactGroupFilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform correctly', () => {
    const contactGroups: IContactGroup[] = [
      {
        contacts: [
          {
            firstname: 'Franz',
            lastname: 'Bauer',
          },
          {
            firstname: 'Friedrich',
            lastname: 'Hoch',
          },
        ],
        groupname: 'Test',
      },
    ];
    const exspectedResult: IContactGroup[] = [
      {
        contacts: [
          {
            firstname: 'Friedrich',
            lastname: 'Hoch',
          },
        ],
        groupname: 'Test',
      },
    ];
    let result = pipe.transform(contactGroups, 'Fried');
    expect(result).toEqual(exspectedResult);
  });
});
