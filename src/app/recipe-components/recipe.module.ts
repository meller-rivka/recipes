import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { SmallRecipeComponent } from './small-recipe/small-recipe.component';



@NgModule({
  declarations: [AllRecipesComponent,AddRecipeComponent,EditRecipeComponent,SmallRecipeComponent],
  imports: [
    CommonModule
  ]
})
export class RecipeModule { }
