const baseController = require("./baseController");
const recipe_model = require("../model/recipe");
const profile_model = require("../model/user_profile");
const { recipe } = require("../model/entity/recipe");
const { ingredients } = require("../model/entity/ingredients")

class recipeController extends baseController {
    async get_recipes(content){
        let uid = content.uid;

        // 1. get all recipes
        let recipes = await recipe_model.get_recipes();
        
        // 2. get user profile from userprofile
        //      2.1 get the ingredents that user does not eat
        // get uid's  banned_ingredents list
        let banned_ingredients = await profile_model.get_bannedingredients(uid);
        banned_ingredients = banned_ingredients.dataValues.bannedingredients;
        let banned_ingredients_arr = banned_ingredients.split(',');
        let ban_length = banned_ingredients_arr.length;

        // 3. filter out the recipe with specifc ingredients
        let n = recipes.length;
        let recipes_arr = [];
        for (var i = 0; i < n; i++){
            var data = recipes[i].dataValues;
            var ingredients = data.ingredients.split(',');
            var rec_ing = ingredients.length;
            if (ban_length + rec_ing === (banned_ingredients_arr.concat(ingredients)).length)
            {
                recipes_arr.push(data);
            }
        }

        return ({
            "code": 200,
            "recipes": recipes_arr
        });
    }

    async view_recipe(content){
        let rid = content.rid;

        let recipe = await recipe_model.view_recipe(rid);

        return ({
            "code": 200,
            "recipe": recipe
        })
    }
}

module.exports = recipeController