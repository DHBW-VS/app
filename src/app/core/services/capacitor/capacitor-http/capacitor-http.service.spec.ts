import { TestBed } from '@angular/core/testing';

import { CapacitorHttpService } from './capacitor-http.service';

describe('CapacitorHttpService', () => {
  let service: CapacitorHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacitorHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
