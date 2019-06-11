import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MdbTableEditorDirective} from 'mdb-table-editor';
import {HttpClient} from '@angular/common/http';
import {User} from '../../_models/user';
import {UserService} from '../../_services/user.service';
import {InvoiceDetailService} from '../../_services/invoice-detail.service';
import {InvoiceDetail} from '../../_models/invoice-detail';
import {ActivatedRoute, Router} from '@angular/router';
import {ArticleService} from '../../_services/article.service';


@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})
export class InvoiceDetailsComponent implements OnInit, OnDestroy {
  currentUser: User;
  @ViewChild('table') mdbTableEditor: MdbTableEditorDirective;
  headElements = [];
  visibleItems = 10;
  searchText = '';
  highlightedRow: any = null;
  isMaster: boolean;
  selectedInvoiceDetail: any;
  rolOptions = ['master', 'user'];
  articleList = [];
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
  private sub: any;
  private selectedArticle;


  constructor(
    private http: HttpClient,
    private userService: UserService,
    private invoiceDetailService: InvoiceDetailService,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isMaster = this.currentUser.rol === 'master';
    this.headElements = ['ID', 'Artículo', 'Cantidad', 'Editar'];
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit() {
    let id = 0;
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        id = +params['id'] || 0;
      });

    this.invoiceDetailService.getAllFromInvoiceID(id).subscribe(data => {
      this.mdbTableEditor.dataArray = data;
    });

    this.articleService.getAll().subscribe(data => {
      this.articleList = data;
    });
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

  back() {
    this.router.navigate(['/invoices']);
  }

  modalRemove() {
    this.invoiceDetailService.deleteInvoiceDetail(this.selectedInvoiceDetail).subscribe(data => {
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

  showEditIcons(index: number, invoiceDetail) {
    this.selectedInvoiceDetail = invoiceDetail;
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

    console.log('selected: ');
    console.log(this.selectedInvoiceDetail);

    const values: any = {
      invoice_id: this.selectedInvoiceDetail.invoice_id,
      article_id: this.selectedInvoiceDetail.article_id,
      quantity: this.selectedInvoiceDetail.quantity,
    };

    console.log('values: ');
    console.log(values);

    row.childNodes.forEach((el: any, i: number) => {
      if (i > 0 && i <= row.childNodes.length - 2) {
        if (el.firstElementChild) {
          values[Object.keys(values)[i]] = el.firstElementChild.value;
        }
      }
    });


    values.article_id = Number(values.article_id);
    values.invoice_id = Number(values.invoice_id);
    values.quantity = Number(values.quantity);


    if (this.selectedInvoiceDetail.quantity !== values.quantity) {
      this.invoiceDetailService.updateInvoiceDetail(values).subscribe(data => {
        if (data.result === 'success') {
          this.selectedInvoiceDetail.quantity = values.quantity;
          this.mdbTableEditor.dataArray[userDataRowIndex] = this.selectedInvoiceDetail;
          this.mdbTableEditor.iterableDataArray[userDataRowIndex] = this.selectedInvoiceDetail;
          this.message = 'Artículo actualizado correctamente';
          this.showSuccessUpdateModal();
        } else {

        }
      });
    }


  }

  onChangeRolSelect(event) {
    event.preventDefault();
    this.selectedArticle = event.target.value;
  }

  insertInvoiceDetail(form: any, modalInstance: any) {
    const invoiceDetail: any = {
      id: this.mdbTableEditor.dataArray[this.mdbTableEditor.dataArray.length - 1].id + 1,
      name: form[0].value,
      category: form[1].value,
      unit_price: Number(form[2].value),
      units_in_stock: Number(form[3].value)
    };

    this.invoiceDetailService.insertInvoiceDetails(invoiceDetail).subscribe(data => {
      if (data.result === 'success') {
        this.message = 'Artículo insertado correctamente';
        this.showSuccessInsertModal();
      }
    });

    this.mdbTableEditor.dataArray.push(invoiceDetail);
    this.mdbTableEditor.updatePaginationInfo();
    modalInstance.hide();


    form[0].value = '';
    form[1].value = '';
    form[2].value = '';
    form[3].value = '';
  }
}
