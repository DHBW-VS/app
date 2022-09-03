import { IStuvContact } from './stuv-contact';

export interface IStuvContactGroup {
  groupname: string;
  stuvContacts: IStuvContact[];
}
