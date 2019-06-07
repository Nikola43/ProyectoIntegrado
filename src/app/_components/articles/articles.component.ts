import {Component, OnInit, ViewChild} from '@angular/core';
import {MdbTableEditorDirective} from 'mdb-table-editor';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../_services';
import {User} from '../../_models/user';
import {ModalDirective} from 'ng-uikit-pro-standard';
import {ArticleService} from '../../_services/article.service';
import {Article} from '../../_models/article';

@Component({
  selector: 'app-users',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
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

  rowIndex: any = null;
  isTableEditable = true;
  visibleEditIcons = false;
  isRowEditable = false;
  isInsert = false;
  @ViewChild('successInsertModal') successInsertModal: ModalDirective;
  @ViewChild('successUpdateModal') successUpdateModal: ModalDirective;
  @ViewChild('successDeleteModal') successDeleteModal: ModalDirective;
  @ViewChild('deleteModal') deleteModal: ModalDirective;


  constructor(
    private http: HttpClient, private userService: UserService, private articleService: ArticleService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.isMaster = this.currentUser.rol === 'master';

    if (this.isMaster) {
      this.headElements = ['ID', 'Nombre', 'Categoría', 'Precio por unidad', 'Unidades en stock', 'Editar'];
      this.articleService.getAll().subscribe(data => {
        console.log(data);
        this.mdbTableEditor.dataArray = data;
      });
    }
  }

  showSuccessInsertModal() {
    this.successInsertModal.show();

    setTimeout(() => {
      this.successInsertModal.hide();
    }, this.modalTimeout);
  }

  showSuccessUpdateModal() {
    this.successUpdateModal.show();

    setTimeout(() => {
      this.successUpdateModal.hide();
    }, this.modalTimeout);
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

    this.articleService.deleteArticle(this.selectedArticle.id).subscribe(data => {
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
      name: '',
      category: '',
      unit_price: 0,
      units_in_stock: 0,
    };


    row.childNodes.forEach((el: any, i: number) => {
      if (i > 0 && i <= row.childNodes.length - 2) {
        if (el.firstElementChild) {
          values[Object.keys(values)[i]] = el.firstElementChild.value;
        }
      }
    });

    values.id = Number(values.id);
    values.unit_price = Number(values.unit_price);
    values.units_in_stock = Number(values.units_in_stock);

    if (this.selectedArticle.name !== values.name
      || this.selectedArticle.category !== values.category
      || this.selectedArticle.unit_price !== values.unit_price
      || this.selectedArticle.units_in_stock !== values.units_in_stock) {


      this.articleService.updateArticle(values).subscribe(data => {
        console.log(data);
        if (data.result === 'success') {
          this.showSuccessUpdateModal();
        } else {

        }
      });
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

    this.articleService.insertArticle(article).subscribe(data => {
      if (data.result === 'success') {
        this.showSuccessInsertModal();
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

  ngOnInit() {
  }
}
