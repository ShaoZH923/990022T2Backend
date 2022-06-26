import { ingredients } from "./entity/ingredients"

exports.get_ingredients = async function(){
    let result = await ingredients.findAll({});
    return result;
}