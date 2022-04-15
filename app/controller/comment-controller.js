import commentsDao  from '../daos/comments-dao.js';

const findAllComments = async (req, res) => {
    console.log('in findAllComments ');
    const comments = await commentsDao.findAllComments()
    console.log('comments '+comments);

    res.json(comments)
}
const findCommentById = async (req, res) => {
    const commentId = req.params['id']
    const comment = await commentsDao.findCommentById(commentId)
    res.json(comment)
}

const createComment = async (req, res) => {
    const newComment = req.body
    const insertedComment = await commentsDao.createComment(newComment)
    res.json(insertedComment)
}
const deleteComment = async (req, res) => {
    const commentId = req.params.id
    const status = await commentsDao.deleteComment(commentId)
    res.json(status)
}
const updateComment = async (req, res) => {
    const commentId = req.params.id
    const updatedComment = req.body
    const status = await commentsDao.updateComment(
        commentId,
        updatedComment
    )
    res.json(status)
}

export default (app) =>  {
    app.get('/api/comments', findAllComments)
    app.get('/api/comments/:id', findCommentById)
    app.post('/api/comments', createComment)
    app.delete('/api/comments/:id', deleteComment)
    app.put('/api/comments/:id', updateComment)
};