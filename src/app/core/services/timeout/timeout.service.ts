import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimeoutService {
  public timeout(ms: number): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => resolve(), ms);
    });
  }
}
