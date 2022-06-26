const baseController = require("./baseController");
const recipe_model = require("../model/recipe");
const { recipe } = require("../model/entity/recipe");
const { ingredients } = require("../model/entity/ingredients")

class recipeController extends baseController {
    async get_recipe(content){
        uid = content.uid;

        // 1. get all recipes
        recipes = recipe_model.get_recipe()
        
        // 2. get user profile from userprofile
        //      2.1 get the ingredents that user does not eat
        // 3. filter out the recipe with specifc ingredients
    }
}

module.exports = recipeController