import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { lastValueFrom } from 'rxjs';

export interface ApartmentsFilterDto {
  limit?: number;
  offset?: number;
}

export interface ApartmentSearchDto {
  id: number;
  date: string;
  lastname: string;
  firstname: string;
  mail: string;
  phone1: string;
  phone2: string;
  fax: string;
  city: string;
  size: number;
  wg: boolean;
  distance_from: string;
  balcony: boolean;
  kitchen: boolean;
  bath: boolean;
  shower: boolean;
  wc: boolean;
  smoker: boolean;
  furnished: boolean;
  parking: number;
  comment: string;
  room: number;
  tv: boolean;
  phone: boolean;
  date1: string;
  date2: string;
  price: number;
  addcosts: number;
  benefits: string;
}

export interface ApartmentOfferDto {
  id: number;
  date: string;
  lastname: string;
  firstname: string;
  mail: string;
  phone1: string;
  phone2: string;
  fax: string;
  street: string;
  city: string;
  zip: string;
  size: number;
  wg: boolean;
  distance: number;
  distance_from: string;
  balcony: boolean;
  kitchen: boolean;
  bath: boolean;
  shower: boolean;
  wc: boolean;
  smoker: boolean;
  furnished: boolean;
  parking: number;
  comment: string;
  room: number;
  tv: boolean;
  phone: boolean;
  date1: string;
  date2: string;
  price: number;
  deposit: number;
  addcosts: number;
  benefits: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiApartmentsService {
  private readonly urlPath = '/apartments';

  constructor(private readonly httpClient: HttpClient) {}

  public async findAllSearches(filterDto: ApartmentsFilterDto): Promise<ApartmentSearchDto[]> {
    let parameters = new HttpParams();
    if (filterDto.limit) {
      parameters = parameters.append('limit', filterDto.limit);
    }
    if (filterDto.offset) {
      parameters = parameters.append('offset', filterDto.offset);
    }
    const response$ = this.httpClient.get<ApartmentSearchDto[]>(environment.apiBaseUrl + this.urlPath + '/searches', {
      params: parameters,
    });
    return lastValueFrom(response$);
  }

  public async findAllOffers(filterDto: ApartmentsFilterDto): Promise<ApartmentOfferDto[]> {
    let parameters = new HttpParams();
    if (filterDto.limit) {
      parameters = parameters.append('limit', filterDto.limit);
    }
    if (filterDto.offset) {
      parameters = parameters.append('offset', filterDto.offset);
    }
    const response$ = this.httpClient.get<ApartmentOfferDto[]>(environment.apiBaseUrl + this.urlPath + '/offers', {
      params: parameters,
    });
    return lastValueFrom(response$);
  }
}
