import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class CapacitorHttpService {
  public request(options: HttpOptions): Promise<HttpResponse> {
    return CapacitorHttp.request(options);
  }
}
