import { Injectable } from '@angular/core';
import { Observable, filter, from, map, of, switchMap, toArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Recipe} from '../classes/Recipe';
import { Category } from '../classes/Category';
import { CategoryService } from '../category.service';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  public recipeCode = 10;
 

  private apiUrl = 'https://localhost:44329/api/Recipe';
  constructor(private http: HttpClient,private _category_service:CategoryService) { }

  getRecipesList2(searchTerm: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl).pipe(
      switchMap(recipes => {
        if (!searchTerm || searchTerm.trim() === '') {
          return of(recipes); // Return all recipes if search term is empty
        }
  
        const searchTermLower = searchTerm.toLowerCase().trim();
  
        return from(recipes).pipe(
          switchMap(recipe => {
            return this._category_service.getCatergoryById(recipe.categoryCode).pipe(
              map(category => {
                return { recipe, categoryName: category.name };
              })
            );
          }),
          filter(({ recipe, categoryName }) => {
            const nameCategory = categoryName.toLowerCase();
            return (
              recipe.nameRecipe.toLowerCase().includes(searchTermLower) ||
              nameCategory.includes(searchTermLower) ||
              recipe.preparationTime.toString().includes(searchTermLower)
            );
          }),
          map(({ recipe, categoryName }) => recipe),
          toArray()
        );
      })
    );
  }
  getRecipeCode(): Observable<number> {
    const co=this.http.get<number>(`${this.apiUrl}/maxcode`);
    console.log("co ",co);
    return co;
  }
  getRecipesList(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.apiUrl)
  }
  getRecipeById(id:Number){
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }
  addRecipe(recipe: Recipe) {
    return this.http.post(this.apiUrl, recipe)
  }
  
  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        map(() => {
          // Success handling: Log success message, update UI, etc.
          console.log(`Recipe with ID ${id} successfully deleted.`);
          return { message: `Recipe with ID ${id} deleted.` };
        }),
       
      );
  }
  updateRecipe(id:number,recipe:Recipe){
    return this.http.put<Recipe>(`${this.apiUrl}/${id}`,recipe)
  }
}
