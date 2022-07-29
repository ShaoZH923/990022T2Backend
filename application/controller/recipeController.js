const baseController = require("./baseController");
const recipe_model = require("../model/recipe");
const ingredients_model = require("../model/ingredients");
const profile_model = require("../model/user_profile");
const login_model = require("../model/user_accounts");
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

    async search_recipe_name(content){
        let uid = content.uid;
        let email = content.email;
        if (uid === undefined) {
            uid = await login_model.get_uid(email);
            uid = uid.uid;
        }
        console.log("uid:", uid)
        let name = content.name;
        name = name.toLowerCase();
        // filter recipe's ingredents based on usertype
        let usertype = await profile_model.get_usertype(uid);
        let banned_id_1 = -1;
        let banned_id_2 = -1;
        let banned_id_3 = -1;
        let banned_type_1 = -1;
        let banned_type_2 = -1;
        if (usertype === 1){
            banned_id_1 = 2;
        }
        if (usertype === 2){
            banned_type_1 = 1;
            banned_type_2 = 3;
        }

        let banned_ingredients = await profile_model.get_bannedingredients(uid);
        banned_ingredients = banned_ingredients.dataValues.bannedingredients;
        console.log("banned_ingredients: ", banned_ingredients);
        banned_ingredients = banned_ingredients.split(',');

        let recipes = await recipe_model.get_recipes()
        // console.log(recipes)
        let filtered_recipe = []
        let n = recipes.length;
        let count = 0;
        for (var i = 0; i < n; i++) {
            let recipe = recipes[i];
            let rname = recipe.name;
            rname = rname.toLowerCase();
            if (rname.includes(name)){
                // filtered_recipe[count] = recipe;
                // count += 1;
                // filter recipe's ingredents from user's banned_ingredients
                let ingredients_string = recipe.ingredients;
                let ingredients = ingredients_string.split(',');
                let add = true;
                console.log(ingredients)
                for (var j = 0; j < ingredients.length; j++) {
                    if (add === true) {
                        for (var k = 0; k < banned_ingredients.length; k++) {
                            console.log(banned_ingredients[k]);
                            if (banned_ingredients[k] === ingredients[j]){
                                add = false;
                            }
                        }
                        if (ingredients[j] === banned_id_1 || ingredients[j] === banned_id_2 || ingredients[j] === banned_id_3){
                            add = false;
                        }
                        let ingred_type = await ingredients_model.get_ingredients_type(ingredients[j]);
                        if (ingred_type === banned_type_1 || ingred_type === banned_type_2) {
                            add = false;
                        }
                    }
                }
                if (add) {
                    filtered_recipe[count] = recipe;
                    count += 1;
                }
            }
        }
        return filtered_recipe;
    }
}

module.exports = recipeController