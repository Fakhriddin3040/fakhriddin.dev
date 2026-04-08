import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

export type Loadable<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T };

export function toLoadable<T>(source$: Observable<T>): Observable<Loadable<T>> {
  return source$.pipe(
    map((data) => ({ status: 'success', data }) as const),
    startWith({ status: 'loading' } as const),
    catchError((err: unknown) => {
      const message =
        err instanceof Error ? err.message : typeof err === 'string' ? err : 'Unknown error';
      return of({ status: 'error', message } as const);
    }),
  );
}

