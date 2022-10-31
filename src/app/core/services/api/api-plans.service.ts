import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { lastValueFrom } from 'rxjs';

export interface PlanDto {
  id: number;
  filename: string;
  iCalendarKey?: string;
  description: string;
  semester: number;
  course: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiPlansService {
  private readonly urlPath = '/plans';

  constructor(private readonly httpClient: HttpClient) {}

  public async findAll(course?: string): Promise<PlanDto[]> {
    let parameters = new HttpParams();
    if (course) {
      parameters = parameters.append('course', course);
    }
    const response$ = this.httpClient.get<PlanDto[]>(environment.apiBaseUrl + this.urlPath, {
      params: parameters,
    });
    return lastValueFrom(response$);
  }

  public async download(id: number): Promise<Blob> {
    const response$ = this.httpClient.get(environment.apiBaseUrl + this.urlPath + '/download/' + id, {
      responseType: 'blob',
    });
    return lastValueFrom(response$);
  }

  public buildICalendarLink(iCalendarKey: string) {
    return `${environment.apiBaseUrl}${this.urlPath}/download/ical/${iCalendarKey}`;
  }
}
