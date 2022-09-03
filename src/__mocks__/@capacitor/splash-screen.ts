import { HideOptions, ShowOptions, SplashScreenPlugin } from '@capacitor/splash-screen';

export const SplashScreen: SplashScreenPlugin = {
  async show(options?: ShowOptions): Promise<void> {},
  async hide(options?: HideOptions): Promise<void> {},
};
