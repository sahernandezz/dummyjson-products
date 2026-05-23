import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Ha ocurrido un error inesperado';

      if (error.status === 0) {
        message = 'No se pudo conectar con el servidor';
      } else if (error.status === 404) {
        message = 'Producto no encontrado';
      } else if (error.status >= 500) {
        message = 'Error en el servidor. Intenta más tarde';
      }

      notification.show(message, 'error');
      return throwError(() => error);
    })
  );
};
