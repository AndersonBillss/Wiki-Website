import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule), provideIonicAngular({})]
};
