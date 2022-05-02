import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {getPodcastsById} from "../useRequest";
import {findPodcastById, findPodcastByPodchaserId} from "../services/podcast-service";
import {findCommentById} from "../actions/comment-actions";
import {useDispatch, useSelector} from "react-redux";
import {findUserById} from "../actions/user-actions";
import {findReviewById} from "../actions/review-actions";
import SecureContent from "./secure-content";
import SecureCreatorContent from "./secure-creator-content";
import {useProfile} from "../contexts/profile-context";

const UserDetails = (user) => {
    console.log("in user details")
    console.log(user)
    const {profile} = useProfile()
    const navigate = useNavigate()

    let self = false
    if (user.user === profile) {
        self = true
    }
    console.log(self)
    let [following, setFollowing] = useState([])
    let [comments, setComments] = useState([])
    let [reviews, setReviews] = useState([])

    const getAllFollowingInfo = async () => {
        console.log("in get all following info")
        console.log(user.user.following)
        let followedPodcasts = []
        await Promise.all(user.user.following.map(async podcast =>
            await getPodcastInfo(podcast).then(foundPodcast => followedPodcasts.push(foundPodcast))))
        setFollowing(followedPodcasts)
    }

    const getAllCommentInfo = async () => {
        const results = []
        await Promise.all(user.user.comments.map(comment => {
                    getCommentInfo(comment).then(com => results.push(com))}))
        setComments(results)
    }

    const getAllReviewInfo = async () => {
        const results = []
        await Promise.all(user.user.reviews.map(async review =>
            await getReviewInfo(review).then(foundReview => results.push(foundReview))))
        setReviews(results)
    }

    //useEffect(() => getUserInfo(), []);
    useEffect(() => getAllFollowingInfo(), [])
    useEffect(() => getAllCommentInfo(), []);
    useEffect(() => getAllReviewInfo(), []);

    const dispatch = useDispatch();

    const getPodcastInfo = async (podcast) => {
        const podcastInfo = await getPodcastsById(podcast.podcastId);
        return podcastInfo.podcast;
    }

    const getCommentInfo = async (comment) => {
        let commentDetails = {_id: comment}
        const commentInfo = await findCommentById(dispatch, commentDetails)
        return commentInfo;
    }

    const getReviewInfo = async (review) => {
        let reviewDetails = {_id: review}
        const reviewInfo = await findReviewById(dispatch, reviewDetails)
        return reviewInfo;
    }

    const prettyDate = (dateString) => {
        let date = new Date(dateString);
        const month = date.toLocaleString('default', {month: 'short'})
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    const userProfile = user.user

    return (
        <div>
            <h3>User Information</h3>
            <p><strong>{userProfile.firstName} {userProfile.lastName}</strong></p>
            {self && <div>
                <p><strong>Email: </strong> {userProfile.email}</p>
                <p><strong>Phone Number: </strong> {userProfile.phoneNumber}</p>
            </div>}

            <h4>Following</h4>
            <ul>
                {following.map((podcast) => {
                    return (
                        <li className="list-group-item  align-items-start w-25" key={podcast._id}>
                            <Link to={`/podcasts/details/${podcast.id}`}>{podcast.title}</Link>
                        </li>)})}
            </ul>
            <h4>Comments</h4>
            <ul>
                {comments.map((comment) => {
                    return (
                        <li className="list-group-item  align-items-start w-25" key={comment._id}>
                            <div className="d-flex align-items-center text-decoration-none">
                                <div className="ms-3">

                                    <small className="text-muted mb-1">
                                        <Link to={`/profile/${comment.userId}`}
                                              className={"text-decoration-none"}>
                                            {comment.username}
                                        </Link>
                                        <span> on {prettyDate(comment.datePosted)}</span>
                                    </small>

                                    <p className="text-black mb-1">
                                        <Link to={`/podcasts/details/${comment.podcastId}/${comment.episodeId}`}>
                                            {comment.body}</Link></p>

                                    <SecureContent>
                                        <i className={`fa fa-regular fa-thumbs-up me-2 text-muted `}/>
                                        <small className="text-muted mb-1 me-4">{comment.likes.count}</small>
                                    </SecureContent>

                                    <SecureContent>
                                        <i className="fa fa-regular fa-thumbs-down me-2 text-muted"/>
                                        <small className="text-muted mb-1">{comment.dislikes.count}</small>
                                    </SecureContent>

                                </div>
                            </div>
                        </li>)})}
            </ul>
            <h4>Reviews</h4>
            <ul>
                {reviews.map((review) => {
                    return (
                        <li className="list-group-item  align-items-start w-25" key={review._id}>
                            <div className="d-flex align-items-center text-decoration-none">
                                <div className="ms-3">
                                    <small className="text-muted mb-1">
                                        <Link to={`/profile/${review.userId}`}
                                              className={"text-decoration-none"}>
                                            {review.username}
                                        </Link>
                                        <span> on {prettyDate(review.datePosted)}</span>
                                    </small>
                                    <div className="text-warning mb-1">
                                        <div>
                                            {[...Array(review.rating)].map((star, index) => {
                                                index += 1; // to create unique ids
                                                return (
                                                    <i className="fa fa-solid fa-star p-1" key={index}> </i>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <p className="text-black fw-bold mb-1">
                                        <Link to={`/podcasts/details/${review.podcastId}`}>{review.title}</Link></p>
                                    <p className="text-muted mb-1">{review.body}</p>
                                </div>
                            </div>
                        </li>)})}
            </ul>
        </div>
    );
};

export default UserDetails;