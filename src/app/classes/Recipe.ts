export class Recipe {
  recipeCode: number;
  nameRecipe: string;
  categoryCode: number;
  preparationTime: number;
  levelOfDifficulty: number;
  dateAdded: Date;
  ingredients: string[];
  preparationSteps: string[];
  userCode: number;
  urlImage: string;
  
  constructor(
    recipeCode: number,
    nameRecipe: string,
    categoryCode: number,
    preparationTimeMinutes: number,
    levelOfDifficulty: number,
    dateAdded: Date,
    ingredients: string[],
    preparationSteps: string[],
    userCode: number,
    urlImage: string
  ) {
    this.recipeCode = recipeCode;
    this.nameRecipe = nameRecipe;
    this.categoryCode = categoryCode;
    this.preparationTime = preparationTimeMinutes;
    this.levelOfDifficulty
    = levelOfDifficulty
    ;
    this.dateAdded = dateAdded;
    this.ingredients = ingredients;
    this.preparationSteps = preparationSteps;
    this.userCode = userCode;
    this.urlImage = urlImage;
  }
}