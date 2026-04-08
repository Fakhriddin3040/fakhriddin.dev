import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { ApiService } from './core/services/api.service';
import { MockApiService } from './core/services/mock-api.service';
import { HttpApiService } from './core/services/http-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideAnimations(),
    MockApiService,
    HttpApiService,
    {
      provide: ApiService,
      useFactory: (mock: MockApiService, http: HttpApiService) => (environment.apiMode === 'mock' ? mock : http),
      deps: [MockApiService, HttpApiService],
    },
  ],
};
