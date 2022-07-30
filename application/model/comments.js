import { comments } from "./entity/comments"

exports.addcomment = async function(uid, rid, comment) {
    await comments.bulkCreate([{
        uid: uid,
        rid: rid,
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