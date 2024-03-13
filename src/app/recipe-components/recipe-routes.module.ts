import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

const productRoutes: Routes = [
  { path: '', redirectTo: 'all-recipes', pathMatch: 'full' },
  { path: 'all-recipes', component : AllRecipesComponent },
  { path: 'add-recipe', component: AddRecipeComponent},
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(productRoutes)
  ],
  exports: [RouterModule]
})
export class RecipeRoutesModule { }
