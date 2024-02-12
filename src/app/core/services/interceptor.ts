import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationService } from './auth.service';
import { NotificationService } from './notification.service';

@Injectable()
export class IHttpInterceptor implements HttpInterceptor {
  constructor(
    private ngxService: NgxUiLoaderService,
    private auth: AuthenticationService,
    private notification: NotificationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.ngxService.start();
    // Endpoints not to set bearer token to
    if (this.excludedEndpoints(request)) {
      return next.handle(request).pipe(
        catchError((error) => this.handleError(error, next, request)),
        finalize(() => this.ngxService.stop())
      );
    }

    const token = localStorage['token']?.replaceAll('"', '') || '';
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: token,
      },
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error) => this.handleError(error, next, modifiedRequest)),
      finalize(() => this.ngxService.stop())
    );
  }

  private excludedEndpoints(req: HttpRequest<any>): boolean {
    const excludedEnpoints = ['create-admin', 'login'];
    const endpointParts = req.url.split('/');
    const endpoint = endpointParts[endpointParts.length - 1];
    return excludedEnpoints.includes(endpoint);
  }

  private handleError(
    err: HttpErrorResponse,
    next: HttpHandler,
    req: HttpRequest<any>
  ) {
    const statusCode = err.status;
    const errorMessage = err?.error?.message;

    console.log('Error Message: ', err);

    switch (statusCode) {
      case 401:
        // if (this.excludedEndpoints(req)) {
        this.notification.error(errorMessage || 'You Are Unauthorized');
        this.auth.logout();
        return throwError(() => err);
      // } else return this.refreshToken(req, next);
      case 400:
        this.notification.error(errorMessage || 'Bad Request');
        return throwError(() => err);
      case 403:
        this.notification.error(errorMessage || 'Forbidden To Access Resource');
        return throwError(() => err);
      case 404:
        this.notification.error(errorMessage || 'Resource Not Found');
        return throwError(() => err);
      case 415:
        this.notification.error(errorMessage || 'Unsupported Media Type');
        return throwError(() => err);
      case 0:
        this.notification.error(
          errorMessage || 'Please Check Your Network Connection'
        );
        return throwError(() => err);
      case 503:
        this.notification.error(
          errorMessage || 'Service Unavailable, Please Try Again Later'
        );
        return throwError(() => err);
      case 504:
        this.notification.error(errorMessage || 'Gateway Timeout');
        return throwError(() => err);
      case 500:
        this.notification.error(
          errorMessage || 'Internal Server Error, Please Try Again Later'
        );
        return throwError(() => err);
      default:
        return throwError(() => err);
    }
  }
}
