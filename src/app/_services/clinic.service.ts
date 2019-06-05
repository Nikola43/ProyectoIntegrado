import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Clinic} from '../_models/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<Clinic[]>(this.apiUrl + '/clinic');
  }

  getClinic(id: number) {
    return this.http.get<Clinic>(this.apiUrl + '/clinic/' + id);
  }
}
