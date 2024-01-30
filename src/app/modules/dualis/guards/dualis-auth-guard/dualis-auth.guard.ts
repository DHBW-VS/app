import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DualisAuthService } from '../../services';

@Injectable({
  providedIn: 'root',
})
export class DualisAuthGuard {
  constructor(
    private readonly dualisAuthService: DualisAuthService,
    private readonly router: Router,
  ) {}

  public canActivate(): boolean {
    const session = this.dualisAuthService.getSession();
    if (!session || session.isExpired()) {
      void this.router.navigate(['/dualis/login']);
      return false;
    }
    return true;
  }
}
