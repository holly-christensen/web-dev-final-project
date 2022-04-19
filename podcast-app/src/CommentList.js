import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createComment, findAllComments, deleteComment} from "./actions/comment-actions";
import {findAllUsers} from "./actions/user-actions";

const CommentList = () => {
    let [commentBody, setCommentBody] = useState('');

    const comments = useSelector((state) => state.comments);
    console.log('comments: '+JSON.stringify(comments))

    const dispatch = useDispatch();
    useEffect(() => findAllComments(dispatch), []);

    const createCommentHandler = () => {
        createComment(dispatch, commentBody, "123", "0002");
        setCommentBody('')
    }
    const deleteCommentHandler = (comment) => {
        deleteComment(dispatch, comment);
    }


    return (
        <div>
            <h1>Comments</h1>
            <div>{JSON.stringify(comments)}</div>
            <div>{comments.length}</div>
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
            <textarea value={commentBody}
                      onChange={(event) =>
                          setCommentBody(event.target.value)}>
            </textarea>
            <button onClick={() => {
                createCommentHandler()
            }}>
                Create comment
            </button>
        </div>
    );
};

export default CommentList;
