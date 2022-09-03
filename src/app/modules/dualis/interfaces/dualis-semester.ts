import { DualisUnit } from './dualis-unit';

export interface DualisSemester {
  id: string;
  displayName: string;
  gpa: string;
  totalCredits: string;
  units: DualisUnit[];
}
