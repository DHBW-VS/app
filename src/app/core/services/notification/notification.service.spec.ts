import { TestBed } from '@angular/core/testing';
import { ToastController } from '@ionic/angular';
import { createSpyObj } from '@tests/helpers';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let toastControllerSpy: jest.Mocked<ToastController>;

  beforeEach(() => {
    toastControllerSpy = createSpyObj('ToastController', {
      create: undefined,
      dismiss: undefined,
    });

    TestBed.configureTestingModule({
      providers: [{ provide: ToastController, useValue: toastControllerSpy }],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show a toast', async () => {
    const htmlIonElmSpy = createSpyObj('HTMLIonToastElement', {
      present: undefined,
    });
    toastControllerSpy.create.mockReturnValue(Promise.resolve(htmlIonElmSpy));
    const defaultOptions = {
      duration: 3000,
      position: 'bottom',
      buttons: [
        {
          text: 'OK',
          side: 'end',
        },
      ],
    };
    const options = { header: 'Test' };
    const result = await service.showToast(options);
    expect(result).toBe(htmlIonElmSpy);
    expect(toastControllerSpy.create).toHaveBeenCalledTimes(1);
    expect(toastControllerSpy.create).toHaveBeenCalledWith({ ...defaultOptions, ...options });
    expect(htmlIonElmSpy.present).toHaveBeenCalledTimes(1);
  });

  it('should dismiss a toast', async () => {
    const exspectedResult = true;
    toastControllerSpy.dismiss.mockReturnValue(Promise.resolve(exspectedResult));
    const result = await service.dismissToast();
    expect(result).toBe(exspectedResult);
    expect(toastControllerSpy.dismiss).toHaveBeenCalledTimes(1);
  });
});
