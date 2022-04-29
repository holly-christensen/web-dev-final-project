import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {getPodcastsById} from "../useRequest";
import {findPodcastById, findPodcastByPodchaserId} from "../services/podcast-service";
import {findCommentById} from "../actions/comment-actions";
import {useDispatch, useSelector} from "react-redux";
import {findUserById} from "../actions/user-actions";

const UserDetails = (user) => {
    console.log("in user details")
    console.log(user)
    const navigate = useNavigate()
    let [currentComment, setCurrentComment] = useState({})
    //let [viewedUser, setViewedUser] = useState({})
    let [following, setFollowing] = useState([])
    let [comments, setComments] = useState([])
    let [reviews, setReviews] = useState([])

    // const getUserInfo = async () => {
    //     console.log("getting user info")
    //     let result = {}
    //     await findUserById(dispatch, user).then(user => setViewedUser(user))
    //     // console.log("userInfo " + userInfo)
    //     // console.log("result " + result)
    //     // //setViewedUser(userInfo)
    //     // return userInfo
    // }

    const getAllFollowingInfo = async () => {
        console.log("in get all following info")
        console.log(user.user.following)
        let followedPodcasts = []
        await Promise.all(user.user.following.map(async podcast =>
            await getPodcastInfo(podcast).then(foundPodcast => followedPodcasts.push(foundPodcast))))
        setFollowing(followedPodcasts)
    }

    const getAllCommentInfo = async () => {
        console.log("in get all comment info")
        console.log(user.user.comments)
        const results = []
        await Promise.all(user.user.comments.map(comment => {
                    getCommentInfo(comment).then(com => results.push(com))}))
        setComments(results)
        //results.push(result)
        // console.log(commentsInfo)
        // //setComments(commentsInfo)
        // return commentsInfo;
        // //console.log(comments)
    }

    const getAllReviewInfo = async () => {
        const results = []
        await Promise.all(user.user.reviews.map(async review =>
            await getReviewInfo(review).then(foundReview => setReviews([...reviews, foundReview]))))
        setReviews(results)
    }

    //useEffect(() => getUserInfo(), []);
    useEffect(() => getAllFollowingInfo(), [])
    useEffect(() => getAllCommentInfo(), []);
    useEffect(() => getAllReviewInfo(), []);

    const dispatch = useDispatch();
    //console.log(viewedUser)
    // use effect to get all comment details

    // function get all comment details and set the state

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
        //const reviewInfo = await findReviewById(dispatch, review)
        //return reviewInfo;
        return review;
    }

    // <p key={comment}>{getCommentInfo(comment).body}</p>
    const profile = user.user
   // console.log("following!!!!!!")
    //console.log(profile.following)
    console.log(profile)
    console.log(comments)
    console.log(user.comments)
    //console.log(user)
    return (
        <div>
            {/*<h1>{JSON.stringify(comments)}</h1>*/}
            <h3>User Information</h3>
            <p><strong>{profile.firstName} {profile.lastName}</strong></p>
            <p><strong>Email: </strong> {profile.email}</p>
            <p><strong>Phone Number: </strong> {profile.phoneNumber}</p>
            <h4>Following</h4>
            <ul>
                {following.map((podcast) => {
                    return (
                        <li key={podcast._id}>
                            <Link to={`/podcasts/details/${podcast.id}`}>{podcast.title}</Link>
                        </li>)})}
            </ul>
            <h4>Comments</h4>
            <ul>
                {comments.map((comment) => {
                    return (
                        <li key={comment._id}>
                            <div>{comment.body}</div>
                        </li>)})}
            </ul>
            <h4>Reviews</h4>
            <ul>
                {reviews.map((review) => {
                    return (
                        <li key={review._id}>
                            <div>{review.title}</div>
                        </li>)})}
            </ul>
        </div>
    );
};

export default UserDetails;