import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";

import { HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes), 
        provideAnimationsAsync(), 
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        }
    ]
};
