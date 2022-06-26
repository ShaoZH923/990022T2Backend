const router = require('koa-router')();
const profile_mgmt = require("../application/profile/profile_management");

router.post('/reciperecommend/profile/addbannedingredients', profile_mgmt.addbannedingredients);

module.exports = router;