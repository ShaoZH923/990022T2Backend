const baseController = require("./baseController");
const ingredients_model = require("../model/ingredients");
const profile_model = require("../model/user_profile");
const account_model = require("../model/user_accounts");
const { ingredients_db } = require("../model/entity/ingredients");

class ingredientsController extends baseController {
    async get_ingredients(content) {
        let email = content.email;
        let uid = content.uid;
        if (uid === undefined) {
            if (email === undefined) {
                uid = 0;
            }
            else {
                uid = await account_model.get_uid(email);
                uid = uid.uid;
            }
        }

        // console.log("========= uid: ", uid)

        let usertype = await profile_model.get_usertype(uid);
        let banned_id_1 = -1;
        let banned_id_2 = -1;
        let banned_id_3 = -1;
        let banned_type_1 = -1;
        let banned_type_2 = -1;
        if (usertype === 1){
            banned_id_1 = 2;
            banned_id_2 = 34;
            banned_id_3 = 35;
        }
        if (usertype === 2){
            banned_type_1 = 1;
            banned_type_2 = 3;
        }

        // get uid's  banned_ingredents list
        let banned_ingredients = await profile_model.get_bannedingredients(uid);
        banned_ingredients = banned_ingredients.dataValues.bannedingredients;
        let banned_ingredients_array = new Set(banned_ingredients.split(','))

        // get all ingredients
        let ingredients_list = await ingredients_model.get_ingredients();
        
        let n = ingredients_list.length
        let result = []
        for (var i = 0; i < n; i++){
            let add = true;
            // let iid_str = ingredients_list[i].dataValues.iid.toString();
            // if (banned_ingredients_array.has(iid_str)){
            //     // do nothing
            // }
            // else {
            //     result.push(ingredients_list[i].dataValues)
            // }
            let ingredient = ingredients_list[i].dataValues;
            if (ingredient.type === banned_type_1 || ingredient.type === banned_type_2){
                add = false;
            }
            if (ingredient.iid === banned_id_1 || ingredient.iid === banned_id_2 || ingredient.iid === banned_id_3){
                add = false;
            }
            let iid_str = "" + ingredient.iid
            if (banned_ingredients_array.has(iid_str)){
                add = false;
            }
            if (add) {
                result.push(ingredient)
            }
        }

        return ({
            "code": 200,
            "ingredients": result
        });
    }
}

module.exports = ingredientsController