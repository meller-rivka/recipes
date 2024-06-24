import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../../classes/Recipe';
import { CategoryService } from '../../category.service';
import { Category } from '../../classes/Category';
import { RegisterService } from '../../components/register-service.service';
import { User } from '../../classes/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-recipe',
  templateUrl: './details-recipe.component.html',
  styleUrl: './details-recipe.component.css'
})
export class DetailsRecipeComponent implements OnInit {

  recipeId: Number;
  recipe:Recipe;
  categories:Category[];
  isCurrentUserAuthor:boolean=false;
  constructor(private route : ActivatedRoute,private router :Router, private _recipe_service : RecipeService, private _category_service : CategoryService,private _register_service: RegisterService){}
  ngOnInit(): void {
    this.recipeId = this.route.snapshot.params['id'];
    this._recipe_service.getRecipeById(this.recipeId).subscribe({
      next: (res) => {
        console.log(res);
        this.recipe = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
    const user=sessionStorage.getItem('currentUser');

    this._category_service.getCategories().subscribe({
      next:(res)=>{
          this.categories=res;
      }
    })
    this.checkIsCurrentUserAuthor();
    console.log(this.recipe);
    
  }
  getCategoryName(){
    return this.categories.find(c=>c.code===this.recipe.categoryCode).name;
  }
  getCategoryIcon(){
    return this.categories.find(c=>c.code===this.recipe.categoryCode).iconRoute;
  }
  generateStarArray(difficultyLevel: number): any[] {
    return Array.from({ length: difficultyLevel });
  }
  getCategoryByCode(code:number){
    return this._category_service.getCatergoryById(code);
  }
  checkIsCurrentUserAuthor(){
    const user=this._register_service.getCurrentUser();
    const fullUser=this._register_service.getUserByNameAndPass(user).subscribe({
      next:(res:User)=>{
        if(this.recipe.userCode===res.id)
        this.isCurrentUserAuthor=true;
      }
    })
  }
  editRecipe(){
    console.log("navigateToRecipeDetails");
     this.router.navigate(['/recipe/edit-recipe', this.recipe.recipeCode]);
   }
   
   deleteRecipe(id: number) {
    Swal.fire({
      title: 'האם אתה בטוח?',
      text: "לא ניתן לשחזר את המתכון לאחר מחיקתו!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'כן, מחק!',
      cancelButtonText: 'בטל'
    }).then((result) => {
      if (result.isConfirmed) {
        this._recipe_service.deleteRecipe(id)
          .subscribe(
            (response) => {
              console.log(response.message); // Success message
              Swal.fire({
                title: 'המתכון נמחק בהצלחה!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                // confirmButtonText: 'אישו',
              }).then((res)=>{
                  this.router.navigate(["recipe/all-recipes"])
              })
            },
            (error) => {
              console.error('Error deleting recipe:', error);
              // Display user-friendly error message
            }
          );
      }
    });
  }
}
