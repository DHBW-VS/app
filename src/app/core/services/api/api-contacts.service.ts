import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { lastValueFrom } from 'rxjs';

export interface ContactGroupDto {
  groupname: string;
  contacts: ContactDto[];
}

export interface ContactDto {
  firstname: string;
  lastname: string;
  jobtitle?: string;
  location?: string;
  phone?: string;
  mail?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiContactsService {
  private readonly urlPath = '/contact-groups';

  constructor(private readonly httpClient: HttpClient) {}

  public async findAll(course?: string): Promise<ContactGroupDto[]> {
    let parameters = new HttpParams();
    if (course) {
      parameters = parameters.append('course', course);
    }
    const response$ = this.httpClient.get<ContactGroupDto[]>(environment.apiBaseUrl + this.urlPath, {
      params: parameters,
    });
    return lastValueFrom(response$);
  }
}
