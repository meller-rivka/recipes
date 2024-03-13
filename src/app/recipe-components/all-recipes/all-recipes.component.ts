import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../classes/Recipe';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css'
})
export class AllRecipesComponent implements OnInit{
  
  recipes!: Recipe[];
  constructor(private route: Router, private _recipe_service: RecipeService){}

  ngOnInit(){
    this._recipe_service.getRecipesList().subscribe({
      next:(res)=>{
        this.recipes=res;
        console.log(this.recipes)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
