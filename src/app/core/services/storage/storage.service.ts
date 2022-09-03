import { Injectable } from '@angular/core';
import { StorageKey } from '@app/core/enums';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public async storeData<T>(key: StorageKey, data: T): Promise<void> {
    const valueAsString = JSON.stringify(data);
    await Storage.set({ key: key, value: valueAsString });
  }

  public async retrieveData<T>(key: StorageKey): Promise<T | null> {
    const item = await Storage.get({ key: key });
    return item.value === null ? null : JSON.parse(item.value);
  }

  public async removeData(key: StorageKey): Promise<void> {
    await Storage.remove({ key: key });
  }

  public async clearStorage(): Promise<void> {
    await Storage.clear();
  }
}
