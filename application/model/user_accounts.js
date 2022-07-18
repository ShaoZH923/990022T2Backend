import { user_login } from "./entity/user_login"
// import { user_profile } from "./entity/user_profile"
exports.checkDuplicate = async function(content) {
    let email = content.email;
    let username = content.username;
    // check duplicate email
    let list = await user_login.findAll({
        where: {
            email: email
        }
    });
    if (list.length === 1) {
        return 'email'; // duplicate email exists
    }

    // check duplicate username
    list = await user_login.findAll({
        where: {
            username: username
        }
    });
    if (list.length === 1) {
        return 'username'; // duplicate username exists
    }
    return '0'
}

exports.checkEmail = async function(content) {
    let email = content.email;
    
    let list = await user_login.findAll({
        where: {
            email: email
        }
    });
    if (list.length === 1){
        // normal, email exists
        return true;
    }
    else{
        return false;
    }
}

exports.addUser = async function(content) {
    let email = content.email;
    let username = content.username;
    let password = content.password;
    let accounttype = content.accounttype;

    user_login.bulkCreate([{
        email: email,
        username: username,
        password: password
    }])
}

exports.get_login = async function(input_msg) {
    let email = input_msg

    let list = await user_login.findOne({
        where: {
            email: email
        }
    })

    if (list === null){
        // no user found
        return -1
    }

    return list.password;
}

exports.get_userinfo = async function(email){
    let list = await user_login.findOne({
        where: {
            email: email
        }
    })

    let result = {
        "uid": list.uid,
        "email": list.email,
        "username": list.username
    }

    return result
}

exports.get_email = async function(uid){
    let list = await user_login.findOne({
        where: {
            uid: uid
        }
    })

    return list.email
}

exports.get_uid = async function(email){
    let list = await user_login.findOne({
        where: {
            email: email
        }
    })

    return list.uid
}

exports.get_username = async function(uid){
    let list = await user_login.findOne({
        where: {
            uid: uid
        }
    })

    return list.username
}