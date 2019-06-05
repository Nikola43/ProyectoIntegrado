import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './_guards';
import {LoginComponent} from './_components/login/login.component';
import {ClinicsComponent} from './_components/clinics/clinics.component';
import {ClinicComponent} from './_components/clinic/clinic.component';
import {PromosComponent} from './_components/promos/promos.component';
import {ArticlesComponent} from './_components/articles/articles.component';
import {StreamingComponent} from './_components/streaming/streaming.component';
import {CalculatorComponent} from './_components/calculator/calculator.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'articles',
    component: ArticlesComponent
  },
  {
    path: 'invoices',
    component: ClinicsComponent
  },
  {
    path: 'clinic',
    component: ClinicComponent
  },
  {
    path: 'promos',
    component: PromosComponent
  },
  {
    path: 'messages',
    component: PromosComponent
  },
  {
    path: 'streaming',
    component: StreamingComponent
  },
  {
    path: 'calculator',
    component: CalculatorComponent
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
