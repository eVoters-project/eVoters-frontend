import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { VoterApiService, VoterMapLocationApiService } from './service/api';
import { MapService, VoterMapLocationService } from './service/map';
import { BaseService } from './service';
import { VoterService } from './modules/voters/service/voter.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(routes),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true
    }),
    BaseService,
    MapService,
    VoterMapLocationApiService,
    VoterMapLocationService,
  ]
};

