import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { recipeGuard } from '../recipe.guard';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { DetailsRecipeComponent } from './details-recipe/details-recipe.component';

const productRoutes: Routes = [
  { path: '', redirectTo: 'all-recipes', pathMatch: 'full' },
  { path: 'all-recipes', component : AllRecipesComponent },
  { path: 'add-recipe', component: AddRecipeComponent},
  { path: 'edit-recipe/:id', component: EditRecipeComponent},
  { path: 'details-recipe/:id', component:DetailsRecipeComponent, canActivate: [recipeGuard] },

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(productRoutes)
  ],
  exports: [RouterModule]
})
export class RecipeRoutesModule { }
