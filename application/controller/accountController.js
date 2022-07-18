const baseController = require("./baseController");
const userAccounts = require("../model/user_accounts");
const userProfile = require("../model/user_profile");
const { user_login } = require("../model/entity/user_login");

class accountController extends baseController {
    async signup(content) {
        // sign up
        console.log("accountController.signup: ", content);

        let email = content.email
        let username = content.username
        let password = content.password;
        // let passwordconfirm = content.passwordconfirm;

        // if (password === passwordconfirm){
        //     // do nothing
        // }
        // else {
        //     let result = {
        //         "code": 203,
        //         "err_message": "Password Confirm does not match"
        //     }
        //     return result;
        // }

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

        await userAccounts.addUser(content);

        let userinfo = await userAccounts.get_userinfo(email);
        let userid = userinfo.uid

        // create user profile
        userProfile.add_profile(content, userid);

        let result = {
            "code": 200,
            "email": email,
            "username": username
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
            let userinfo = await userAccounts.get_userinfo(email)
            result = {
                "code": 200,
                "email": userinfo.email,
                "username": userinfo.username
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


    async changepass(content){
        let email = content.email;
        let oldpassword = content.oldpassword;
        let newpassword = content.newpassword;

        // 1. Check email exists
        let have_email = await userAccounts.checkEmail(content);
        console.log("Have Email: ", have_email);

        if (have_email === false) {
            // no such email exists
            console.log("Email does not exist");
            let result = {
                "code": 201,
                "err_message": "Email does not exist"
            };
            return result;
        }

        // 2. Check old password is correct
        let user_password = await userAccounts.get_login(email);

        if (user_password === oldpassword){
            // user provided password is correct
        }
        else {
            let result = {
                "code": 202,
                "err_message": "Incorrect Old Password"
            };
            return result;
        }
        // 4. Change password
        await user_login.update({
            password: newpassword
        }, {
            where:{
                email: email
            }
        });

        let result = {
            "code": 200
        }

        return result;

    }

    async updateusername(content){
        let email = content.email;
        let newusername = content.newusername;

        await userAccounts.updateusername(email, newusername);

        let result = {
            "email":email,
            "username": newusername
        }

        return result;
    }
}

module.exports = accountController