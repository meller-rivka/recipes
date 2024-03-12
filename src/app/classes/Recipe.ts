export class Recipe {
  recipeCode: number;
  recipeName: string;
  categoryCode: number;
  preparationTimeMinutes: number;
  difficultyLevel: number;
  dateAdded: Date;
  ingredients: string[];
  preparationSteps: string[];
  userCode: number;
  imageUrl: string;
  
  constructor(
    recipeCode: number,
    recipeName: string,
    categoryCode: number,
    preparationTimeMinutes: number,
    difficultyLevel: number,
    dateAdded: Date,
    ingredients: string[],
    preparationSteps: string[],
    userCode: number,
    imageUrl: string
  ) {
    this.recipeCode = recipeCode;
    this.recipeName = recipeName;
    this.categoryCode = categoryCode;
    this.preparationTimeMinutes = preparationTimeMinutes;
    this.difficultyLevel = difficultyLevel;
    this.dateAdded = dateAdded;
    this.ingredients = ingredients;
    this.preparationSteps = preparationSteps;
    this.userCode = userCode;
    this.imageUrl = imageUrl;
  }
}