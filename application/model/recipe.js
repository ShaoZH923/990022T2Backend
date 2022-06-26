// add recipes into db
import { recipe } from "./entity/recipe"
import { ingredients } from "./entity/ingredients"

// user uploads new recipe
exports.add_recipe = async function(content) {
    let name = content.name;
    let steps = content.steps;
    let ingredients = content.ingredients;
    let picture = content.picture

    await recipe.bulkCreate([{
        name: name,
        steps: steps,
        ingredients: ingredients,
        picture: picture
    }])
}

// get all recipes
exports.get_recipes = async function(){
    let result = await recipe.findAll({
    })
    console.log(result);
    return result;
}