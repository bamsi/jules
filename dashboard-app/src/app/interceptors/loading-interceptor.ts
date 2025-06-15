import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading';

export function loadingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const loadingService = inject(LoadingService);

  // Use setTimeout to defer the change to the next tick
  const loadingTimeout = setTimeout(() => loadingService.show());

  return next(req).pipe(
    finalize(() => {
      clearTimeout(loadingTimeout);
      loadingService.hide();
    })
  );
}
