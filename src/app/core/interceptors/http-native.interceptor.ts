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
import { HTTPResponse } from '@awesome-cordova-plugins/http/ngx';
import { Observable } from 'rxjs';
import {
  INativeHttpRequestOptions,
  INativeHttpRequestOptionsHeaders,
  INativeHttpRequestOptionsParameters,
  NativeHttpMethod,
  NativeHttpService,
} from '../services';

const LOGTAG = '[HttpNativeInterceptor]';

@Injectable({
  providedIn: 'root',
})
export class HttpNativeInterceptor implements HttpInterceptor {
  constructor(private readonly nativeHttpService: NativeHttpService) {}

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
      const options = this.getNativeHttpRequestOptionsFrom(request);
      const requestId = this.nativeHttpService.request(
        request.url,
        options,
        response => {
          const ngHttpResponse = this.convertNativeToNgHttpResponse(response);
          subscribe.next(ngHttpResponse);
          subscribe.complete();
        },
        error => {
          if (error.status === -8) {
            // Ignore errors thrown when a request is aborted
            // https://github.com/silkimen/cordova-plugin-advanced-http#abort
            subscribe.complete();
          }
          const ngHttpErrorResponse = this.convertNativeToNgHttpErrorResponse(error);
          subscribe.error(ngHttpErrorResponse);
          subscribe.complete();
        },
      );
      return () => {
        this.nativeHttpService
          .abort(requestId)
          .catch(error => console.error(`${LOGTAG} Error occurred while aborting native request.`, error));
      };
    });
  }

  private getNativeHttpRequestOptionsFrom(request: HttpRequest<any>): INativeHttpRequestOptions {
    const method = request.method.toUpperCase() as NativeHttpMethod;
    const data = request.body;
    const headers = this.convertNgToNativeHttpHeaders(request.headers);
    const parameters = this.convertNgToNativeHttpParams(request.params);
    const options: INativeHttpRequestOptions = {
      method: method,
      data: data,
      headers: headers,
      params: parameters,
    };
    return options;
  }

  private convertNativeToNgHttpResponse<T = any>(response: HTTPResponse): HttpResponse<T> {
    return new HttpResponse<T>({
      body: response.data,
      headers: new HttpHeaders(response.headers),
      status: response.status,
      statusText: undefined,
      url: response.url,
    });
  }

  private convertNativeToNgHttpErrorResponse(response: HTTPResponse): HttpErrorResponse {
    return new HttpErrorResponse({
      error: response.error,
      headers: new HttpHeaders(response.headers),
      status: response.status,
      statusText: undefined,
      url: response.url,
    });
  }

  private convertNgToNativeHttpHeaders(ngHttpHeaders: HttpHeaders): INativeHttpRequestOptionsHeaders {
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

  private convertNgToNativeHttpParams(ngHttpParameters: HttpParams): INativeHttpRequestOptionsParameters {
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
