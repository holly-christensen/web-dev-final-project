import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getEpisodesById} from "../useRequest";
import {updateUser} from "../actions/user-actions";
import {findCommentsByEpisodeId} from "../services/comment-service";
import {useProfile} from "../contexts/profile-context";
import {createComment} from "../actions/comment-actions";
import {useDispatch, useSelector} from "react-redux";
import {findUserById} from "../services/user-service";
import {updateComment} from "../actions/comment-actions";
import SecureContent from "./secure-content";
import {findAllCreators} from "../services/creator-service";


const EpisodeDetails = () => {

        const initialEpisodeDetails = {
            title: '',
            description: '',
            imageUrl: '',
        }

        const commentsFromState = useSelector((state) => state.comments);

        let [episodeDetails, setEpisodeDetails] = useState(initialEpisodeDetails);
        let [comments, setComments] = useState(commentsFromState);
        let [commentBody, setCommentBody] = useState('');
        let [creatorDetails, setCreatorDetails] = useState({username: null, _id: null});

        let {profile} = useProfile();
        const {pid, eid} = useParams();
        let dispatch = useDispatch();

        useEffect(() => getEpisodeInfo(), []);
        useEffect(() => getComments(), []);
        useEffect(() => getPodcastCreatorIfExists(), []);

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
            setComments(comments);
        }

        // TODO COMMENTED FOR NOW, IMPLEMENT/DEBUG IF TIME
        // method to find comments that are liked by this user and add them to the state
        // const getCommentsLikedByThisUser = () => {
        //     let likedCommentIds = [];
        //     console.log(comments)
        //     comments.forEach((comment) => {
        //         comment.likes.likedBy.forEach((user) => {
        //             if( user._id === profile._id) {
        //                 likedCommentIds.push(comment._id);
        //             }
        //         })
        //     })
        //     setCommentsLikedByThisUser(likedCommentIds)
        // }

        const getUsername = async (uid) => {
            if (uid !== undefined) {
                const user = await findUserById({_id: uid})
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
            const response = await createComment(dispatch, commentBody, eid, pid, profile._id, profile.credentials.username);
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
                if (id._id === profile._id)
                    alreadyLikedOrDisliked = true;
            })
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

        const getPodcastCreatorIfExists = async () => {
            // we need to look in our db for creators who have the same podcastId as pid
            const allCreators = await findAllCreators();
            let podcastCreator = {
                username: null,
                userId: null
            }
            allCreators.filter((creator) => {
                if (creator.podcastId === pid) {
                    podcastCreator = {
                        username: creator.username,
                        userId: creator.userId
                    };
                }
            })
            setCreatorDetails({...creatorDetails, username: podcastCreator.username, userId: podcastCreator.userId})
            return podcastCreator;
        }

        return (
            <>
                <div className={"container col-9 mt-5"}>
                    <h1>{episodeDetails.title}</h1>
                    {
                        creatorDetails.username &&
                        <Link to={`/profile/${creatorDetails.userId}`} className={"text-decoration-none"}>
                            <h6 className={"my-3"}>{creatorDetails.username}</h6>
                        </Link>
                    }

                    <img src={episodeDetails.imageUrl} alt={"Podcast Image"} height={250}/>
                    <h3 className={"my-3"}>Description</h3>
                    <p>{episodeDetails.description}</p>
                    <div>
                        <h3>Comments</h3>
                        <SecureContent>
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
                        </SecureContent>
                        <ul className={"ps-0 mt-4"}>
                            {
                                comments.map(comment =>
                                    <li className="list-group-item  align-items-start" key={comment._id}>
                                        <div className="d-flex align-items-center text-decoration-none">
                                            <div className="ms-3">

                                                <small className="text-muted mb-1">
                                                    <Link to={`/profile/${comment.userId}`}
                                                          className={"text-decoration-none"}>
                                                        {comment.username}
                                                    </Link>
                                                    <span> on {prettyDate(comment.datePosted)}</span>
                                                </small>

                                                <p className="text-black mb-1">{comment.body}</p>

                                                <SecureContent>
                                                    <i className={`fa fa-regular fa-thumbs-up me-2 text-muted `}
                                                       onClick={() => handleLike(comment)}/>
                                                    <small className="text-muted mb-1 me-4">{comment.likes.count}</small>
                                                </SecureContent>

                                                <SecureContent>
                                                    <i className="fa fa-regular fa-thumbs-down me-2 text-muted"
                                                       onClick={() => handleDislike(comment)}/>
                                                    <small className="text-muted mb-1">{comment.dislikes.count}</small>
                                                </SecureContent>

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
