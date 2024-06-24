import { Component,OnInit } from '@angular/core';
import {  FormGroup, Validators,FormArray,FormControl,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from '../../classes/Category';
import { RecipeService } from '../recipe.service';
import { CategoryService } from '../../category.service';
import { numbersUntil5 } from '../../numbersUntil5';
import { Recipe } from '../../classes/Recipe';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {
  public recipeForm!: FormGroup;
  public categoryList: Category[] = [];

 
  constructor(private _recipeService:RecipeService ,private _categoryService: CategoryService,private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
   
    this._categoryService.getCategories().subscribe({
      next: (res) => {
        this.categoryList = res
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.recipeForm = new FormGroup({
      "recipeCode": new FormControl("", [Validators.required]),
      "nameRecipe": new FormControl("", [Validators.required]),
      "categoryCode": new FormControl("", [Validators.required]),
      "preparationTime": new FormControl("", [Validators.required]),
      "levelOfDifficulty": new FormControl('', [Validators.required,numbersUntil5]),
      "dateAdded": new FormControl("", [Validators.required]),
      ingredients: this.fb.array([this.fb.control('')]),
      preparationSteps: this.fb.array([this.fb.control('')]),
      "userCode": new FormControl("", [Validators.required]),
      "urlImage": new FormControl("", [Validators.required]),
 
  })
  }

  get ingredientsArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get preparationStepsArray() {
    return this.recipeForm.get('preparationSteps') as FormArray;
  }

  
addIngredient() {
  const lastControl = this.ingredientsArray.at(this.ingredientsArray.length - 1);
  if (lastControl.value.trim() !== '') {
    this.ingredientsArray.push(this.fb.control(''));
  }
}

addPreparationStep() {
  const lastControl = this.preparationStepsArray.at(this.preparationStepsArray.length - 1);
  if (lastControl.value.trim() !== '') {
    this.preparationStepsArray.push(this.fb.control(''));
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
  for (let i = this.preparationStepsArray.length - 1; i >= 0; i--) {
    if (this.preparationStepsArray.at(i).value.trim() === '') {
      this.preparationStepsArray.removeAt(i);
    }
  }
}

saveRecipe() {
  let recipe: Recipe = this.recipeForm.value;
  console.log("save",recipe);
  this._recipeService.addRecipe(recipe).subscribe({
    next: (response) => {
      Swal.fire({
        title: "Thank you!",
        text: "The recipe was successfully added!",
        icon: "success"
      });
      this.router.navigate(["/recipe/all-recipes"])
    },
    error: (error) => {
      console.error("Error adding user:", error);
    }
  });

  
}

}




// import { Component, OnInit } from '@angular/core';
// import { Recipe } from '../../classes/Recipe';
// import { FormArray, FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { RecipeService } from '../recipe.service';
// import Swal from 'sweetalert2';
// import { CategoryService } from '../../category.service';
// import { Category } from '../../classes/Category';
// import { RegisterService } from '../../components/register-service.service';
// import { User } from '../../classes/User';
// import { numbersUntil5 } from '../../numbersUntil5';

// @Component({
//   selector: 'app-add-recipe',
//   templateUrl: './add-recipe.component.html',
//   styleUrl: './add-recipe.component.css'
// })
// export class AddRecipeComponent implements OnInit {
// categories: Category[] = [];
// recipeForm!: FormGroup;
// preparationTimeFocused: boolean = false;
// levelOfDifficultyFocused: boolean = false;
// nameRecipeFocused: boolean = false;
// constructor(private route: Router,private _category_service: CategoryService, 
// private _recipe_service: RecipeService,
// private _formBuilder: FormBuilder, private _register_service:RegisterService) {}

//   ngOnInit() {
//     this._category_service.getCategories().subscribe({
//       next: (res) => {
//         this.categories = res
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     })
//     this.recipeForm = new FormGroup({
//       "recipeCode": new FormControl("", [Validators.required]),
//       "nameRecipe": new FormControl("", [Validators.required]),
//       "categoryCode": new FormControl("", [Validators.required]),
//       "preparationTime": new FormControl("", [Validators.required]),
//       "levelOfDifficulty": new FormControl('', [Validators.required, numbersUntil5]),
//       "dateAdded": new FormControl("", [Validators.required]),
//       ingredients: this._formBuilder.array([this._formBuilder.control('')]),
//       preparationSteps: this._formBuilder.array([this._formBuilder.control('')]),
//       "userCode": new FormControl("", [Validators.required]),
//       "urlImage": new FormControl("", [Validators.required]),
 
//     });
//   }
 
//   get ingredientsArray() {
//     return this.recipeForm.get('ingredients') as FormArray;
//   }

//   get preparationStepsArray() {
//     return this.recipeForm.get('preparationSteps') as FormArray;
//   }

  
// addIngredient() {
//   const lastControl = this.ingredientsArray.at(this.ingredientsArray.length - 1);
//   if (lastControl.value.trim() !== '') {
//     this.ingredientsArray.push(this._formBuilder.control(''));
//   }
// }

// addPreparationStep() {
//   const lastControl = this.preparationStepsArray.at(this.preparationStepsArray.length - 1);
//   if (lastControl.value.trim() !== '') {
//     this.preparationStepsArray.push(this._formBuilder.control(''));
//   }
// }

// removeEmptyIngredients() {
//   for (let i = this.ingredientsArray.length - 1; i >= 0; i--) {
//     if (this.ingredientsArray.at(i).value.trim() === '') {
//       this.ingredientsArray.removeAt(i);
//     }
//   }
// }

// removeEmptyPreparationSteps() {
//   for (let i = this.preparationStepsArray.length - 1; i >= 0; i--) {
//     if (this.preparationStepsArray.at(i).value.trim() === '') {
//       this.preparationStepsArray.removeAt(i);
//     }
//   }
// }

//   onSubmit() {
//     this.removeEmptyIngredients();
//     this.removeEmptyPreparationSteps();
//       const user=this._register_service.getCurrentUser();
//       let userCode=0;
//       this._register_service.getUserByNameAndPass(user).subscribe({
//         next:(res:User)=>{
//           userCode=res.id;
//         }
//       })
      
//       let recipeCode=0;
//       this._recipe_service.getRecipeCode().subscribe({
//         next:(res)=>{
//           console.log("res:",res);
          
//           recipeCode=res+1;
//         }
//       })
//     // const recipe3 = new Recipe(
//     //   recipeCode,
//     //   this.recipeForm.get("nameRecipe").value,
//     //   this.recipeForm.get("categoryCode").value,
//     //   this.recipeForm.get("preparationTime").value,
//     //   this.recipeForm.get("levelOfDifficulty").value,
//     //   new Date(Date.now()),
//     //   this.recipeForm.get("ingredients").value,
//     //   this.recipeForm.get("preparationSteps").value,
//     //   userCode,
//     //   this.recipeForm.get("urlImage").value,
//     // );
//     // console.log(recipe3);
//   let recipe3: Recipe = this.recipeForm.value;
//     console.log(recipe3);
//     this._recipe_service.addRecipe(recipe3).subscribe({
//       next: (res) => {
//         console.log(res);
//         Swal.fire({
//                   title: "Thank you!",
//                   text: "The recipe was successfully added!",
//                   icon: "success"
//                 })
//       this.route.navigate(["recipe/all-recipes"])
//       },
//       error(err) {
//         console.log(err)
//       },
//     })
//   }
// }
