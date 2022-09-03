import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  AlertController,
  AngularDelegate,
  LoadingController,
  ModalController,
  PopoverController,
} from '@ionic/angular';
import { LoadingOptions, ModalOptions, PopoverOptions } from '@ionic/core';
import { createSpyObj } from '@tests/helpers';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;
  let alertControllerSpy: jest.Mocked<AlertController>;
  let loadingControllerSpy: jest.Mocked<LoadingController>;
  let popoverControllerSpy: jest.Mocked<PopoverController>;
  let modalControllerSpy: jest.Mocked<ModalController>;

  beforeEach(() => {
    alertControllerSpy = createSpyObj('AlertController', {
      create: undefined,
    });
    loadingControllerSpy = createSpyObj('LoadingController', {
      create: undefined,
    });
    popoverControllerSpy = createSpyObj('PopoverController', {
      create: undefined,
    });
    modalControllerSpy = createSpyObj('ModalController', {
      create: undefined,
      dismiss: undefined,
    });

    TestBed.configureTestingModule({
      providers: [
        AngularDelegate,
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: LoadingController, useValue: loadingControllerSpy },
        { provide: PopoverController, useValue: popoverControllerSpy },
        { provide: ModalController, useValue: modalControllerSpy },
      ],
    });

    service = TestBed.inject(DialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show an alert', async () => {
    const htmlIonElmSpy = createSpyObj('HTMLIonAlertElement', {
      present: undefined,
    });
    alertControllerSpy.create.mockReturnValue(Promise.resolve(htmlIonElmSpy));
    const options = { header: 'Test' };
    const result = await service.showAlert(options);
    expect(result).toBe(htmlIonElmSpy);
    expect(alertControllerSpy.create).toHaveBeenCalledTimes(1);
    expect(alertControllerSpy.create).toHaveBeenCalledWith(options);
    expect(htmlIonElmSpy.present).toHaveBeenCalledTimes(1);
  });

  it('should show an error alert', async () => {
    const htmlIonElmSpy = createSpyObj('HTMLIonAlertElement', {
      present: undefined,
    });
    alertControllerSpy.create.mockReturnValue(Promise.resolve(htmlIonElmSpy));
    const options = { header: 'Fehlgeschlagen', buttons: ['OK'] };
    const options2 = { message: 'Test' };
    const result = await service.showErrorAlert(options2);
    expect(result).toBe(htmlIonElmSpy);
    expect(alertControllerSpy.create).toHaveBeenCalledTimes(1);
    expect(alertControllerSpy.create).toHaveBeenCalledWith({ ...options, ...options2 });
    expect(htmlIonElmSpy.present).toHaveBeenCalledTimes(1);
  });

  it('should show a modal', async () => {
    const htmlIonElmSpy = createSpyObj('HTMLIonModalElement', {
      present: undefined,
    });
    modalControllerSpy.create.mockReturnValue(Promise.resolve(htmlIonElmSpy));
    const options: ModalOptions = {
      component: MockComponent,
    };
    const result = await service.showModal(options);
    expect(result).toBe(htmlIonElmSpy);
    expect(modalControllerSpy.create).toHaveBeenCalledTimes(1);
    expect(modalControllerSpy.create).toHaveBeenCalledWith(options);
    expect(htmlIonElmSpy.present).toHaveBeenCalledTimes(1);
  });

  it('should dismiss a modal', async () => {
    const exspectedResult = true;
    modalControllerSpy.dismiss.mockReturnValue(Promise.resolve(exspectedResult));
    const result = await service.dismissModal();
    expect(result).toBe(exspectedResult);
    expect(modalControllerSpy.dismiss).toHaveBeenCalledTimes(1);
  });

  it('should show a popover', async () => {
    const htmlIonElmSpy = createSpyObj('HTMLIonPopoverElement', {
      present: undefined,
    });
    popoverControllerSpy.create.mockReturnValue(Promise.resolve(htmlIonElmSpy));
    const options: PopoverOptions = {
      component: MockComponent,
    };
    const result = await service.showPopover(options);
    expect(result).toBe(htmlIonElmSpy);
    expect(popoverControllerSpy.create).toHaveBeenCalledTimes(1);
    expect(popoverControllerSpy.create).toHaveBeenCalledWith(options);
    expect(htmlIonElmSpy.present).toHaveBeenCalledTimes(1);
  });

  it('should show loading with default message', async () => {
    const htmlIonElmSpy = createSpyObj('HTMLIonLoadingElement', {
      present: undefined,
    });
    loadingControllerSpy.create.mockReturnValue(Promise.resolve(htmlIonElmSpy));
    const result = await service.showLoading();
    expect(result).toBe(htmlIonElmSpy);
    expect(loadingControllerSpy.create).toHaveBeenCalledTimes(1);
    expect(loadingControllerSpy.create).toHaveBeenCalledWith({ message: 'Bitte warten...' });
    expect(htmlIonElmSpy.present).toHaveBeenCalledTimes(1);
  });

  it('should show loading with custom message', async () => {
    const htmlIonElmSpy = createSpyObj('HTMLIonLoadingElement', {
      present: undefined,
    });
    loadingControllerSpy.create.mockReturnValue(Promise.resolve(htmlIonElmSpy));
    const options: LoadingOptions = {
      id: '1',
      message: 'test',
    };
    const result = await service.showLoading(options);
    expect(result).toBe(htmlIonElmSpy);
    expect(loadingControllerSpy.create).toHaveBeenCalledTimes(1);
    expect(loadingControllerSpy.create).toHaveBeenCalledWith(options);
    expect(htmlIonElmSpy.present).toHaveBeenCalledTimes(1);
  });
});

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mock',
  template: '<p>Modal</p>',
})
class MockComponent {}
