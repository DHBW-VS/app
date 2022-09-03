import {
  AnimationOptions,
  BackgroundColorOptions,
  SetOverlaysWebViewOptions,
  StatusBarInfo,
  StatusBarPlugin,
  Style,
  StyleOptions,
} from '@capacitor/status-bar';

export const StatusBar: StatusBarPlugin = {
  async setStyle(options: StyleOptions): Promise<void> {},
  async setBackgroundColor(options: BackgroundColorOptions): Promise<void> {},
  async show(options?: AnimationOptions): Promise<void> {},
  async hide(options?: AnimationOptions): Promise<void> {},
  async getInfo(): Promise<StatusBarInfo> {
    return {
      style: Style.Default,
      visible: true,
    };
  },
  async setOverlaysWebView(options: SetOverlaysWebViewOptions): Promise<void> {},
};

export { Style } from '@capacitor/status-bar';
