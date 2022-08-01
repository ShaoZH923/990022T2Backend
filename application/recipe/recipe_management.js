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

exports.search_recipe_ingredients = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.search_recipe_ingredients(body);
    ctx.body = result;
    
    await next();
}

exports.rate_recipe = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.rate_recipe(body);
    ctx.body = result;

    await next();
}

exports.addbookmark = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.addbookmark(body);
    ctx.body = result;

    await next();
}

exports.commentrecipe = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.commentrecipe(body);
    ctx.body = result;

    await next();
}

exports.createrecipe = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.createrecipe(body);
    ctx.body = result;

    await next();
}

exports.removebookmark = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.removebookmark(body);
    ctx.body = result;

    await next();
}

exports.popularrecipe = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.popularrecipe(body);
    ctx.body = result;

    await next();
}

exports.getUserrecipe = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.getUserrecipe(body);
    ctx.body = result;

    await next();
}

exports.deleterecipe = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.deleterecipe(body);
    ctx.body = result;

    await next();
}

exports.editrecipe = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.editrecipe(body);
    ctx.body = result;

    await next();
}