import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../classes/Recipe';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Category } from '../../classes/Category';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css'
})
export class AllRecipesComponent implements OnInit{
  
  recipes!: Recipe[];
  public filterForm!: FormGroup;
  public categoryList: Category[] = [];
  constructor(private route: Router, private _recipe_service: RecipeService, private _category_service : CategoryService){}

  ngOnInit(){
    this.filterForm = new FormGroup({
      "name": new FormControl(""),
      "category": new FormControl(null),
      "preparationTime": new FormControl(null)
    });

    this._recipe_service.getRecipesList().subscribe({
      next:(res)=>{
        this.recipes=res;
        console.log(this.recipes)
      },
      error:(err)=>{
        console.log(err);
      }
    });
    this._category_service.getCategories().subscribe({
      next:(res)=>{
        this.categoryList=res;
        console.log(this.categoryList)
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }

  applyFilters(recipe: Recipe): boolean {
    const filterValues = this.filterForm.value;
    let passNameFilter = true;
    let passCategoryFilter = true;
    let passPreparationTimeFilter = true;


    if (filterValues.name && filterValues.name.trim() !== '') {
      passNameFilter = recipe.nameRecipe.toLowerCase().includes(filterValues.name.trim().toLowerCase());
    }


    if (filterValues.category !== null) {
           passCategoryFilter = recipe.categoryCode == filterValues.category;
    }


    if (filterValues.preparationTime !== null) {
      const preparationTime = recipe.preparationTime;
      switch (filterValues.preparationTime) {
        case 'short':
          passPreparationTimeFilter = preparationTime < 30;
          break;
        case 'medium':
          passPreparationTimeFilter = preparationTime >= 30 && preparationTime <= 60;
          break;
        case 'long':
          passPreparationTimeFilter = preparationTime > 60;
          break;
       
      }
    }

    return passNameFilter && passCategoryFilter && passPreparationTimeFilter;
  }

}
