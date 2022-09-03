import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { lastValueFrom } from 'rxjs';

export interface CanteenMenuDto {
  date: string;
  dishes: CanteenDishDto[];
}

export interface CanteenDishDto {
  name: string;
  allergyWarnings: string[];
  labels: string[];
  description: string;
  price: {
    employee: string;
    guests: string;
    pupils: string;
    students: string;
  };
  promotion?: string;
  additionalInformation?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiCanteenService {
  private readonly urlPath = '/canteen-menus';

  constructor(private readonly httpClient: HttpClient) {}

  public async findAll(): Promise<CanteenMenuDto[]> {
    const response$ = this.httpClient.get<CanteenMenuDto[]>(environment.apiBaseUrl + this.urlPath);
    return lastValueFrom(response$);
  }
}
