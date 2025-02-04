// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse,
//   HttpHeaders,
// } from '@angular/common/http';
// import { catchError, Observable, throwError, switchMap } from 'rxjs';
// import { AuthserviceService } from './../../auth/services/authservice.service';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthserviceService, private router: Router) {}

//   intercept(
//     request: HttpRequest<unknown>,
//     next: HttpHandler
//   ): Observable<HttpEvent<unknown>> {
//     const currentUser = this.authService.getToken();
//     console.log('Current User:', currentUser);

//     if (!request.url.includes('s3.ap-south-1.amazonaws.com')) {
//       request = request.clone({
//         setHeaders: { Authorization: `Bearer ${currentUser}` },
//       });
//     }

//     console.log('HTTP Request:', {
//       url: request.url,
//       method: request.method,
//       body: request.body,
//       headers: request.headers,
//     });

//     return next.handle(request).pipe(
//       catchError((error) => {
//         let errorMessage = '';

//         if (error instanceof HttpErrorResponse) {
//           switch (error.status) {
//             case 404:
//               errorMessage = `Resource not found at ${request.url}. Please check if the endpoint is correct.`;
//               console.error('404 Error:', errorMessage);
//               break;
//             case 401:
//               const isRef = confirm('Session Expired.. Do you want to continue?');
//               if (isRef) {
//                 return this.authService.refreshToken().pipe(
//                   switchMap(() => {
//                     const accessToken = sessionStorage.getItem('access_token');
//                     const newRequest = request.clone({
//                       setHeaders: { Authorization: `Bearer ${accessToken}` },
//                     });
//                     return next.handle(newRequest);
//                   })
//                 );
//               } else {
//                 this.router.navigate(['/login']);
//               }
//               break;
//             case 500:
//               errorMessage = 'Internal server error.';
//               break;
//             case 0:
//               errorMessage = 'Network error. Please check your connection.';
//               break;
//             default:
//               errorMessage = error.message || 'An error occurred. Please try again.';
//           }
//           console.error('Error occurred:', errorMessage);
//         } else {
//           console.error('An unexpected error occurred:', error);
//           errorMessage = 'An unexpected error occurred.';
//         }

//         return throwError(() => new Error(errorMessage));
//       })
//     );
//   }
// }


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  catchError,
  Observable,
  of,
  switchMap,
  take,
  throwError,
  filter,
} from 'rxjs';
import { AuthserviceService } from '../services/authservice.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshingToken = false;
  private refreshTokenSubject: Observable<any> | null = null;

  constructor(
    private authService: AuthserviceService,
    private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    const access_token = this.authService.getToken();
    //console.log("auth inter");

    let clonedRequest = request;

    if (
      access_token &&
      !request.url.includes('/api') &&
      !request.url.includes('/akv-interns')
    ) {
      clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`,
        },
      });
    }
    //console.log(request.url);
    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.log('came inside 1');
          if (!this.refreshingToken) {
            this.refreshingToken = true;
            console.log('came inside 2');
            this.refreshTokenSubject = this.authService.refreshToken().pipe(
              switchMap((newToken: any) => {
                console.log('came inside 3');
                this.authService.setToken(newToken.access_token);
                this.authService.setRefreshToken(newToken.refresh_token);
                return of(newToken.access_token);
              })
            );
          }
          return (
            this.refreshTokenSubject?.pipe(
              filter((token) => token !== null),
              take(1),
              switchMap((newAccessToken: string) => {
                console.log('new', newAccessToken);

                if (
                  !request.url.includes('/api') &&
                  !request.url.includes('/akv-interns')
                ) {
                  const updatedRequest = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newAccessToken}`,
                    },
                  });
                }
                this.toastr.success("New Access token generated Successfully","Success");
                console.log('New Access token generated SuccessFully');
                return next.handle(request);
              })
            ) || throwError(() => new Error('Token refresh failed'))
          );
        }
        return throwError(() => error);
      })
    );
  }
}