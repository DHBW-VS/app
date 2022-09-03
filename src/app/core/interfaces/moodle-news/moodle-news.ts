import { IMoodleNewsAttachment } from './moodle-news-attachment';

export interface IMoodleNews {
  subject: string;
  date: string;
  message: string;
  attachment: IMoodleNewsAttachment[];
}
