import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/authentication';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
  ) {}

  public async canActivate(): Promise<boolean> {
    const isAuthenticated = this.authenticationService.isAuthenticated();
    if (!isAuthenticated) {
      void this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
