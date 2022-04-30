import axios from 'axios';
const COMMENTS_API = 'http://localhost:4000/api/comments';

export const createComment = async (comment) => {
    const response = await axios.post(COMMENTS_API, comment)
    return response.data;
}

export const findAllComments = async () => {
    const response = await axios.get(COMMENTS_API);
    const comments = response.data;
    return comments || 0;
}

export const findCommentById = async (comment) => {
    const response = await axios.get(`${COMMENTS_API}/${comment._id}`, comment);
    const comments = response.data;
    return comments;
}

export const findCommentsByEpisodeId = async (episodeId) => {
    const response = await axios.get(`${COMMENTS_API}/episode/${episodeId}`, episodeId);
    const comments = response.data;
    return comments;
}

export const deleteComment = async (comment) => {
    const response = await axios
        .delete(`${COMMENTS_API}/${comment._id}`);
    return response.data;
}
export const updateComment = async (comment) => {
    const response = await axios.put(`${COMMENTS_API}/${comment._id}`, comment);
    return response.data;
}