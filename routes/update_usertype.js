const router = require('koa-router')();
const profile_mgmt = require("../application/profile/profile_management");

router.post('/reciperecommend/profile/changeusertype', profile_mgmt.update_usertype);

module.exports = router;