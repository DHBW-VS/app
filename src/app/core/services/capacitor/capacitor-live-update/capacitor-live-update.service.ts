import { Injectable, NgZone } from '@angular/core';
import { LiveUpdate, NextBundleSetEvent } from '@capawesome/capacitor-live-update';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CapacitorLiveUpdateService {
  private readonly nextBundleSetSubject = new Subject<NextBundleSetEvent>();

  constructor(private readonly ngZone: NgZone) {
    void LiveUpdate.removeAllListeners().then(() => {
      void LiveUpdate.addListener('nextBundleSet', event => {
        this.ngZone.run(() => {
          this.nextBundleSetSubject.next(event);
        });
      });
    });
  }

  public get nextBundleSet$(): Observable<NextBundleSetEvent> {
    return this.nextBundleSetSubject.asObservable();
  }

  public async ready(): Promise<void> {
    await LiveUpdate.ready();
  }

  public async reload(): Promise<void> {
    await LiveUpdate.reload();
  }
}
