import * as service from '../services/comment-service.js';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const FIND_ALL_COMMENTS = 'FIND_ALL_COMMENTS';
export const FIND_COMMENT_BY_ID = 'FIND_COMMENT_BY_ID';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const FIND_COMMENTS_BY_EPISODE_ID = 'FIND_COMMENTS_BY_EPISODE_ID';

export const createComment = async (dispatch, commentBody, episodeId, podcastId, userId, username) => {
    const newComment = {
        likes: {count: 0, likedBy: []},
        dislikes: {count: 0, dislikedBy: []},
        episodeId: episodeId,
        podcastId: podcastId,
        userId: userId,
        username: username,
        body: commentBody,
        datePosted: new Date().toLocaleDateString() + "",
    }
    const comment = await service.createComment(newComment);
    dispatch({
        type: CREATE_COMMENT,
        comment: comment
    });
    return comment;
}
export const findAllComments = async (dispatch) => {
    const comments = await service.findAllComments();
    dispatch({
        type: FIND_ALL_COMMENTS,
        comments
    });
}
export const findCommentsByEpisodeId = async (dispatch) => {
    const comments = await service.findCommentsByEpisodeId();
    dispatch({
        type: FIND_COMMENTS_BY_EPISODE_ID,
        comments
    });
}
export const findCommentById = async (dispatch, commentId) => {
    const comment = await service.findCommentById(commentId);
    dispatch({
        type: FIND_COMMENT_BY_ID,
        comment
    });
    return comment;
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