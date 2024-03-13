import { Component, Input } from '@angular/core';
import { Recipe } from '../../classes/Recipe';

@Component({
  selector: 'app-small-recipe',
  templateUrl: './small-recipe.component.html',
  styleUrl: './small-recipe.component.css'
})
export class SmallRecipeComponent {
[x: string]: any;
  @Input() recipe: Recipe;
  constructor() { }
  generateStarArray(difficultyLevel: number): any[] {
    return Array.from({ length: difficultyLevel });
  }
  
}
