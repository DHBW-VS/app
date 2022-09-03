import { IPlan } from '../plan';

export interface IPlanStorage {
  lastOpenedTimetable: IPlan | undefined;
  cache: IPlan[];
}
