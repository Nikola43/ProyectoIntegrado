import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MDBBootstrapModule, MDBBootstrapModulesPro, MDBSpinningPreloader, ToastModule, WavesModule} from 'ng-uikit-pro-standard';
import {LoginComponent} from './_components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ArticlesComponent} from './_components/articles/articles.component';
import {MdbTableEditorModule} from 'mdb-table-editor';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UserComponent} from './_components/user/user.component';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {InvoicesComponent} from './_components/invoices/invoices.component';
import {InvoiceDetailsComponent} from './_components/invoice-detail/invoice-details.component';
import {SuccessBottomModalComponent} from './_components/modals/success-bottom-modal/success-bottom-modal.component';
import { ConfirmDeleteComponent } from './_components/modals/confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticlesComponent,
    UserComponent,
    InvoicesComponent,
    InvoiceDetailsComponent,
    SuccessBottomModalComponent,
    ConfirmDeleteComponent
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
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // provider used to create fake backend
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
