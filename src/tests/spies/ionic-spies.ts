import { createSpyObj } from '@tests/helpers';

export function createNavControllerSpy(): any {
  return createSpyObj('NavController', {
    goBack: () => Promise.resolve(),
    navigateForward: () => Promise.resolve(),
    navigateRoot: () => Promise.resolve(),
  });
}

export function createOverlayElementSpy(name: string): any {
  return createSpyObj(name, {
    dismiss: () => Promise.resolve(),
    onDidDismiss: () => Promise.resolve(),
    onWillDismiss: () => Promise.resolve(),
    present: () => Promise.resolve(),
  });
}

export function createOverlayControllerSpy(name: string, element?: any): any {
  return createSpyObj(name, {
    create: () => Promise.resolve(element),
    dismiss: () => Promise.resolve(),
    getTop: () => Promise.resolve(element),
  });
}

export function createPlatformSpy(): any {
  return createSpyObj<{ is: boolean; ready: Promise<void> }>('Platform', {
    is: () => false,
    ready: () => Promise.resolve(),
  });
}
