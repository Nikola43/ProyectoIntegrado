import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl + '/articles');
  }

  insertArticle(article: any) {
    return this.http.post<any>(this.apiUrl + '/article', JSON.stringify(article));
  }

  updateArticle(article: any) {
    return this.http.put<any>(this.apiUrl + '/article/' + article.id, JSON.stringify(article));
  }

  deleteArticle(articleID: number) {
    return this.http.delete<any>(this.apiUrl + '/article/' + articleID);
  }
}
