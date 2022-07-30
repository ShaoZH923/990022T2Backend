const router = require('koa-router')()

const recipe_mgmt = require("../application/recipe/recipe_management")

router.post('/reciperecommend/recipe/rate_recipe', recipe_mgmt.rate_recipe);

module.exports = router;