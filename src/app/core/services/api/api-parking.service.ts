import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { lastValueFrom } from 'rxjs';

export interface ParkingDto {
  description: string;
  location: string;
  staff: {
    occupied: number;
    free: number;
  };
  students: {
    occupied: number;
    free: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiParkingService {
  private readonly urlPath = '/parking';

  constructor(private readonly httpClient: HttpClient) {}

  public async findAll(): Promise<ParkingDto[]> {
    const response$ = this.httpClient.get<ParkingDto[]>(environment.apiBaseUrl + this.urlPath);
    return lastValueFrom(response$);
  }
}
