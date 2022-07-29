const Controller = require("../controller/recipeController");

exports.get_recipes = async(ctx, next) => {
    let body = ctx.request.body;
    
    let controller = new Controller();
    let result = await controller.get_recipes(body);
    ctx.body = result;

    await next();
}

exports.view_recipe = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.view_recipe(body);
    ctx.body = result;

    await next();
}

exports.search_recipe_name = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.search_recipe_name(body);
    ctx.body = result;

    await next();
}