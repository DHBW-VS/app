import { DualisExam } from './dualis-exam';

export interface DualisUnit {
  id: string;
  displayName: string;
  no: string;
  finalGrade: string;
  credits: string;
  status: string;
  exams: DualisExam[] | undefined;
}
