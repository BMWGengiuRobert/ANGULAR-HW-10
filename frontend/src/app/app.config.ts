import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { NgrxPageEffects } from './features/ngrx/store/ngrx.effects';
import { ngrxPageReducer } from './features/ngrx/store/ngrx.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideStore({ ngrxPage: ngrxPageReducer }),
    provideEffects(NgrxPageEffects),
    provideStoreDevtools({ maxAge: 25 }),
  ],
};
