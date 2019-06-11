import {Component, OnInit, ViewChild} from '@angular/core';
import {MdbTableEditorDirective} from 'mdb-table-editor';
import {HttpClient} from '@angular/common/http';
import {User} from '../../_models/user';
import {ModalDirective} from 'ng-uikit-pro-standard';
import {Article} from '../../_models/article';
import {UserService} from '../../_services/user.service';
import {InvoiceService} from '../../_services/invoice.service';

@Component({
  selector: 'app-users',
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
  selectedArticle: Article;
  modalTimeout = 1000;
  rolOptions = ['master', 'user'];
  insert = false;
  message: string;

  rowIndex: any = null;
  isTableEditable = true;
  visibleEditIcons = false;
  isRowEditable = false;
  @ViewChild('successInsertModal') successInsertModal: ModalDirective;
  @ViewChild('successUpdateModal') successUpdateModal: ModalDirective;
  @ViewChild('successDeleteModal') successDeleteModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;

  constructor(
    private http: HttpClient, private userService: UserService, private invoiceService: InvoiceService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isMaster = this.currentUser.rol === 'master';
    this.headElements = ['ID', 'Usuario', 'Fecha de creación', 'Método de envío', 'Método de pago', 'Fecha de entrega estimada', 'Detalles', 'Editar'];
    this.invoiceService.getAll().subscribe(data => {
      this.mdbTableEditor.dataArray = data;
    });
  }

  show() {
    this.insert = true;
  }

  hide() {
    this.insert = false;
  }

  showDeleteModal() {
    this.deleteModal.show();
  }

  showSuccessDeleteModal() {
    this.successDeleteModal.show();

    setTimeout(() => {
      this.successDeleteModal.hide();
    }, this.modalTimeout);
  }

  modalRemove(modalInstance: any) {
    const rowIndex = this.mdbTableEditor.dataArray.findIndex((el: any) => el === this.highlightedRow);
    this.mdbTableEditor.dataArray.splice(rowIndex, 1);
    this.mdbTableEditor.iterableDataArray.splice(rowIndex, 1);
    this.mdbTableEditor.updatePaginationInfo();
    this.visibleEditIcons = false;
    this.rowIndex = null;
    modalInstance.hide();

    this.invoiceService.deleteInvoice(this.selectedArticle.id).subscribe(data => {
      if (data.result === 'success') {
        this.showSuccessDeleteModal();
      } else {
      }
    });

  }

  showEditIcons(index: number, article) {
    this.selectedArticle = article;
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

    const values = {
      id: (row.childNodes[0].textContent.trim()),
      user_id: '',
      creation_date: '',
      shipping_method: '',
      payment_method: '',
      estimated_delivery_date: ''
    };


    row.childNodes.forEach((el: any, i: number) => {
      if (i > 0 && i <= row.childNodes.length - 2) {
        if (el.firstElementChild) {
          values[Object.keys(values)[i]] = el.firstElementChild.value;
        }
      }
    });

    values.id = Number(values.id);

    console.log(values);


    if (true) {
      /*
      this.invoiceService.updateInvoice(values).subscribe(data => {
        console.log(data);
        if (data.result === 'success') {
          this.show();
        }
      });
      */
    }
    this.mdbTableEditor.dataArray[userDataRowIndex] = values;
    this.mdbTableEditor.iterableDataArray[userDataRowIndex] = values;
  }

  insertarArticulo(form: any, modalInstance: any) {
    const article: any = {
      id: this.mdbTableEditor.dataArray[this.mdbTableEditor.dataArray.length - 1].id + 1,
      name: form[0].value,
      category: form[1].value,
      unit_price: Number(form[2].value),
      units_in_stock: Number(form[3].value)
    };

    this.invoiceService.insertInvoice(article).subscribe(data => {
      if (data.result === 'success') {
        this.message = 'Usuario insertado correctamente';
        this.show();
      }
    });

    this.mdbTableEditor.dataArray.push(article);
    this.mdbTableEditor.updatePaginationInfo();
    modalInstance.hide();


    form[0].value = '';
    form[1].value = '';
    form[2].value = '';
    form[3].value = '';
  }

  showDetails(item, modal) {
  }

  insertarFactura(item, modal) {

  }

  ngOnInit() {
  }
}
