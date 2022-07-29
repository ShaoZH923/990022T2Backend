const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// *********** add more routes to fulfill more functions ***********
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// sign up
const user_signup = require('./routes/user_signup');
app.use(user_signup.routes(), user_signup.allowedMethods());

// log in
const user_login = require('./routes/user_login');
app.use(user_login.routes(), user_login.allowedMethods());

// change password
const user_changepass = require('./routes/user_changepass');
app.use(user_changepass.routes(), user_changepass.allowedMethods());

// get user profile
const get_profile = require('./routes/get_profile');
app.use(get_profile.routes(), get_profile.allowedMethods());

// update username
const update_username = require('./routes/update_username');
app.use(update_username.routes(), update_username.allowedMethods());

// update usertype
const update_usertype = require('./routes/update_usertype');
app.use(update_usertype.routes(), update_usertype.allowedMethods());

// Add bannedingredients
const user_addbannedingredients = require('./routes/user_addbannedingredients');
app.use(user_addbannedingredients.routes(), user_addbannedingredients.allowedMethods());

// Removve bannedingredients
const user_removebannedingredients = require('./routes/user_removebannedingredients');
app.use(user_removebannedingredients.routes(), user_removebannedingredients.allowedMethods());

// get ingredients info
const get_ingredients = require('./routes/get_ingredients');
app.use(get_ingredients.routes(), get_ingredients.allowedMethods());

// get all recipes
const get_recipes = require('./routes/get_recipes');
app.use(get_recipes.routes(), get_recipes.allowedMethods());

// view recipe
const view_recipe = require('./routes/view_recipe');
app.use(view_recipe.routes(), view_recipe.allowedMethods());

// search recipe using name
const search_recipe_name = require('./routes/search_recipe_name');
app.use(search_recipe_name.routes(), search_recipe_name.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app