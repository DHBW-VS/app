import { TestBed } from '@angular/core/testing';
import { StorageKey } from '@app/core/enums';
import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = new StorageService();
  });

  afterEach(async () => {
    void service.clearStorage();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve data', async () => {
    const input = 'test';
    await service.storeData<string>(StorageKey.User, input);
    const storedData = await service.retrieveData<string>(StorageKey.User);
    expect(storedData).toBe(input);
  });

  it('should store and remove data', async () => {
    await service.storeData<string>(StorageKey.User, 'test');
    await service.removeData(StorageKey.User);
    const storedData = await service.retrieveData<string>(StorageKey.User);
    expect(storedData).toBeNull();
  });

  it('should clear the storage', async () => {
    await service.storeData<string>(StorageKey.User, 'test');
    await service.clearStorage();
    const storedData = await service.retrieveData<string>(StorageKey.User);
    expect(storedData).toBeNull();
  });
});
