const router = require('koa-router')();
const recipe_mgmt = require("../application/recipe/recipe_management")

router.post('/reciperecommend/recipe/addbookmark', recipe_mgmt.addbookmark);

module.exports = router;