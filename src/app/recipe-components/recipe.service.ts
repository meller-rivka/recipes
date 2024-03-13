import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Recipe} from '../classes/Recipe';
import { Category } from '../classes/Category';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipeCode = 10;
 

  private apiUrl = 'https://localhost:7090/api/Recipe';

  constructor(private http: HttpClient) { }

 
  getRecipesList(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl)
  }
  addRecipe(recipe: Recipe) {
  console.log('put')
    return this.http.post(this.apiUrl, recipe)
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("https://localhost:7090/api/Category");
  }
  ReciperPlus(){
    this.recipeCode+=1;
  }
  ReciperMinus(){
    this.recipeCode-=1;
  }
}
