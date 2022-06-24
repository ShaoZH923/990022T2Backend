const router = require('koa-router')();
const account_mgmt = require("../application/accounts/account_management");

router.post('/reciperecommend/account/login', account_mgmt.login);

module.exports = router;