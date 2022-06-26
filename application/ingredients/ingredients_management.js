const Controller = require("../controller/ingredientsController");

exports.get_ingredients = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.get_ingredients(body);
    ctx.body = result;

    await next();
}