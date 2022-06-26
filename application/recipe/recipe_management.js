const Controller = require("../controller/recipeController");

exports.get_recipes = async(ctx, next) => {
    let body = ctx.request.body;
    
    let controller = new Controller();
    let result = await controller.get_recipes(body);
    ctx.body = result;

    await next();
}