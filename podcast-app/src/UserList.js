import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createComment, findAllComments, deleteComment} from "./actions/comment-actions";
import {findAllUsers} from "./actions/user-actions";

const UserList = () => {
    let [commentBody, setCommentBody] = useState('');

    const users = useSelector((state) => state.users);
    const comments = useSelector((state) => state.comments);

    const dispatch = useDispatch();

    const createCommentHandler = () => {
        console.log('in comment handler!');
        createComment(dispatch, commentBody, "123", "0002");
        setCommentBody('')
    }
    const deleteCommentHandler = (comment) => {
        deleteComment(dispatch, comment);
    }

    useEffect(() => findAllUsers(dispatch), []);
    useEffect(() => findAllComments(dispatch), []);
    const commentList = Object.values(comments);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {JSON.stringify(users)}
            </ul>
            <h2>Create User</h2>
            <h1>Comments</h1>
            <ul>
                {commentList.map((comment) => {
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

export default UserList;
