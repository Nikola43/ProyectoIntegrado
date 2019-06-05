import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services';
import {User} from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [`.articles, .invoices {
    background-color: #33b5e5;
    border-radius: 25px;
    margin-left: 15px;
    margin-right: 15px;
    border: 1px solid #33b5e5;
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
      this.router.navigate(['/users']);
    }
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
