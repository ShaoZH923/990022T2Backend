const router = require('koa-router')();
const profile_mgmt = require("../application/profile/profile_management")

router.post('/reciperecommend/profile/getprofile', profile_mgmt.getprofile);

module.exports = router;