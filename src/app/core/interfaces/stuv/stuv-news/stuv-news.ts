import { IStuvNewsContent } from './stuv-news-content';

export interface IStuvNews {
  data: IStuvNewsContent[];
  paging: {
    previous: string;
    next: string;
  };
}
