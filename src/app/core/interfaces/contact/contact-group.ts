import { IContact } from './contact';

export interface IContactGroup {
  groupname: string;
  contacts: IContact[];
}
