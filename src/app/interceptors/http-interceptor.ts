import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class httpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Clonar la petición para poder modificarla
    let authReq = request.clone();
    
    // Verificar si la petición es para la API de noticias
    if (request.url.includes(environment.apiUrl.news)) {
      // Añadir el header de autorización con la API key
      authReq = request.clone({
        setHeaders: {
          'X-Api-Key': environment.newsApiKey
        }
      });
    }
    
    // Pasar la petición modificada al siguiente manejador
    return next.handle(authReq);
  }
}