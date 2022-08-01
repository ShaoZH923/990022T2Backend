const router = require('koa-router')();
const recipe_mgmt = require("../application/recipe/recipe_management")

router.post('/reciperecommend/recipe/editrecipe', recipe_mgmt.editrecipe);

module.exports = router;