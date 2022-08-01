import { comments } from "./entity/comments"
import user_accounts from "./user_accounts"

exports.addcomment = async function(uid, rid, comment) {
    let username = await user_accounts.get_username(uid);
    await comments.bulkCreate([{
        uid: uid,
        rid: rid,
        username: username,
        comment: comment
    }])
}

exports.searchcomments = async function(rid) {
    let result = await comments.findAll({
        where: {
            rid: rid
        }
    })
    return result
}

exports.remove_recipe_comments = async function(rid) {
    comments.destroy({
        where: {
            rid: rid
        }
    })
}