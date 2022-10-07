import { Preferences } from '@capacitor/preferences';
import { StateStorage } from '@ngneat/elf-persist-state';

export const capacitorStateStorage: StateStorage = {
  getItem: async (key: string): Promise<any> => {
    const { value } = await Preferences.get({ key });
    if (value) {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } else {
      return undefined;
    }
  },
  removeItem: async (key: string): Promise<any> => {
    await Preferences.remove({ key });
  },
  setItem: async (key: any, value: Record<string, any>) => {
    await Preferences.set({
      key,
      value: JSON.stringify(value),
    });
  },
};
