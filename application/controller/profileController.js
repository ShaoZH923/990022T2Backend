const baseController = require("./baseController");
const useraccounts_model = require("../model/user_accounts");
const profile_model = require("../model/user_profile");
const ingredients_model = require("../model/ingredients");
const { user_profile } = require("../model/entity/user_profile");
const { ingredients } = require("../model/entity/ingredients")

class profileController extends baseController {
    async add_bannedingredients(content){
        let uid = content.uid
        let bannedingredients = content.bannedingredients
        
        // convert name of bannedingredients to ingredent id (iid)
        console.log(bannedingredients)
        let ingredients_name_added = bannedingredients.split(',')    // array

        
        let ingredients_added = new Array();
        let i = 0;
        let l = ingredients_name_added.length;
        for (i = 0; i < l; i++){
            let iname = ingredients_name_added[i];
            ingredients_added[i] = await ingredients_model.get_iid(iname);
            // console.log(ingredients_added[i]);
        }        

        // get uid's ingredent list
        let old_ingredients = await profile_model.get_bannedingredients(uid);
        old_ingredients = old_ingredients.dataValues.bannedingredients;
        let old_ingredients_array = old_ingredients.split(',')

        // combine old_ingredients with newly added ingredients
        let new_ingredients_array = old_ingredients_array.concat(ingredients_added)
        let new_ingredients_set = new Set(new_ingredients_array);
        new_ingredients_array = Array.from(new_ingredients_set);
        let new_ingredients = new_ingredients_array.join(",");

        // update new bannedingredients
        let result = await profile_model.update_ingredients(uid, new_ingredients)
        return result
    }

    async remove_bannedingredients(content){
        let uid = content.uid;
        let bannedingredients = content.bannedingredients;

        // convert name of bannedingredients to ingredient id (iid)
        let ingredients_name_delete = bannedingredients.split(',')    // array

        let ingredients_delete = new Array();
        let i = 0;
        let l = ingredients_name_delete.length;
        for (i = 0; i < l; i++){
            let iname = ingredients_name_delete[i];
            ingredients_delete[i] = await ingredients_model.get_iid(iname);
        }

        // get uid's ingredent list
        let old_ingredients = await profile_model.get_bannedingredients(uid);
        old_ingredients = old_ingredients.dataValues.bannedingredients;
        let old_ingredients_array = old_ingredients.split(',');
        
        // remove ingredient id from old ingredients list
        let new_ingredients_set = new Set(old_ingredients_array);

        for( i = 0; i < ingredients_delete.length; i++){
            let del = ingredients_delete[i].toString();
            console.log("del =", del);
            if (new_ingredients_set.has(del)) {
                new_ingredients_set.delete(del);
            }
            console.log(new_ingredients_set)
        }

        let new_ingredients_array = Array.from(new_ingredients_set);
        let new_ingredients = new_ingredients_array.toString()

        // update new banned_ingredients
        let result = await profile_model.update_ingredients(uid, new_ingredients);
        return result;
    }

    async get_profile(content){
        let uid = content.uid
        let email = content.email
        if (uid === undefined){            
            let profile = await useraccounts_model.get_uid(email);
            if (profile === null) {
                // email/uid does not exist
                let result = {
                    "code": 201,
                    "err-message": "email does not exist"
                }
                return result;
            }
            else {
                uid = profile.uid;
            }
        }
        else{
            email = await useraccounts_model.get_email(uid);
        }
        let profile = await profile_model.get_profile(uid);
        
        let username = await useraccounts_model.get_username(uid);

        let bannedingredients = profile.bannedingredients;
        bannedingredients = bannedingredients.split(',');
        let n = bannedingredients.length;
        let object_bannedingredients = [];

        for (let i = 1; i < n; i++) {
            // console.log(bannedingredients[i])
            let iid = parseInt(bannedingredients[i])
            object_bannedingredients[i - 1] = await ingredients_model.get_ingredient_name(iid)
        }


        let result = {
            "uid": uid,
            "email": email,
            "username": username,
            "bookmark": profile.bookmark,
            "bannedingredients": object_bannedingredients,
            "usertype": profile.usertype
        }
        
        return result
    }

    async update_usertype(content){
        let uid = content.uid;
        let email = content.email;
        let newtype = content.newtype;

        if (uid === undefined){
            let profile = await useraccounts_model.get_uid(email);
            if (profile === null){
                let result = {
                    "code": 201,
                    "err-message": "email does not exist"
                }
                return result;
            }
            else {
                uid = profile.uid;
            }
        }
        else{
            email = await useraccounts_model.get_email(uid);
        }

        await profile_model.update_usertype(uid, newtype);
        let result = {
            "code": 200,
            "uid": uid,
            "email": email,
            "usertype": newtype
        }
        return result;
    }

    async get_bookmark(content){
        bookmark = await profile_model.get_bookmark(content);
        return bookmark
    }

    async get_bannedingredients(content){
        bannedingredients = await profile_model.get_bannedingredients(content);
        return bannedingredients
    }
}

module.exports = profileController