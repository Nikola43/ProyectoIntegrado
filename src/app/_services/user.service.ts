import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../_models/user';


@Injectable({providedIn: 'root'})
export class UserService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl + '/user');
  }

  getAllByClinicID(clinicID) {
    return this.http.get<User[]>(this.apiUrl + '/user/clinic/' + clinicID);
  }

  insertUser(user: User) {
    return this.http.post<any>(this.apiUrl + '/user', JSON.stringify(user));
  }

  updateUser(user: User) {
    return this.http.put<any>(this.apiUrl + '/user/' + user.id, JSON.stringify(user));
  }

  deleteUser(userID: number) {
    return this.http.delete<any>(this.apiUrl + '/user/' + userID);
  }
}
