import {Component, OnInit, ViewChild} from '@angular/core';
import {MdbTableEditorDirective} from 'mdb-table-editor';
import {HttpClient} from '@angular/common/http';
import {User} from '../../_models/user';
import {ArticleService} from '../../_services/article.service';
import {Article} from '../../_models/article';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-articles',
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
  rolOptions = ['master', 'user'];
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
    this.articleService.deleteArticle(this.selectedArticle.id).subscribe(data => {
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
          this.message = 'Artículo actualizado correctamente';
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
        this.message = 'Artículo insertado correctamente';
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
