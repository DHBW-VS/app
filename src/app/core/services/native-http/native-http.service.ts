import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@awesome-cordova-plugins/http/ngx';

export enum NativeHttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  HEAD = 'head',
  DELETE = 'delete',
  OPTIONS = 'options',
}

export interface INativeHttpRequestOptions {
  method: NativeHttpMethod;
  headers?: INativeHttpRequestOptionsHeaders;
  params?: INativeHttpRequestOptionsParameters;
  data?: unknown;
  serializer?: INativeHttpRequestSerializer;
}

export type INativeHttpRequestSerializer = 'urlencoded' | 'json' | 'utf8' | 'multipart' | 'raw';

export type INativeHttpRequestOptionsHeaders = { [name: string]: string };

export type INativeHttpRequestOptionsParameters = { [name: string]: string };

export interface INativeHttpAbortedResult {
  aborted: boolean;
}

const LOGTAG = '[NativeHttpService]';

@Injectable({
  providedIn: 'root',
})
export class NativeHttpService {
  private readonly defaultDataSerializer: INativeHttpRequestSerializer = 'json';

  constructor(private readonly nativeHttp: HTTP) {}

  /**
   * Execute a HTTP request.
   * @returns Request ID
   * @see https://github.com/silkimen/cordova-plugin-advanced-http#sendrequest
   */
  public request(
    url: string,
    options: INativeHttpRequestOptions,
    successCallback: (response: HTTPResponse) => void,
    errorCallback: (response: HTTPResponse) => void,
  ): number {
    if (!options.serializer) {
      const contentType = this.findContentTypeHeader(options.headers || {});
      const dataSerializer = this.getDataSerializerByContentType(contentType);
      options.serializer = dataSerializer || this.defaultDataSerializer;
    }
    return (window as any).cordova.plugin.http.sendRequest(url, options, successCallback, errorCallback);
  }

  /**
   * Abort a HTTP request.
   * @see https://github.com/silkimen/cordova-plugin-advanced-http#abort
   */
  public abort(requestId: number): Promise<INativeHttpAbortedResult> {
    return new Promise((resolve, reject) => {
      (window as any).cordova.plugin.http.abort(
        requestId,
        (result: INativeHttpAbortedResult) => {
          resolve(result);
        },
        (error: any) => {
          reject(error.error);
        },
      );
    });
  }

  private findContentTypeHeader(headers: INativeHttpRequestOptionsHeaders): string | undefined {
    return headers['Content-Type'] || headers['content-type'] || undefined;
  }

  private getDataSerializerByContentType(contentType: string | undefined): INativeHttpRequestSerializer | null {
    if (!contentType) {
      return null;
    }
    if (contentType.startsWith('application/json')) {
      return 'json';
    } else if (contentType.startsWith('application/x-www-form-urlencoded')) {
      return 'urlencoded';
    } else if (contentType.startsWith('plain/text')) {
      return 'utf8';
    } else if (contentType.startsWith('multipart/form-data')) {
      return 'multipart';
    } else if (contentType.startsWith('application/octet-stream')) {
      return 'raw';
    }
    return null;
  }
}
