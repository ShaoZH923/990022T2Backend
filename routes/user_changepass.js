const router = require('koa-router')();
const account_mgmt = require("../application/accounts/account_management");

router.post('/reciperecommend/account/changepassword', account_mgmt.changepass);

module.exports = router;