import { Component, Input } from '@angular/core';
import { Recipe } from '../../classes/Recipe';
import { Router } from '@angular/router';
// import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-small-recipe',
  templateUrl: './small-recipe.component.html',
  styleUrl: './small-recipe.component.css'
})
export class SmallRecipeComponent {
  [x: string]: any;
  @Input() recipe: Recipe;
  constructor(private router :Router) { }
  generateStarArray(difficultyLevel: number): any[] {
    return Array.from({ length: difficultyLevel });
  }
  navigateToRecipeDetails(){
   console.log("navigateToRecipeDetails");
   console.log(this.recipe.recipeCode);
    this.router.navigate(['/recipe/details-recipe/', this.recipe.recipeCode]);
    console.log("after");
  }
  
}

