import {Component, OnInit, ViewChild} from '@angular/core';
import {MdbTableEditorDirective} from 'mdb-table-editor';
import {HttpClient} from '@angular/common/http';
import {User} from '../../_models/user';
import {UserService} from '../../_services/user.service';
import {InvoiceService} from '../../_services/invoice.service';
import {Invoice} from '../../_models/invoice';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  currentUser: User;
  @ViewChild('table') mdbTableEditor: MdbTableEditorDirective;
  headElements = [];
  visibleItems = 10;
  searchText = '';
  highlightedRow: any = null;
  isMaster: boolean;
  selectedInvoice: Invoice;
  rolOptions = ['master', 'user'];
  selectedDate: string;
  message: string;
  confirmDeleteModalIsVisible: boolean;
  isSuccessDelete: boolean;
  isSuccessUpdate: boolean;
  isSuccessInsert: boolean;

  rowIndex: any = null;
  isTableEditable = true;
  visibleEditIcons = false;
  isRowEditable = false;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private invoiceService: InvoiceService,
    private router: Router,
    private route: ActivatedRoute) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isMaster = this.currentUser.rol === 'master';

    if (this.isMaster) {
      this.headElements = ['ID', 'Usuario', 'Fecha de creación', 'Método de envío', 'Método de pago', 'Fecha estimada de entrega', 'Editar'];
      this.invoiceService.getAll().subscribe(data => {
        console.log(data);
        this.mdbTableEditor.dataArray = data;
      });
    }
  }

  showSuccessDeleteModal() {
    this.isSuccessDelete = true;
  }

  hideSuccessDeleteModal() {
    this.isSuccessDelete = false;
  }

  showSuccessUpdateModal() {
    this.isSuccessUpdate = true;
  }

  hideSuccessUpdateModal() {
    this.isSuccessUpdate = false;
  }

  showSuccessInsertModal() {
    this.isSuccessInsert = true;
  }

  hideSuccessInsertModal() {
    this.isSuccessInsert = false;
  }

  hideConfirmDeleteModal() {
    this.isRowEditable = false;
    this.confirmDeleteModalIsVisible = false;
  }

  showConfirmDeleteModal() {
    this.confirmDeleteModalIsVisible = true;
  }

  modalRemove() {
    this.invoiceService.deleteInvoice(this.selectedInvoice.id).subscribe(data => {
      if (data.result === 'success') {
        const rowIndex = this.mdbTableEditor.dataArray.findIndex((el: any) => el === this.highlightedRow);
        this.mdbTableEditor.dataArray.splice(rowIndex, 1);
        this.mdbTableEditor.iterableDataArray.splice(rowIndex, 1);
        this.rowIndex = null;
        this.mdbTableEditor.updatePaginationInfo();
        this.message = 'Artículo eliminado correctamente';
        this.showSuccessDeleteModal();
      } else {
      }
    });
    this.hideConfirmDeleteModal();
  }

  showEditIcons(index: number, invoice) {
    this.selectedInvoice = invoice;
    this.rowIndex = index;
    this.visibleEditIcons = true;
    this.isRowEditable = true;
  }

  approveEdit(row: any) {
    this.isRowEditable = false;
    this.visibleEditIcons = false;
    this.isRowEditable = false;
    this.rowIndex = null;

    const userDataRowIndex = this.mdbTableEditor.dataArray.findIndex((el: any) => el === this.highlightedRow);

    const values: Invoice = {
      id: (row.childNodes[0].textContent.trim()),
      user_id: 0,
      creation_date: '',
      shipping_method: '',
      payment_method: '',
      estimated_delivery_date: this.selectedDate
    };

    row.childNodes.forEach((el: any, i: number) => {
      if (i > 0 && i <= row.childNodes.length - 2) {
        if (el.firstElementChild) {
          el.firstElementChild.value.estimated_delivery_date = this.selectedDate;
          values[Object.keys(values)[i]] = el.firstElementChild.value;
        }
      }
    });

    values.id = Number(values.id);
    values.user_id = Number(values.user_id);


    console.log(values);


    if (this.selectedInvoice.shipping_method !== values.shipping_method
      || this.selectedInvoice.estimated_delivery_date !== values.estimated_delivery_date) {
      this.invoiceService.updateInvoice(values).subscribe(data => {
        console.log(data);
        if (data.result === 'success') {
          this.message = 'Artículo actualizado correctamente';
          this.showSuccessUpdateModal();
        } else {

        }
      });
    }
    this.mdbTableEditor.dataArray[userDataRowIndex] = values;
    this.mdbTableEditor.iterableDataArray[userDataRowIndex] = values;
  }

  showInvoiceDetails(invoiceID) {
    this.router.navigate(['invoice-details'], { queryParams: { id: invoiceID} });
  }

  insertInvoice(form: any, modalInstance: any) {
    const invoice: any = {
      id: this.mdbTableEditor.dataArray[this.mdbTableEditor.dataArray.length - 1].id + 1,
      name: form[0].value,
      category: form[1].value,
      unit_price: Number(form[2].value),
      units_in_stock: Number(form[3].value)
    };

    this.invoiceService.insertInvoice(invoice).subscribe(data => {
      if (data.result === 'success') {
        this.message = 'Artículo insertado correctamente';
        this.showSuccessInsertModal();
      }
    });

    this.mdbTableEditor.dataArray.push(invoice);
    this.mdbTableEditor.updatePaginationInfo();
    modalInstance.hide();


    form[0].value = '';
    form[1].value = '';
    form[2].value = '';
    form[3].value = '';
  }

  ngOnInit() {
  }
}
