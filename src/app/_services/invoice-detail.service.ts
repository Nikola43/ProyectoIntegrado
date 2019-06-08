import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl + '/invoice_details');
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
