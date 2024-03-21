
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../classes/Recipe';
import { Category } from '../../classes/Category';
import { RecipeService } from '../recipe.service';
import { CategoryService } from '../../category.service';
import { numbersUntil5 } from '../../numbersUntil5';


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.css'
})
export class EditRecipeComponent implements OnInit {


  recipeForm: FormGroup;
  recipe: Recipe =new Recipe();
  categoryList: Category[] = []; // Assuming you have a list of categories

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private categoryService:CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.recipeForm = this.formBuilder.group({
      recipeCode: [''],
      nameRecipe: [''],
      categoryCode: [''],
      preparationTime: [''],
      levelOfDifficulty: ['',numbersUntil5],
      dateAdded: [''],
      ingredients: this.formBuilder.array([this.formBuilder.control('')]),
      preparationSteps: this.formBuilder.array([this.formBuilder.control('')]),
      userCode: [''],
      urlImage: ['']
    });
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.getRecipeDetails(id);
    
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categoryList = res
      },
      error: (err) => {
        console.log(err);
      }
    })

  }

  getRecipeDetails(id: number) {
    this.recipeService.getRecipeById(id).subscribe({
      next:(data: Recipe) => {
        this.recipe = data;
        this.populateForm();
      },
      error:
      (error: any) => {
        console.log(error);
      }}
    );
  }

  populateForm() {
    this.recipeForm.patchValue({
      recipeCode: this.recipe.recipeCode,
      nameRecipe: this.recipe.nameRecipe,
      categoryCode: this.recipe.categoryCode,
      preparationTime: this.recipe.preparationTime,
      levelOfDifficulty: this.recipe.levelOfDifficulty,
      dateAdded: this.recipe.dateAdded,
      userCode: this.recipe.userCode,
      urlImage: this.recipe.urlImage
    });

    this.setIngredients();
    this.setPreparationMethod();
  }
  
  get ingredientsArray() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get preparationStepsArray() {
    return this.recipeForm.get('preparationSteps') as FormArray;
  }


  setIngredients() {
    const control = this.recipeForm.get('ingredients') as FormArray;
    control.clear();
    this.recipe.ingredients.forEach(ingredient => {
      control.push(this.formBuilder.control(ingredient));
    });
  }

  setPreparationMethod() {
    const control = this.recipeForm.get('preparationSteps') as FormArray;
    control.clear();
    this.recipe.preparationSteps.forEach(step => {
      control.push(this.formBuilder.control(step));
    });
  }

  addIngredient() {
    const control = this.recipeForm.get('ingredients') as FormArray;
    control.push(this.formBuilder.control(''));
  }

  removeEmptyIngredients() {
    const control = this.recipeForm.get('ingredients') as FormArray;
    for (let i = control.length - 1; i >= 0; i--) {
      if (control.at(i).value === '') {
        control.removeAt(i);
      }
    }
  }

  addPreparationStep() {
    const control = this.recipeForm.get('preparationSteps') as FormArray;
    control.push(this.formBuilder.control(''));
  }

  removeEmptyPreparationSteps() {
    const control = this.recipeForm.get('preparationSteps') as FormArray;
    for (let i = control.length - 1; i >= 0; i--) {
      if (control.at(i).value === '') {
        control.removeAt(i);
      }
    }
  }

  saveRecipe() {
    if (this.recipeForm.valid) {
      const updatedRecipe: Recipe = this.recipeForm.value;
      this.recipeService.updateRecipe(updatedRecipe.recipeCode, updatedRecipe).subscribe(
        () => {
          this.router.navigate(['recipe/details-recipe/', updatedRecipe.recipeCode]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  cancelEdit() {
    this.router.navigate(['recipe/details-recipe/', this.recipe.recipeCode]);
  }

}



// import { Component, OnInit } from '@angular/core';
// import { Recipe } from '../../classes/Recipe';
// import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import { Category } from '../../classes/Category';
// import { ActivatedRoute } from '@angular/router';
// import { RecipeService } from '../recipe.service';
// import { numbersUntil5 } from '../../numbersUntil5';
// import { CategoryService } from '../../category.service';

// @Component({
//   selector: 'app-edit-recipe',
//   templateUrl: './edit-recipe.component.html',
//   styleUrl: './edit-recipe.component.css'
// })
// export class EditRecipeComponent implements OnInit{
// onSubmit() {
// throw new Error('Method not implemented.');
// }
//   recipe: Recipe;
//   recipeId:number;
//   recipeForm: FormGroup;
//   categories: Category[];
//   categoryName:string;
//   // difficulties: Difficulty[] = [];

//   constructor(
//     private route: ActivatedRoute,private _category_service : CategoryService,
//     private _recipeService: RecipeService
//   ) {
   
// }
//   ngOnInit(): void {
//     this.recipeId = this.route.snapshot.params['id'];
//     this._recipeService.getRecipeById(this.recipeId).subscribe({
//       next: (res) => {
//         console.log(res);
//         this.recipe = res;
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     });
//     const user=sessionStorage.getItem('currentUser');

//     this._category_service.getCategories().subscribe({
//       next:(res)=>{
//           this.categories=res;
//       }
//     })
//     this._category_service.getCatergoryById(this.recipe.categoryCode).subscribe({
//       next:(res)=>{
//         this.categoryName=res.name;
//       }
//     })
//     // this.checkIsCurrentUserAuthor();
//     this.recipeForm = new FormGroup({
//       nameRecipe: new FormControl(this.recipe.nameRecipe, [Validators.required, Validators.minLength(9)]),
//       category: new FormControl(this.categoryName),
//       preparationTime: new FormControl(this.recipe.preparationTime),
//       levelOfDifficulty: new FormControl(this.recipe.levelOfDifficulty,[numbersUntil5]),
//       ingredients: new FormArray([new FormControl('')]),
//       preparationSteps: new FormArray([new FormControl('')]),
//     });
//   }
// }
