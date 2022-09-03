import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { TimeoutError } from 'rxjs';
import { DialogService } from '../dialog/dialog.service';

const LOGTAG = '[GlobalErrorHandlerService]';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  public handleError(error: unknown): void {
    void this.handle(error);
  }

  private async handle(error: unknown): Promise<void> {
    try {
      console.error(error);
      const dialogService: DialogService = this.injector.get<DialogService>(DialogService);
      const message = this.getMessageFromUnknownError(error);
      await dialogService.showErrorAlert({ message });
    } catch (errorHandlerError) {
      console.error(`${LOGTAG} Internal exception:`, errorHandlerError);
    }
  }

  private getMessageFromUnknownError(error: unknown): string {
    let message = 'Ein unbekannter Fehler ist aufgetreten.';
    if (error instanceof Object && 'rejection' in error) {
      error = (error as any).rejection;
    }
    if (error instanceof HttpErrorResponse) {
      message = this.getMessageFromHttpErrorResponse(error);
    } else if (error instanceof TimeoutError) {
      message = this.getMessageFromTimeoutError(error);
    } else if (error instanceof Error && error.message) {
      message = error.message;
    }
    return message;
  }

  private getMessageFromHttpErrorResponse(error: HttpErrorResponse): string {
    let message: string = 'Ein unbekannter Fehler ist aufgetreten.';
    if (!error.status || error.status <= 0) {
      message = [
        'Es konnte keine Verbindung hergestellt werden.',
        'Bitte überprüfe deine Internetverbindung und versuche es später erneut.',
      ].join(' ');
    }
    return message;
  }

  private getMessageFromTimeoutError(error: TimeoutError): string {
    return [
      'Es kam zu einer Zeitüberschreitung.',
      'Bitte überprüfe deine Internetverbindung und versuche es später erneut.',
    ].join(' ');
  }
}
