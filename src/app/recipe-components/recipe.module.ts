import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { SmallRecipeComponent } from './small-recipe/small-recipe.component';
// import { PrimeIcons } from 'primeng/api'; 
import { MatIconModule } from '@angular/material/icon';
import { HourPipe } from "../hour.pipe";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DetailsRecipeComponent } from './details-recipe/details-recipe.component';

@NgModule({
    declarations: [AllRecipesComponent, AddRecipeComponent, EditRecipeComponent, SmallRecipeComponent,DetailsRecipeComponent],
    imports: [CommonModule, MatIconModule,HourPipe,ReactiveFormsModule]
})
export class RecipeModule { }
