import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionRepository } from '@app/store';
import { environment } from '@env/environment';
import { NavController } from '@ionic/angular';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly navController: NavController,
    private readonly sessionRepository: SessionRepository,
    private readonly httpClient: HttpClient,
  ) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      !request.url.includes(environment.apiBaseUrl) ||
      request.url.includes('token') ||
      request.url.includes('register')
    ) {
      return next.handle(request);
    }
    let requestClone = request;
    requestClone = this.addAuthorizationHeader(requestClone);
    return next.handle(requestClone).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handleHttpAuthError(error, request).pipe(
            catchError((error: HttpErrorResponse) => {
              this.authenticationService.logout();
              void this.navController.navigateRoot(['/login']);
              return throwError(() => error);
            }),
          );
        } else {
          return throwError(() => error);
        }
      }),
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>): HttpRequest<any> {
    const accessToken = this.sessionRepository.getAccessToken();
    if (!accessToken) {
      return request;
    }
    const headers = request.headers.set('Authorization', `Bearer ${accessToken}`);
    const clonedRequest = request.clone({ headers });
    return clonedRequest;
  }

  private handleHttpAuthError(
    httpErrorResponse: HttpErrorResponse,
    request: HttpRequest<any>,
  ): Observable<HttpEvent<any>> {
    return from(
      this.authenticationService.refreshSession().then(
        () => {},
        error => {
          return error;
        },
      ),
    ).pipe(
      switchMap(error => {
        if (error) {
          return throwError(() => error);
        } else {
          return this.retryHttpRequest(request);
        }
      }),
    );
  }

  private retryHttpRequest(httpRequest: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.httpClient.request(httpRequest);
  }
}
