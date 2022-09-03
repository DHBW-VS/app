import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { createDialogServiceSpy } from '@tests/spies';
import { DialogService } from '../dialog/dialog.service';
import { GlobalErrorHandlerService } from './global-error-handler.service';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandlerService;
  let dialogServiceSpy: jest.Mocked<DialogService>;
  let originalConsoleError: Console['error'];

  beforeEach(() => {
    dialogServiceSpy = createDialogServiceSpy();
    originalConsoleError = console.error;
    console.error = jest.fn();

    TestBed.configureTestingModule({
      providers: [Injector, { provide: DialogService, useValue: dialogServiceSpy }],
    });

    service = TestBed.inject(GlobalErrorHandlerService);
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should display the default error message', () => {
    service.handleError({});
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(dialogServiceSpy.showErrorAlert).toHaveBeenCalledTimes(1);
    expect(dialogServiceSpy.showErrorAlert).toHaveBeenCalledWith({
      message: 'Ein unbekannter Fehler ist aufgetreten.',
    });
  });

  it('should display the correct parsed error message', () => {
    service.handleError(new Error('Test'));
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(dialogServiceSpy.showErrorAlert).toHaveBeenCalledTimes(1);
    expect(dialogServiceSpy.showErrorAlert).toHaveBeenCalledWith({
      message: 'Test',
    });
  });
});
