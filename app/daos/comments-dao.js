import commentsModel from '../models/comment.model.js'

const findAllComments = () => {
    return commentsModel.find()
}

const likeComment = async (comment) => {
    // update
    const existingComment = await commentsModel().findOne({_id: comment._id})
    await commentsModel.updateOne({_id: comment._id}, {
        $set: {likes: existingComment.likes + 1}
    })
}

const dislikeComment = async (comment) => {
    // update
    const existingComment = await commentsModel().findOne({_id: comment._id})
    await commentsModel.updateOne({_id: comment._id}, {
        $set: {dislikes: existingComment.dislikes + 1}
    })
}

const findCommentById = (id) => {
    return commentsModel.findById(id)
}

const deleteComment = (id) => {
    return commentsModel.deleteOne({_id: id})
}

export default {
    likeComment, dislikeComment, findCommentById, deleteComment, findAllComments
}