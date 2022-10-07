import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '@app/config';
import {
  HttpHeaders as NativeHttpHeaders,
  HttpParams as NativeHttpParams,
  HttpResponse as NativeHttpResponse,
} from '@capacitor/core';
import { Observable } from 'rxjs';
import { CapacitorHttpService } from '../services';

const LOGTAG = '[HttpNativeInterceptor]';

@Injectable({
  providedIn: 'root',
})
export class HttpNativeInterceptor implements HttpInterceptor {
  constructor(private readonly capacitorHttpService: CapacitorHttpService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.startsWith('http')) {
      return next.handle(request);
    }
    if (request.url.startsWith(Config.dualisBaseUrl)) {
      return this.handleNativeRequest(request);
    }
    return next.handle(request);
  }

  private handleNativeRequest(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable(subscribe => {
      const method = request.method.toLowerCase();
      const headers = this.convertNgToNativeHttpHeaders(request.headers);
      const parameters = this.convertNgToNativeHttpParams(request.params);
      this.capacitorHttpService
        .request({
          method,
          url: request.url,
          headers,
          params: parameters,
          data: request.body,
        })
        .then(result => {
          const ngHttpResponse = this.convertNativeToNgHttpResponse(result);
          subscribe.next(ngHttpResponse);
          subscribe.complete();
        })
        .catch(error => {
          const ngHttpErrorResponse = this.convertNativeToNgHttpErrorResponse(error);
          subscribe.error(ngHttpErrorResponse);
          subscribe.complete();
        });
    });
  }

  private convertNativeToNgHttpResponse<T = any>(response: NativeHttpResponse): HttpResponse<T> {
    return new HttpResponse<T>({
      body: response.data,
      headers: new HttpHeaders(response.headers),
      status: response.status,
      statusText: undefined,
      url: response.url,
    });
  }

  private convertNativeToNgHttpErrorResponse(response: NativeHttpResponse): HttpErrorResponse {
    return new HttpErrorResponse({
      error: '', // TODO
      headers: new HttpHeaders(response.headers),
      status: response.status,
      statusText: undefined,
      url: response.url,
    });
  }

  private convertNgToNativeHttpHeaders(ngHttpHeaders: HttpHeaders): NativeHttpHeaders {
    const nativeHttpHeaders: { [name: string]: string } = {};
    for (const headerKey of ngHttpHeaders.keys()) {
      const headerValue = ngHttpHeaders.get(headerKey);
      if (!headerValue) {
        continue;
      }
      nativeHttpHeaders[headerKey] = headerValue;
    }
    return nativeHttpHeaders;
  }

  private convertNgToNativeHttpParams(ngHttpParameters: HttpParams): NativeHttpParams {
    const nativeHttpParameters: { [name: string]: string } = {};
    for (const headerKey of ngHttpParameters.keys()) {
      const headerValue = ngHttpParameters.get(headerKey);
      if (!headerValue) {
        continue;
      }
      nativeHttpParameters[headerKey] = headerValue;
    }
    return nativeHttpParameters;
  }
}
