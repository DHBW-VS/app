import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { lastValueFrom } from 'rxjs';

export interface MoodleNewsDto {
  subject: string;
  date: string;
  message: string;
  attachment: MoodleNewsAttachmentDto[];
}

export interface MoodleNewsAttachmentDto {
  title: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiMoodleNewsService {
  private readonly urlPath = '/moodle-news';

  constructor(private readonly httpClient: HttpClient) {}

  public async findAll(): Promise<MoodleNewsDto[]> {
    const response$ = this.httpClient.get<MoodleNewsDto[]>(environment.apiBaseUrl + this.urlPath);
    return lastValueFrom(response$);
  }
}
