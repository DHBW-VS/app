import { Injectable } from '@angular/core';
import { StorageKey } from '@app/core/enums';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public async storeData<T>(key: StorageKey, data: T): Promise<void> {
    const valueAsString = JSON.stringify(data);
    await Preferences.set({ key: key, value: valueAsString });
  }

  public async retrieveData<T>(key: StorageKey): Promise<T | null> {
    const item = await Preferences.get({ key: key });
    return item.value === null ? null : JSON.parse(item.value);
  }

  public async removeData(key: StorageKey): Promise<void> {
    await Preferences.remove({ key: key });
  }

  public async clearStorage(): Promise<void> {
    await Preferences.clear();
  }
}
