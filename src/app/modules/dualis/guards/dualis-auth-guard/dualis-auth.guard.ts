import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DualisAuthService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class DualisAuthGuard implements CanActivate {
  constructor(private readonly dualisAuthService: DualisAuthService, private readonly router: Router) {}

  public canActivate(): boolean {
    const session = this.dualisAuthService.getSession();
    if (!session || session.isExpired()) {
      void this.router.navigate(['/dualis/login']);
      return false;
    }
    return true;
  }
}
