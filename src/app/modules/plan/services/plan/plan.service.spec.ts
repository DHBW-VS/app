import { TestBed } from '@angular/core/testing';
import { ApiPlansService, StorageService } from '@app/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Platform } from '@ionic/angular';
import { createSpyObj } from '@tests/helpers';
import { PlanService } from './plan.service';

describe('PlanService', () => {
  let service: PlanService;
  let platformSpy: jest.Mocked<Platform>;

  beforeEach(() => {
    platformSpy = createSpyObj('Platform', { is: () => true });

    TestBed.configureTestingModule({
      providers: [
        { provide: ApiPlansService, useValue: {} },
        { provide: File, useValue: {} },
        { provide: Platform, useValue: platformSpy },
        { provide: StorageService, useValue: {} },
      ],
    });

    service = TestBed.inject(PlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
