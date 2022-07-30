const router = require('koa-router')();
const recipe_mgmt = require("../application/recipe/recipe_management");

router.post('/reciperecommend/recipe/createrecipe', recipe_mgmt.createrecipe);

module.exports = router;