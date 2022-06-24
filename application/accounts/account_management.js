const Controller = require("../controller/accountController");

exports.signup = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.signup(body);
    ctx.body = result;

    console.log("Account Signup Operation: ", result);

    await next();
}

exports.login = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.login(body);
    ctx.body = result;

    console.log("Account Login Operation: ", result);

    await next();
}

exports.changepass = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.changepass(body);
    ctx.body = result;

    console.log("Change Password Operation: ", result);

    await next();
}