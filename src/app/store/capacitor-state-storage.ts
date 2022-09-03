import { Storage } from '@capacitor/storage';
import { StateStorage } from '@ngneat/elf-persist-state';

export const capacitorStateStorage: StateStorage = {
  getItem: async (key: string): Promise<any> => {
    const { value } = await Storage.get({ key });
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
    await Storage.remove({ key });
  },
  setItem: async (key: any, value: Record<string, any>) => {
    await Storage.set({
      key,
      value: JSON.stringify(value),
    });
  },
};
