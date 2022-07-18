const Controller = require("../controller/profileController");

exports.addbannedingredients = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.add_bannedingredients(body);
    ctx.body = result;
    console.log(result);
    if (result.code === 200){
        console.log("BannedIngredients Added");
    }

    await next();
}

exports.removebannedingredients = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.remove_bannedingredients(body);
    ctx.body = result;
    console.log(result);
    if (result.code === 200) {
        console.log("BannedIngredients Removed");
    }

    await next();
}

exports.getprofile = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.get_profile(body);
    ctx.body = result;
    console.log(result);
    if (result.code === 200) {
        console.log("User Profile Aquired");
    }

    await next();
}