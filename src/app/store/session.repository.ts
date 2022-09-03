import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { createState, Store, withProps } from '@ngneat/elf';
import { persistState } from '@ngneat/elf-persist-state';
import { capacitorStateStorage } from './capacitor-state-storage';

export interface SessionProperties {
  accessToken: string | undefined;
  refreshToken: string | undefined;
  user: User | undefined;
}

export interface User {
  firstname: string;
  lastname: string;
  course?: string;
  isStudent: boolean;
  username: string;
}

const { state, config } = createState(
  withProps<SessionProperties>({
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined,
  }),
);
const store = new Store({ name: 'session', state, config });

export const persistSessionRepository = persistState(store, {
  key: environment.localStorageKeyPrefix + 'session',
  storage: capacitorStateStorage,
});

@Injectable({ providedIn: 'root' })
export class SessionRepository {
  public setAccessToken(accessToken: SessionProperties['accessToken']): void {
    store.update(state => ({
      ...state,
      accessToken,
    }));
  }

  public getAccessToken(): SessionProperties['accessToken'] {
    const { accessToken } = store.getValue();
    return accessToken;
  }

  public setRefreshToken(refreshToken: SessionProperties['refreshToken']): void {
    store.update(state => ({
      ...state,
      refreshToken,
    }));
  }

  public getRefreshToken(): SessionProperties['refreshToken'] {
    const { refreshToken } = store.getValue();
    return refreshToken;
  }

  public setUser(user: SessionProperties['user']): void {
    store.update(state => ({
      ...state,
      user,
    }));
  }

  public getUser(): SessionProperties['user'] {
    const { user } = store.getValue();
    return user;
  }

  public clear(): void {
    this.setAccessToken(undefined);
    this.setRefreshToken(undefined);
    this.setUser(undefined);
  }
}
