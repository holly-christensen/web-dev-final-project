import * as service from '../services/comment-service.js';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const FIND_ALL_COMMENTS = 'FIND_ALL_COMMENTS';
export const FIND_COMMENT_BY_ID = 'FIND_COMMENT_BY_ID';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const createComment = async (dispatch, commentBody, episodeId, userId) => {
    const newComment = {
        likes: {count: 0, likedBy: []},
        episodeId: episodeId,
        userId: userId,
        body: commentBody,
        datePosted: new Date().toLocaleDateString() + "",
        dislikes: 0
    }
    const comment = await service.createComment(newComment);
    dispatch({
        type: CREATE_COMMENT,
        comment: comment
    });
}
export const findAllComments = async (dispatch) => {
    const comments = await service.findAllComments();
    dispatch({
        type: FIND_ALL_COMMENTS,
        comments
    });
}
export const findCommentById = async (dispatch, commentId) => {
    const comment = await service.findCommentById(commentId);
    dispatch({
        type: FIND_COMMENT_BY_ID,
        comment
    });
}

export const updateComment = async (dispatch, comment) => {
    const status = await service.updateComment(comment);
    dispatch({
        type: UPDATE_COMMENT,
        comment
    });
}
export const deleteComment = async (dispatch, comment) => {
    const response = await service.deleteComment(comment);
    dispatch({
        type: DELETE_COMMENT,
        comment
    })
}