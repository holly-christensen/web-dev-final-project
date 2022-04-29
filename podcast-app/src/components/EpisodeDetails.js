import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getEpisodesById} from "../useRequest";
import {updateUser} from "../actions/user-actions";
import {findCommentsByEpisodeId} from "../services/comment-service";
import {useProfile} from "../contexts/profile-context";
import {createComment} from "../actions/comment-actions";
import {useDispatch, useSelector} from "react-redux";
import {findUserById} from "../services/user-service";
import {updateComment} from "../actions/comment-actions";


const EpisodeDetails = () => {

        const initialEpisodeDetails = {
            title: '',
            description: '',
            imageUrl: '',
        }

        const commentsFromState = useSelector((state) => state.comments);
        console.log('comments from state' + JSON.stringify(commentsFromState));

        let [episodeDetails, setEpisodeDetails] = useState(initialEpisodeDetails);
        let [comments, setComments] = useState(commentsFromState);
        let [commentBody, setCommentBody] = useState('');

        let {profile} = useProfile();
        const {eid} = useParams();
        let dispatch = useDispatch();

        useEffect(() => getEpisodeInfo(), []);
        useEffect(() => getComments(), []);

        const getEpisodeInfo = async () => {
            const episodeInfo = await getEpisodesById(eid);
            setEpisodeDetails({
                ...episodeDetails,
                title: episodeInfo.episode.title,
                description: episodeInfo.episode.description,
                imageUrl: episodeInfo.episode.imageUrl
            })
        }

        const getComments = async () => {
            const comments = await findCommentsByEpisodeId(eid);
            console.log('comments from db ' + comments);
            setComments(comments);
        }

        const getUsername = async (uid) => {
            if (uid !== undefined) {
                const user = await findUserById({_id: uid})
                console.log(user.credentials.username);
                return user.credentials.username;
            } else {
                return " "
            }
        }

        const prettyDate = (dateString) => {
            let date = new Date(dateString);
            const month = date.toLocaleString('default', {month: 'short'})
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month} ${day}, ${year}`;
        }

        const createCommentHandler = async () => {
            // add the comment to the db
            const response = await createComment(dispatch, commentBody, eid, profile._id, profile.credentials.username);
            // empty comment input
            setCommentBody('');
            // update user with new comment id
            let updatedUser = profile;
            updatedUser.comments.push({_id: response[0]._id});
            const newUser = await updateUser(dispatch, updatedUser);
            await getComments();
        }

        const checkIfAlreadyLikedOrDisliked = (userList) => {
            let alreadyLikedOrDisliked = false;
            userList.forEach((id) => {
                console.log('comparing ' + id._id + " and " + profile._id)
                if (id._id === profile._id)
                    alreadyLikedOrDisliked = true;
            })
            console.log(alreadyLikedOrDisliked);
            return alreadyLikedOrDisliked;
        }

        const handleLike = async (comment) => {
            const isAlreadyLiked = checkIfAlreadyLikedOrDisliked(comment.likes.likedBy);
            if (!isAlreadyLiked) {
                // update comment
                let newComment = comment;
                newComment.likes.count = comment.likes.count + 1;
                newComment.likes.likedBy.push({_id: profile._id})
                const commentResult = await updateComment(dispatch, newComment)
            } else {
                // unlike and update comment
                let newComment = comment;
                newComment.likes.count = comment.likes.count - 1;
                // filter out this user from the comment's list of users who liked it
                newComment.likes.likedBy = newComment.likes.likedBy.filter((id) => {
                    return id._id !== profile._id
                })
                const commentResult = await updateComment(dispatch, newComment)
            }

        }

        const handleDislike = async (comment) => {
            const isAlreadyDisliked = checkIfAlreadyLikedOrDisliked(comment.dislikes.dislikedBy);
            if (!isAlreadyDisliked) {
                // update comment
                const newComment = comment;
                newComment.dislikes.count = comment.dislikes.count + 1;
                newComment.dislikes.dislikedBy.push({_id: profile._id})
                const result = await updateComment(dispatch, newComment)
            } else {
                // undislike and update comment
                let newComment = comment;
                newComment.dislikes.count = comment.dislikes.count - 1;
                // filter out this user from the comment's list of users who liked it
                newComment.dislikes.dislikedBy = newComment.dislikes.dislikedBy.filter((id) => {
                    return id._id !== profile._id;
                })
                const commentResult = await updateComment(dispatch, newComment)

            }
        }

        return (
            <>
                <div className={"container col-9 mt-5"}>
                    <h1>{episodeDetails.title}</h1>
                    <p>{eid}</p>
                    <p>{JSON.stringify(profile)}</p>
                    <img src={episodeDetails.imageUrl} alt={"Podcast Image"} height={350}/>
                    <p className={"mt-3"}>{episodeDetails.description}</p>
                    <div>
                        <h3>Comments</h3>
                        <h6>Post a comment</h6>
                        <div className={"d-flex"}>
                            <input
                                className={"form-control"}
                                value={commentBody}
                                onChange={(event) =>
                                    setCommentBody(event.target.value)}
                            >
                            </input>
                            <button
                                className={"btn btn-outline-primary my-2 my-sm-0"}
                                onClick={() => {
                                    createCommentHandler()
                                }}>
                                Comment
                            </button>
                        </div>
                        <ul className={"ps-0 mt-4"}>
                            {
                                comments.map(comment =>
                                    <li className="list-group-item  align-items-start" key={comment._id}>
                                        <div className="d-flex align-items-center text-decoration-none">
                                            <div className="ms-3">
                                                <small className="text-muted mb-1">{comment.username}
                                                    <span> on {prettyDate(comment.datePosted)}</span></small>
                                                <p className="text-black mb-1">{comment.body}</p>
                                                <i className="fa fa-regular fa-thumbs-up me-2 text-muted"
                                                    onClick={() => handleLike(comment)}/>
                                                <small className="text-muted mb-1 me-4">{comment.likes.count}</small>
                                                {/*<button*/}
                                                {/*    className={"btn btn-light btn-sm me-2 ms-3"}*/}
                                                {/*    onClick={() => handleDislike(comment)}*/}
                                                {/*>Dislike*/}
                                                {/*</button>*/}
                                                <i className="fa fa-regular fa-thumbs-down me-2 text-muted"
                                                   onClick={() => handleDislike(comment)}/>
                                                <small className="text-muted mb-1">{comment.dislikes.count}</small>
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                </div>

            </>
        );
    }
;

export default EpisodeDetails;