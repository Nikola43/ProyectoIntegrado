import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule, MDBBootstrapModulesPro, MDBSpinningPreloader, ToastModule, WavesModule} from 'ng-uikit-pro-standard';
import { LoginComponent } from './_components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor, JwtInterceptor} from './_helpers';
import {ArticlesComponent} from './_components/articles/articles.component';
import {MdbTableEditorModule} from 'mdb-table-editor';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ClinicsComponent} from './_components/clinics/clinics.component';
import { ClinicComponent } from './_components/clinic/clinic.component';
import {PromosComponent} from './_components/promos/promos.component';
import {MessagesComponent} from './_components/messages/messages.component';
import {StreamingComponent} from './_components/streaming/streaming.component';
import {CalculatorComponent} from './_components/calculator/calculator.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticlesComponent,
    ClinicsComponent,
    ClinicComponent,
    PromosComponent,
    MessagesComponent,
    StreamingComponent,
    CalculatorComponent,
  ],
  imports: [
    WavesModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModulesPro.forRoot(),
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdbTableEditorModule,
    ToastModule.forRoot(),
    NoopAnimationsModule,
    MDBBootstrapModule.forRoot(),
  ],
  providers: [
    MDBSpinningPreloader,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    // provider used to create fake backend
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas:      [ NO_ERRORS_SCHEMA ]
})
export class AppModule {
}
