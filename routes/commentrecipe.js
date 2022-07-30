const router = require('koa-router')();
const recipe_mgmt = require("../application/recipe/recipe_management")

router.post('/reciperecommend/recipe/commentrecipe', recipe_mgmt.commentrecipe);

module.exports = router;