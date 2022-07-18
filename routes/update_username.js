const router = require('koa-router')();
const account_management = require("../application/accounts/account_management")

router.post('/reciperecommend/profile/updateusername', account_management.updateusername);

module.exports = router;