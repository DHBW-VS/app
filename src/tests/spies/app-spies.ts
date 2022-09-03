import { DialogService } from '@app/core';
import { createSpyObj } from '@tests/helpers';

export function createDialogServiceSpy(): jest.Mocked<DialogService> {
  const htmlIonElm = {
    dismiss: () => Promise.resolve(),
  };
  return createSpyObj<DialogService>('DialogService', {
    showErrorAlert: undefined,
    showLoading: Promise.resolve(htmlIonElm),
    showPopover: undefined,
    showModal: undefined,
  });
}
