const router = require('koa-router')();
const ingredients_mgmt = require("../application/ingredients/ingredients_management");

router.post('/reciperecommend/ingredients/get_ingredients', ingredients_mgmt.get_ingredients);

module.exports = router;