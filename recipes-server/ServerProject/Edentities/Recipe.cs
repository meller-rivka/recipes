using static System.Net.Mime.MediaTypeNames;

namespace ServerProject.Edentities
{
    public class Recipe
    {
        //קוד מתכון, שם מתכון, קוד קטגוריה, זמן הכנה בדקות, דרגת קושי 1-5
        //, תאריך הוספת המתכון לאתר, רשימת הרכיבים (אוסף מחרוזות), אופן ההכנה
        //(אוסף מחרוזות), קוד משתמש שהכניס את המתכון, תמונה (מחרוזת של ניתוב).
        public int RecipeCode { get; set; }
        public string NameRecipe { get; set; }
        public int CategoryCode { get; set; }
      //  public Category Category { get; set; }
        public int PreparationTime { get; set; }
        public int LevelOfDifficulty { get; set; }
        public DateTime DateAdded { get; set; }
        public List<string> Ingredients { get; set; }
        public List<string> PreparationSteps { get; set; }
        public int UserCode { get; set; }
        //public User User { get; set; }
        public string UrlImage { get; set; }
      
    }
}
