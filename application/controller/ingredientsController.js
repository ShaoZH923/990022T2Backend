const baseController = require("./baseController");
const ingredients_model = require("../model/ingredients");
const profile_model = require("../model/user_profile");
const { ingredients_db } = require("../model/entity/ingredients");

class ingredientsController extends baseController {
    async get_ingredients(content) {
        let uid = content.uid

        // get uid's  banned_ingredents list
        let banned_ingredients = await profile_model.get_bannedingredients(uid);
        banned_ingredients = banned_ingredients.dataValues.bannedingredients;
        let banned_ingredients_array = new Set(banned_ingredients.split(','))

        // get all ingredients
        let ingredients_list = await ingredients_model.get_ingredients();
        let ingredients = ingredients_list.dataValues;
        
        let n = ingredients_list.length
        let result = []
        for (var i = 0; i < n; i++){
            let iid_str = ingredients_list[i].dataValues.iid.toString();
            if (banned_ingredients_array.has(iid_str)){
                // do nothing
            }
            else {
                result.push(ingredients_list[i].dataValues)
            }
        }

        return ({
            "code": 200,
            "ingredients": result
        });
    }
}

module.exports = ingredientsController