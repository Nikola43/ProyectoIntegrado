import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailService {
  private apiUrl = 'http://localhost:8080';

  // private apiUrl = 'http://51.77.223.220:8080';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl + '/invoice_details');
  }

  getAllFromInvoiceID(id) {
    return this.http.get<any[]>(this.apiUrl + '/invoice_details/' + id);
  }


  insertInvoiceDetails(invoinceDetail: any) {
    return this.http.post<any>(this.apiUrl + '/invoice_detail', JSON.stringify(invoinceDetail));
  }

  updateInvoiceDetail(invoinceDetail: any) {
    return this.http.put<any>(this.apiUrl + '/invoice_detail/' + invoinceDetail.id, JSON.stringify(invoinceDetail));
  }

  deleteInvoiceDetail(invoinceDetail: number) {
    return this.http.delete<any>(this.apiUrl + '/invoice_detail/' + invoinceDetail);
  }
}
