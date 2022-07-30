// add recipes into db
import { recipe } from "./entity/recipe"
import { ingredients } from "./entity/ingredients"
import {rating} from "./entity/rating"
import {comments} from "./entity/comments"
import recipeController from "../controller/recipeController";

let recipe_db = recipe
let comment_db = comments

// user uploads new recipe
exports.add_recipe = async function(name, steps, ingredients, picture) {
    let result = await recipe.bulkCreate([{
        name: name,
        steps: steps,
        ingredients: ingredients,
        picture: picture
    }])

    return result;
}

// get all recipes
exports.get_recipes = async function(){
    let result = await recipe.findAll({
    })
    // console.log(result);
    return result;
}

exports.view_recipe = async function(rid){
    let recipe = await recipe_db.findOne({
        where: {
            rid: rid
        }
    })

    let comments = await comment_db.findAll({
        where: {
            rid: rid
        }
    })

    let result = {
        rid: recipe.rid,
        name: recipe.name,
        type: recipe.type,
        steps: recipe.steps,
        ingredients: recipe.ingredients,
        picture: recipe.picture,
        rate: recipe.rate,
        comments: comments
    }

    return result;
}

exports.search_recipe_name = async function(name){
    let result = await recipe.findAll({
        where:{
            name: ["^[a-zA-Z0-9]*?"+name+"[a-zA-Z0-9]*?$", 'i']
        }
    })
    return result;
}

exports.rate_recipe = async function(rid, rate){
    await rating.bulkCreate([{
        rid: rid,
        rate: rate
    }])
}

exports.get_rate = async function(rid){
    let result = await rating.findAll({
        where:{
            rid: rid
        }
    })

    return result;
}

exports.update_rate = async function(rid, new_rate){
    await recipe.update({
        rate: new_rate
    }, {
        where: {
            rid: rid
        }
    })
}