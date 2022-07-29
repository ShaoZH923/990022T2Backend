const router = require('koa-router')();
const recipe_mgmt = require("../application/recipe/recipe_management")

router.post('/reciperecommend/recipe/recipe_search_name', recipe_mgmt.search_recipe_name);

module.exports = router;