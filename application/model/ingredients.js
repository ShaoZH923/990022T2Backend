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

exports.get_ingredients_type = async function(iid){
    // console.log("iid = ", iid);
    let result = await ingredients.findOne({
        where: {
            iid: iid
        }
    })
    // console.log("================ dataValues =============")
    // console.log(result.dataValues);
    // console.log(result.dataValues.type);
    if (result !== null) {
        return result.dataValues.type;
    }
    else {
        return 0;
    }
}

exports.get_ingredient_name = async function(iid){
    let result = await ingredients.findOne({
        where: {
            iid: iid
        }
    })
    return result.dataValues.name;
}