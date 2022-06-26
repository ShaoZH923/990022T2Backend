const router = require('koa-router')();
const recipe_mgmt = require("../application/recipe/recipe_management")

router.post('/reciperecommend/recipe/get_recipes', recipe_mgmt.get_recipes);

module.exports = router;