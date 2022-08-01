const baseController = require("./baseController");
const recipe_model = require("../model/recipe");
const ingredients_model = require("../model/ingredients");
const profile_model = require("../model/user_profile");
const login_model = require("../model/user_accounts");
const comment_model = require("../model/comments");
const { recipe } = require("../model/entity/recipe");
const { ingredients } = require("../model/entity/ingredients")

class recipeController extends baseController {
    async get_recipes(content){
        let uid = content.uid;
        let email = content.email;
        if (uid === undefined){
            if (email === undefined){
                uid = 0;
            }
            else {
                uid = await profile_model.get_uid(email);
            }
        }

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
                data.comments = await comment_model.searchcomments(data.rid);
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

    async search_recipe_ingredients(content){
        let uid = content.uid;
        let email = content.email;
        if (uid === undefined) {
            uid = await login_model.get_uid(email);
            uid = uid.uid;
        }
        console.log("uid:", uid)
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
        let ingredients_str = content.ingredients
        let ingredients = ingredients_str.split(',');
        let n = ingredients.length;

        let banned_ingredients = await profile_model.get_bannedingredients(uid);
        banned_ingredients = banned_ingredients.dataValues.bannedingredients;
        console.log("banned_ingredients: ", banned_ingredients);
        banned_ingredients = banned_ingredients.split(',');

        let recipes = await recipe_model.get_recipes()
        let filtered_recipe = [];
        let l = recipes.length;
        let count = 0;

        for (var i = 0; i < l; i++){
            let recipe = recipes[i];
            let recipe_ingredients_str = recipe.ingredients;
            let recipe_ingredients = recipe_ingredients_str.split(',');

            let ingredients_included = n;
            let add = true;
            for (var j = 0; j < ingredients.length; j++) {
                for (var k = 0; k < l; k++){
                    if (ingredients[j] === recipe_ingredients[k]) {
                        ingredients_included -= 1;
                    }
                }
                if (ingredients[j] === banned_id_1 || ingredients[j] === banned_id_2 || ingredients[j] === banned_id_3){
                    add = false;
                }
                let ingred_type = await ingredients_model.get_ingredients_type(ingredients[j]);
                if (ingred_type === banned_type_1 || ingred_type === banned_type_2) {
                    add = false;
                }

                if (add && ingredients_included === 0) {
                    filtered_recipe[count] = recipe;
                    count += 1;
                }
            }
        }

        return filtered_recipe;
    }

    async rate_recipe(content){
        let rid = content.rid;
        let rate = content.rate;
        await recipe_model.rate_recipe(rid, rate);

        let rates = await recipe_model.get_rate(rid);
        let n = rates.length;
        let total_points = 0;
        for (var i = 0; i < n; i++) {
            rate = rates[i].rate;
            console.log(rate);
            total_points += rate;
        }
        console.log("number of rates: " + n + "\ttotal_points: " + total_points);
        let new_rate = total_points / n;
        console.log("new rate: " + new_rate)

        await recipe_model.update_rate(rid, new_rate);

        let result = {
            "code": 200
        }       

        return result;
    }

    async addbookmark(content){
        let uid = content.uid;
        let rid = content.rid;
        rid = rid.toString();
        
        if (uid === undefined) {
            let email = content.email;
            uid = await login_model.get_uid(email);
            uid = uid.uid;
        }

        let profile = await profile_model.get_profile(uid);
        let bookmark_str = profile.bookmark;
        let bookmark = bookmark_str.split(',');

        // make sure rid is not in the bookmark
        let n = bookmark.length;
        let add = true;
        for (var i = 0; i < n; i++) {
            if (add && bookmark[i] == rid) {
                add = false;
                i = n;
            }
        }
        if (add) {
            bookmark_str = bookmark_str + ',' + rid;
            await profile_model.update_bookmark(uid, bookmark_str);

            let result = await profile_model.get_profile(uid);
            return result;
        }
        else{
            // recipe already exists in bookmark
            let result = {
                "code": 201,
                "err-message": "Recipe already exists in bookmark"
            }
            return result;
        }
    }

    async commentrecipe(content){
        let uid = content.uid;
        let rid = content.rid;
        let comment = content.comment;

        await comment_model.addcomment(uid, rid, comment);
        
        let result = await recipe_model.view_recipe(rid);
        return result;
    }

    async createrecipe(content){
        let name = content.name;
        let uid = content.uid;
        let steps = content.steps;
        let ingredients = content.ingredients;
        let picture = content.picture;

        let rec = await recipe_model.add_recipe(uid, name, steps, ingredients, picture);
        // console.log("================================================")
        // console.log(rec[0]);
        // console.log("================================================")
        // console.log(rec[0].rid);
        let rid = rec[0].rid;

        let result = await recipe_model.view_recipe(rid);
        return result;
    }

    async removebookmark(content){
        let uid = content.uid;
        let rid = content.rid;
        
        if (uid === undefined) {
            let email = content.email
            uid = await login_model.get_uid(email);
            uid = uid.uid;
        }

        rid = "" + rid;

        let current_bookmark = await profile_model.get_bookmark(uid);
        current_bookmark = current_bookmark.split(',');
        let new_bookmark = "0";
        let n = current_bookmark.length;
        for (var i = 1; i < n; i++) {
            if (current_bookmark[i] !== rid){
                new_bookmark = new_bookmark + ',' + current_bookmark[i];
            }
        }
        await profile_model.update_bookmark(uid, new_bookmark);
        return await profile_model.get_profile(uid);
    }

    async popularrecipe(content){
        let uid = content.uid;

        if (uid === undefined) {
            let email = content.email;
            if (email === undefined) {
                uid = 0;
            }
            else {
                uid = await login_model.get_uid(email);
                uid = uid.uid;
            }
        }

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

        let bannedingredients = await profile_model.get_bannedingredients(uid);
        // console.log("bannedingredients", bannedingredients.dataValues.bannedingredients);
        bannedingredients = bannedingredients.dataValues.bannedingredients;
        bannedingredients = bannedingredients.split(',');
        let n = bannedingredients.length;

        let recipes = await recipe_model.popularrecipe();
        let selected_recipes = new Array();
        let l = recipes.length;
        let count = 0;

        // console.log("================================ bannedingredients: ", bannedingredients)
        // console.log("================================ usertype: ", usertype);

        for (var i = 0; i < l; i++) {
            let recipe = recipes[i];
            let rec_ingredients = recipe.ingredients;
            rec_ingredients = rec_ingredients.split(',');
            // console.log("==================== rec_ingredients: ", rec_ingredients);
            let r_n = rec_ingredients.length;
            let add = true;
            for (var j = 0; j < n; j++) {
                if (add) {
                    for (var k = 0; k < r_n; k++) {
                        if (rec_ingredients[k] === bannedingredients[j]){
                            add = false;
                            j = n;
                            k = r_n;
                        }
                        if (rec_ingredients[k] === banned_id_1 || rec_ingredients[k] === banned_id_2 || rec_ingredients[k] === banned_id_3){
                            add = false;
                            j = n;
                            k = r_n;
                        }
                        // console.log("================= rec_ingredients[k]: ", rec_ingredients[k]);
                        let ingred_type = await ingredients_model.get_ingredients_type(rec_ingredients[k]);
                        // console.log("================= ingred_type:", ingred_type);
                        if (ingred_type === banned_type_1 || ingred_type === banned_type_2) {
                            add = false;
                            j = n;
                            k = r_n;
                        }
                    }
                }
            }
            if (add) {
                recipe.dataValues.comments = await comment_model.searchcomments(recipe.rid);
                // console.log("recipe: ", recipe)
                selected_recipes[count] = recipe;
                count += 1;
            }
            if (count === 3) {
                i = l;
            }
        }

        return selected_recipes;
    }

    async getUserrecipe(content) {
        let uid = content.uid;
        if (uid === undefined) {
            let email = content.email;
            uid = await login_model.get_uid(email);
        }

        let result = await recipe_model.getUserrecipe(uid);
        return result;
    }

    async deleterecipe(content){
        let rid = content.rid;
        let uid = content.uid;
        if (uid === undefined) {
            let email = content.email;
            uid = await login_model.get_uid(email);
        }

        // check if rid and uid matches
        let recipe = await recipe_model.view_recipe(rid);
        console.log(recipe)
        if (recipe.uid !== uid) {
            let result = {
                "code": 201,
                "err-message": "Recipe does not belong to the user"
            }
            return result;
        }

        // remove recipe
        recipe_model.remove_recipe(rid);

        // remove ratings
        recipe_model.remove_recipe_ratings(rid);

        // remove comments
        comment_model.remove_recipe_comments(rid);

        let result = {
            "code": 200
        }
        return result;
    }

    async editrecipe(content){
        console.log(content)
        let rid = content.rid;
        let old_recipe = await recipe_model.view_recipe(rid)

        let name = content.name;
        if (name === undefined) {
            name = old_recipe.name;
        }

        let steps = content.steps;
        if (steps === undefined) {
            steps = old_recipe.steps;
        }

        let ingredients = content.ingredients;
        if (ingredients === undefined) {
            ingredients = old_recipe.ingredients;
        }

        let picture = content.picture;
        if (picture === undefined) {
            picture = old_recipe.picture;
        }

        await recipe_model.editrecipe(rid, name, steps, ingredients, picture);

        return await recipe_model.view_recipe(rid);
    }
}

module.exports = recipeController