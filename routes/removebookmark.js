const router = require('koa-router')();
const recipe_mgmt = require("../application/recipe/recipe_management")

router.post('/reciperecommend/recipe/removebookmark', recipe_mgmt.removebookmark);

module.exports = router;