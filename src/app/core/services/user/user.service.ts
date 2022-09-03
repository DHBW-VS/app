import { Injectable } from '@angular/core';
import { SessionRepository } from '@app/store';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  public getUsername(): string {
    const user = this.sessionRepository.getUser();
    if (!user) {
      return '';
    }
    return user.username;
  }

  public getFirstname(): string {
    const user = this.sessionRepository.getUser();
    if (!user) {
      return '';
    }
    return user.firstname;
  }

  public getLastname(): string {
    const user = this.sessionRepository.getUser();
    if (!user) {
      return '';
    }
    return user.lastname;
  }

  public getCourse(): string {
    const user = this.sessionRepository.getUser();
    if (!user) {
      return '';
    }
    return user.course || '';
  }

  public isStudent(): boolean {
    const user = this.sessionRepository.getUser();
    if (!user) {
      return false;
    }
    return user.isStudent;
  }
}
