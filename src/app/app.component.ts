import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {User} from './_models/user';
import {AuthenticationService} from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [`.articles, .invoices {
    background-image: linear-gradient(120deg, #3cecfd 0%, #5c7ffb 100%);
    border-radius: 25px;
    margin-left: 15px;
    margin-right: 15px;
  }`]
})
export class AppComponent {
  title = 'ProyectoIntegrado';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    if (this.currentUser) {
      this.router.navigate(['/articles']);
    }
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
