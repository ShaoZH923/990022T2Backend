const router = require('koa-router')();
const recipe_mgmt = require("../application/recipe/recipe_management")

router.post('/reciperecommend/recipe/deleterecipe', recipe_mgmt.deleterecipe);

module.exports = router;