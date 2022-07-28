// add recipes into db
import { user_profile } from "./entity/user_profile"
import { ingredients } from "./entity/ingredients"
import { NONE } from "sequelize"

// add user_profile
exports.add_profile = async function(content, uid) {
    await user_profile.bulkCreate([{
        uid: uid,
        bookmark: "{}",
        bannedingredients: "{}"
    }])
}

// get specific user's profile
exports.get_profile = async function(uid){
    let result = await user_profile.findOne({
        where: {
            uid: uid
        }
    })
    return result;
}

exports.get_bookmark = async function(content){
    let uid = content.uid;

    result = await user_profile.findOne({
        bookmark: bookmark
    }, {
        where: {
            uid: uid
        }
    })

    return result
}

exports.get_bannedingredients = async function(uid){
    let result = await user_profile.findOne({
        where: {
            uid: uid
        }
    })
    return result
}

exports.update_ingredients = async function(uid, new_ingredients){
    console.log("model: upgarde ingredients")
    console.log("uid =", uid)
    console.log("new_ingredients =", new_ingredients)
    await user_profile.update({
        bannedingredients: new_ingredients
    }, {
        where: {
            uid: uid
        }
    })

    let result = {
        "code": 200
    }

    return result;
}

exports.update_usertype = async function(uid, newtype){
    await user_profile.update({
        usertype: newtype
    }, {
        where: {
            uid: uid
        }
    })
}