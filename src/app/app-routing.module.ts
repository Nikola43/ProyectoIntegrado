import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './_components/login/login.component';
import {ArticlesComponent} from './_components/articles/articles.component';
import {AuthGuard} from './_guards/auth.guard';
import {InvoicesComponent} from './_components/invoices/invoices.component';

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
    component: InvoicesComponent
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
