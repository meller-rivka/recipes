import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './classes/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'https://localhost:44329/api/Category';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
  getCatergoryById(id:number){
    return this.http.get<Category>(`${this.apiUrl}/${id}`);

  }
}
