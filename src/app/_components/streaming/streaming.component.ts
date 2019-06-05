import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MdbTableEditorDirective} from 'mdb-table-editor';
import {HttpClient} from '@angular/common/http';
import {first} from 'rxjs/operators';
import {UserService} from '../../_services';
import {User} from '../../_models/user';
import {ToastService} from 'ng-uikit-pro-standard';
import {Clinic} from '../../_models/clinic';
import {ClinicService} from '../../_services/clinic.service';

@Component({
  selector: 'app-users',
  templateUrl: './streaming.component.html',
  styleUrls: ['./streaming.component.scss']
})
export class StreamingComponent implements OnInit {
  constructor() {
  }
  ngOnInit() {
  }
}
