const router = require('koa-router')();
const profile_mgmt = require("../application/profile/profile_management");

router.post('/reciperecommend/profile/removebannedingredients', profile_mgmt.removebannedingredients);

module.exports = router;