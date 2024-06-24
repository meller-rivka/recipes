using Microsoft.AspNetCore.Mvc;
using ServerProject.Edentities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ServerProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        public static List<Recipe> recipes=new List<Recipe>()
        {
              new Recipe {
        RecipeCode = 0,
        NameRecipe = "סיגרים חלביים",
        CategoryCode = 1,
        PreparationTime = 45,
        LevelOfDifficulty = 5,
        DateAdded = DateTime.Now,
        Ingredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk" },
        PreparationSteps = new List<string> { "Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes" },
        UserCode = 2,
        UrlImage = "../../../../assets/סיגרים.jpg"
      },
      new Recipe
      {
        RecipeCode = 2,
        NameRecipe = "סופגניות",
        CategoryCode = 1,
        PreparationTime = 45,
        LevelOfDifficulty = 5,
        DateAdded = DateTime.Now,
        Ingredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk" },
        PreparationSteps = new List<string> { "Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes" },
        UserCode = 1,
        UrlImage = "../../../assets/סופגניות.jpg"
      },
      new Recipe {
        RecipeCode = 1,
        NameRecipe = "Chocolate Cake",
        CategoryCode = 1,
        PreparationTime = 45,
        LevelOfDifficulty = 1,
        DateAdded = DateTime.Now,
        Ingredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Milk" },
        PreparationSteps = new List<string> { "Preheat oven to 350°F", "Mix dry ingredients", "Add wet ingredients", "Bake for 30 minutes" },
        UserCode = 1,
        UrlImage = "../../../../assets/פלפל ממולא.jpg"

      },
      new Recipe {
        RecipeCode = 3,
        NameRecipe = "Vegetable Stir-Fry",
        CategoryCode = 2,
        PreparationTime = 30,
        LevelOfDifficulty = 5,
        DateAdded = DateTime.Now,
        Ingredients = new List<string> { "Broccoli", "Carrots", "Bell Peppers", "Onions", "Garlic", "Soy Sauce" },
        PreparationSteps = new List<string> { "Chop vegetables", "Stir-fry in hot oil", "Add sauce", "Cook until tender" },
        UserCode = 2,
        UrlImage = "../../../../assets/סיגרים.jpg"
      }
        };
        // GET: api/<RecipeController>
        [HttpGet]
        public IEnumerable<Recipe> Get()
        {
            return recipes;
        }

        // GET api/<RecipeController>/5
        [HttpGet("{id}")]
        public Recipe Get(int id)
        {
            var r=recipes.Find(x => x.RecipeCode == id);
            return r;
        }

        // POST api/<RecipeController>
        [HttpPost]
        public bool Post([FromBody] Recipe value)
        {

            recipes.Add(value);
            return true;
            return false;
        }

        // PUT api/<RecipeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Recipe value)
        {
            recipes.FirstOrDefault(x => x.RecipeCode == id).NameRecipe=value.NameRecipe;
            recipes.FirstOrDefault(x => x.RecipeCode == id).CategoryCode = value.CategoryCode;
            recipes.FirstOrDefault(x => x.RecipeCode == id).PreparationTime = value.PreparationTime;
            recipes.FirstOrDefault(x => x.RecipeCode == id).LevelOfDifficulty = value.LevelOfDifficulty;
            recipes.FirstOrDefault(x => x.RecipeCode == id).DateAdded = value.DateAdded;
            recipes.FirstOrDefault(x => x.RecipeCode == id).Ingredients = value.Ingredients;
            recipes.FirstOrDefault(x => x.RecipeCode == id).PreparationSteps = value.PreparationSteps;
            recipes.FirstOrDefault(x => x.RecipeCode == id).UserCode = value.UserCode;
            recipes.FirstOrDefault(x => x.RecipeCode == id).UrlImage = value.UrlImage;

        }

        // DELETE api/<RecipeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var r = recipes.Find(x => x.RecipeCode == id);
            recipes.Remove(r);
        }
    }
}
