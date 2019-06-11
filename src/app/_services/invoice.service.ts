import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8080';
  // private apiUrl = 'http://51.77.223.220:8080';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl + '/invoices');
  }

  insertInvoice(invoice: any) {
    return this.http.post<any>(this.apiUrl + '/invoice', JSON.stringify(invoice));
  }

  updateInvoice(invoice: any) {
    return this.http.put<any>(this.apiUrl + '/invoice/' + invoice.id, JSON.stringify(invoice));
  }

  deleteInvoice(invoiceID: number) {
    return this.http.delete<any>(this.apiUrl + '/invoice/' + invoiceID);
  }
}
