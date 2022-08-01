const router = require('koa-router')();
const recipe_mgmt = require("../application/recipe/recipe_management")

router.post('/reciperecommend/recipe/popularrecipe', recipe_mgmt.popularrecipe);

module.exports = router;