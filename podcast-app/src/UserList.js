import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {createComment, findAllComments, deleteComment} from "./actions/comment-actions";
import {findAllUsers} from "./actions/user-actions";

const UserList = () => {
    const users = useSelector((state) => state.users);
    const comments = useSelector((state) => state.comments);

    const dispatch = useDispatch();

    const createCommentHandler = () => {
        createComment(dispatch, commentBody, "123", "0002");
    }
    const deleteCommentHandler = (comment) => {
        deleteComment(dispatch, comment._id);
    }

    useEffect(() => findAllUsers(dispatch), []);
    useEffect(() => findAllComments(dispatch), [createCommentHandler]);

    let [commentBody, setCommentBody] = useState('');

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {JSON.stringify(users)}
            </ul>
            <h2>Create User</h2>
            <h1>Comments</h1>
            <div>{JSON.stringify(comments)}</div>
            <div>{comments.length}</div>
            <ul>
                {/*{comments.map((comment) => {*/}
                {/*    return (<li>*/}
                {/*        <div>{comment.body}</div>*/}
                {/*        <button onClick={deleteCommentHandler}>Delete</button>*/}
                {/*    </li>)*/}
                {/*})}*/}
            </ul>
            <h2>Create Comment</h2>
            <textarea value={commentBody}
                      onChange={(event) =>
                          setCommentBody(event.target.value)}>
            </textarea>
            <button onClick={createCommentHandler}>
                Create comment
            </button>
        </div>
    );
};

export default UserList;