import { ingredients } from "./entity/ingredients"

exports.get_ingredients = async function(){
    let result = await ingredients.findAll({});
    return result;
}

exports.get_iid = async function(name){
    let result = await ingredients.findOne({
        where: {
            name: name
        }
    })
    return result.iid
}