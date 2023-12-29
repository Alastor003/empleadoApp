import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EstaActivo } from './features/empleado/pipes/estaActivo.pipe';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              importProvidersFrom(HttpClientModule, ReactiveFormsModule, EstaActivo)]
};
