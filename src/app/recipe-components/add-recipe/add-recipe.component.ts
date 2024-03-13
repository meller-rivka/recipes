import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../classes/Recipe';
import { FormArray, FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {
  categories: any[] = [];
recipeForm!: FormGroup;
ingredients: string[] = [];
instructions: string[] = [];
preparationTimeFocused: boolean = false;
levelOfDifficultyFocused: boolean = false;
nameRecipeFocused: boolean = false;
constructor(private route: Router, private _recipe_service: RecipeService,private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.recipeForm = new FormGroup({
      "nameRecipe": new FormControl("", [Validators.required, Validators.minLength(3)]),
      "categoryCode": new FormControl(null, [Validators.required]),
      "preparationTime": new FormControl(null, [Validators.required]),
      "levelOfDifficulty": new FormControl(null, [Validators.required]),
       ingredients: this._formBuilder.array([this._formBuilder.control('')]),
       instructions: this._formBuilder.array([this._formBuilder.control('')]),
      "urlImage": new FormControl("", [Validators.required])
    });
    this.retrieveCategories();
  }
 
  retrieveCategories() {
    this._recipe_service.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  get ingredientsArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructionsArray() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  
addIngredient() {
  const lastControl = this.ingredientsArray.at(this.ingredientsArray.length - 1);
  if (lastControl.value.trim() !== '') {
    this.ingredientsArray.push(this._formBuilder.control(''));
  }
}

addPreparationStep() {
  const lastControl = this.instructionsArray.at(this.instructionsArray.length - 1);
  if (lastControl.value.trim() !== '') {
    this.instructionsArray.push(this._formBuilder.control(''));
  }
}

removeEmptyIngredients() {
  for (let i = this.ingredientsArray.length - 1; i >= 0; i--) {
    if (this.ingredientsArray.at(i).value.trim() === '') {
      this.ingredientsArray.removeAt(i);
    }
  }
}

removeEmptyPreparationSteps() {
  for (let i = this.instructionsArray.length - 1; i >= 0; i--) {
    if (this.instructionsArray.at(i).value.trim() === '') {
      this.instructionsArray.removeAt(i);
    }
  }
 }
 
  createIngredientItem(): FormGroup {
    return new FormGroup({
      "name": new FormControl("", [Validators.required])
    });
  }


  onSubmit() {
    this._recipe_service.ReciperPlus();
    const nameRecipe = this.recipeForm.get('nameRecipe').value;
    const categoryCode = this.recipeForm.get('categoryCode').value;
    const preparationTime = this.recipeForm.get('preparationTime').value;
    const levelOfDifficulty = this.recipeForm.get('levelOfDifficulty').value;
    const dateAdded =new Date(Date.now());
    const recipeCode = this._recipe_service.recipeCode;
    // const preparationSteps=this.recipeForm.get("preparationSteps").value;
    const urlImage=this.recipeForm.get("urlImage").value; 
    const recipe=new Recipe(recipeCode,nameRecipe,categoryCode,preparationTime,levelOfDifficulty,dateAdded,this.ingredients,this.instructions,1,urlImage);
    console.log(recipe);
    
    this._recipe_service.addRecipe(recipe).subscribe({
      next: (res) => {
        Swal.fire({
                  title: "Thank you!",
                  text: "The recipe was successfully added!",
                  icon: "success"
                })
      this.route.navigate(["recipe/all-recipes"])
      },
      error(err) {
        console.log(err)
      },
    })
  }
}
