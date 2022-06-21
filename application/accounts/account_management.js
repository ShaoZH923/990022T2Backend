const Controller = require("../controller/accountController");

exports.signup = async(ctx, next) => {
    let body = ctx.request.body;

    let controller = new Controller();
    let result = await controller.signup(body);
    ctx.body = result;

    console.log("Account Signup Operation: ", result);

    await next();
}