const baseController = require("./baseController");
const userAccounts = require("../model/user_accounts");

class accountController extends baseController {
    async signup(content) {
        // sign up
        console.log("accountController.signup: ", content);

        let duplicates = await userAccounts.checkDuplicate(content);
        console.log("duplicates: ", duplicates);

        // duplicate email
        if (duplicates === 'email') {
            console.log("duplicate email");
            let result = {
                "code": 201,
                "err_message": "Email already exists"
            }
            return result;
        }
        // duplicate username
        else if (duplicates === 'username') {
            console.log("duplicate username");
            let result = {
                "code": 202,
                "err_message": "Username already exists"
            }
            return result;
        }

        userAccounts.addUser(content);

        let result = {
            "code": 200
        }
        return result;
        
    }
}

module.exports = accountController