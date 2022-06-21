const router = require('koa-router')();
const account_mgmt = require("../application/accounts/account_management");

router.post('/reciperecommend/account/signup', account_mgmt.signup);

module.exports = router;