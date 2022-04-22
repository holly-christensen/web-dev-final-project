import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createComment, findAllComments, deleteComment} from "../actions/comment-actions";

const CommentList = () => {
    let [commentBody, setCommentBody] = useState('');

    const comments = useSelector((state) => state.comments);

    const dispatch = useDispatch();

    const createCommentHandler = () => {
        createComment(dispatch, commentBody, "123", "0002")
            .then(r => setCommentBody(''));
    }
    const deleteCommentHandler = (comment) => {
        deleteComment(dispatch, comment);
    }

    useEffect(() => findAllComments(dispatch), []);

    return (
        <div>
            <h1>Comments</h1>
            <div>{JSON.stringify(comments)}</div>
            <ul>
                {(comments.length > 0) && comments.map((comment) => {
                    return (
                        <li key={comment._id}>
                            <div>{comment.body}</div>
                            <button onClick={() => {
                                deleteCommentHandler(comment)
                            }}>Delete
                            </button>
                        </li>)
                })}
            </ul>
            <h2>Create Comment</h2>
            <input
                onChange={(event) =>
                          setCommentBody(event.target.value)}
            >
            </input>
            <button onClick={() => {
                createCommentHandler()
            }}>
                Create comment
            </button>
        </div>
    );
};

export default CommentList;
