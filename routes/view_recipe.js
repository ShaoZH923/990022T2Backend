const router = require('koa-router')();
const recipe_mgmt = require("../application/recipe/recipe_management")

router.post('/reciperecommend/recipe/view_recipe', recipe_mgmt.view_recipe);

module.exports = router;