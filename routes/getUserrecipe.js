const router = require('koa-router')();
const recipe_mgmt = require("../application/recipe/recipe_management")

router.post('/reciperecommend/recipe/get_user_recipe', recipe_mgmt.getUserrecipe);

module.exports = router;