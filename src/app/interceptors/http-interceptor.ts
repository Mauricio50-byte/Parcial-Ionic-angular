import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const httpInterceptor: HttpInterceptorFn = (request, next) => {
  let authReq = request.clone();

  if (request.url.includes(environment.apiUrl.news)) {
    authReq = request.clone({
      setHeaders: {
        'X-Api-Key': environment.newsApiKey
      }
    });
  }

  return next(authReq);
};
