const baseController = require("./baseController");
const userAccounts = require("../model/user_accounts");

class accountController extends baseController {
    async signup(content) {
        // sign up
        console.log("accountController.signup: ", content);

        let password = content.password;
        let passwordconfirm = content.passwordconfirm;

        if (password === passwordconfirm){
            // do nothing
        }
        else {
            let result = {
                "code": 203,
                "err_message": "Password Confirm does not match"
            }
            return result;
        }

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

    async login(content) {
        // login
        console.log("acccountController.signup: ", content);

        // check email
        let email = content.email
        let password = content.password

        // aquire user login information from Database
        let result = await userAccounts.get_login(email)

        if (result === -1){
            // no user exists
            result = {
                "code": 201,
                "err-message": "Email does not exist"
            }
            return result;
        }

        // result now contains password
        if (password === result){
            console.log("log in successful");
            result = {
                "code": 200
            }
            return result;
        }
        else {
            // wrong password
            console.log("Incorrect password");
            result = {
                "code": 202,
                "err-message": "Incorrect Password"
            }
            return result;
        }
    }
}

module.exports = accountController