// star ratings logic references this from W3 Collective: https://w3collective.com/react-star-rating-component/
import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getPodcastEpisodes, getPodcastsById} from "../useRequest";
import {updateUser} from "../services/user-service";
import {findUserById} from "../actions/user-actions";
import {findReviewsByPodcastId} from "../services/review-service.js";
import {useProfile} from "../contexts/profile-context";
import {findAllCreators} from "../services/creator-service";
import {useDispatch, useSelector} from "react-redux";
import {createReview, deleteReview} from "../actions/review-actions";
import SecureContent from "./secure-content";
import SecureCreatorContent from "./secure-creator-content";


const PodcastDetails = () => {

        const initialPodcastDetails = {
            title: '',
            description: '',
            imageUrl: '',
            userIsFollowing: false,
        }
        const initialEpisodesDetails = {
            episodes: [],
            currentPage: 0,
            nextPage: 1,
            hasMorePages: false,
        }

        const initialReviewContent = {
            title: '',
            body: '',
            rating: 5,
        }

        const reviewsFromState = useSelector((state) => state.reviews);

        let [podcastDetails, setPodcastDetails] = useState(initialPodcastDetails);
        let [episodesDetails, setEpisodesDetails] = useState(initialEpisodesDetails);
        let [creatorDetails, setCreatorDetails] = useState({username: null, _id: null});
        let [reviews, setReviews] = useState(reviewsFromState);
        let [reviewContent, setReviewContent] = useState(initialReviewContent)
        let [isFollowing, setIsFollowing] = useState(null)

        let {profile} = useProfile();
        const {pid} = useParams();
        let dispatch = useDispatch();

        useEffect(() => getPodcastInfo(), []);
        useEffect(() => getReviews(), []);
        useEffect(() => getPodcastCreatorIfExists(), []);
        useEffect(() => {
            if(profile !== null){
                checkIfFollowing(profile.following);
            }

        }, []);
        useEffect(() => getEpisodes(episodesDetails.currentPage), []);

        const getPodcastInfo = async () => {
            const podcastInfo = await getPodcastsById(pid);
            setPodcastDetails({
                ...podcastDetails,
                title: podcastInfo.podcast.title,
                description: podcastInfo.podcast.description,
                imageUrl: podcastInfo.podcast.imageUrl
            })
        }

        const getEpisodes = async (pageToGet) => {
            const response = await getPodcastEpisodes(pid, pageToGet);
            const episodes = episodesDetails.episodes.concat(response.podcast.episodes.data)
            setEpisodesDetails({
                ...episodesDetails,
                episodes: episodes,
                currentPage: response.podcast.episodes.paginatorInfo.currentPage,
                nextPage: response.podcast.episodes.paginatorInfo.currentPage + 1,
                hasMorePages: response.podcast.episodes.paginatorInfo.hasMorePages
            })
        }

        const getReviews = async () => {
            const podcastReviews = await findReviewsByPodcastId(pid);
            setReviews(podcastReviews);
        }

        const prettyDate = (dateString) => {
            let date = new Date(dateString);
            const month = date.toLocaleString('default', {month: 'short'})
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month} ${day}, ${year}`;
        }

        const checkIfFollowing = (userFollowingList) => {
            // if the list is not defined, make null
            if (userFollowingList === undefined) {
                setIsFollowing(null);
                return null;
            }
            // else set the state to whether or not the podcast is in the list
            else {
                let alreadyFollowing = false;
                userFollowingList.forEach((id) => {
                    if (id.podcastId === pid)
                        alreadyFollowing = true;
                })

                setIsFollowing(alreadyFollowing);
                return alreadyFollowing;
            }
        }

        const handleFollowOrUnfollow = async () => {
            const isAlreadyFollowing = checkIfFollowing(profile.following);
            if (!isAlreadyFollowing) {
                // add this podcast to user following list
                let newUser = profile;
                newUser.following.push({podcastId: pid});
                await updateUser(newUser)
                checkIfFollowing(profile.following);
            } else {
                // remove this podcast from user following list
                let newUser = profile;
                newUser.following = newUser.following.filter((podcast) => {
                    return podcast.podcastId !== pid
                })
                await updateUser(newUser)
                checkIfFollowing(profile.following)
            }
        }

        const createReviewHandler = async () => {
            // add the review to the db
            const review = await createReview(dispatch, reviewContent, pid, profile._id, profile.credentials.username);
            // empty review input
            setReviewContent(initialReviewContent);
            // update user with new review id
            let updatedUser = profile;
            updatedUser.reviews.push({_id: review[0]._id});
            await updateUser(updatedUser);
            await getReviews();
        }

        const deleteReviewHandler = async (review) => {
            // remove the review from the db
            await deleteReview(dispatch, review)
            getReviews();
            // remove the review from the user's list of reviews
            let user = await findUserById(dispatch, {_id: review.userId});
            user.reviews = user.reviews.filter((reviewId) => {
                return reviewId !== review._id
            })
            await updateUser(user);
        }

        const getPodcastCreatorIfExists = async () => {
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
                    <h1>{podcastDetails.title}</h1>
                    {
                        creatorDetails.username &&
                        <Link to={`/profile/${creatorDetails.userId}`} className={"text-decoration-none"}>
                            <h6 className={"my-3"}>{creatorDetails.username}</h6>
                        </Link>
                    }
                    <img src={podcastDetails.imageUrl} alt={"Podcast Image"} height={350}/>
                    <p className={"mt-3"}>{podcastDetails.description}</p>
                    <SecureContent>
                        {isFollowing === null &&
                            <p></p>}
                        {(isFollowing && true) &&
                            <div className={"d-flex align-items-baseline"}>
                                <button className={`btn btn-primary me-2`}
                                        onClick={() => handleFollowOrUnfollow()}>Unfollow
                                </button>
                                <p className={"text-muted"}>Following</p>
                            </div>}
                        {(!isFollowing && (isFollowing !== null)) &&
                            <div className={"d-flex align-items-baseline"}>
                                <button className={`btn btn-outline-primary me-2`}
                                        onClick={() => handleFollowOrUnfollow()}>Follow
                                </button>
                                <p className={"text-muted"}>Not following</p>
                            </div>}
                    </SecureContent>
                    <div>
                        <h3 className={"mt-5"}>Episodes</h3>
                        <ul className={"ps-0 mt-4"}>
                            {
                                episodesDetails.episodes.map(episode =>
                                    <li className="list-group-item  align-items-start" key={episode.id}>
                                        <Link to={`/podcasts/details/${pid}/${episode.id}`}
                                              className="d-flex align-items-center text-decoration-none">
                                            <div className="ms-3">
                                                <p className="text-black mb-1">{episode.title}</p>
                                                <p className="text-muted mb-1">{prettyDate(episode.airDate)}</p>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                        {episodesDetails.hasMorePages && <button
                            onClick={() => {
                                getEpisodes(episodesDetails.nextPage)
                            }}
                            className={"btn btn-outline-secondary"}
                        >Show More
                        </button>}
                    </div>
                    <div>
                        {/*   REVIEWS   */}
                        <h3 className={"mt-5"}>Reviews</h3>
                        <SecureContent>
                            <h6>Write a review</h6>
                            <div className={"my-3"}>
                                <label className={"w-100 mb-2"}>
                                    Rating
                                    <div className="mb-1">
                                        {[...Array(5)].map((star, index) => {
                                            index += 1;
                                            return (
                                                <button
                                                    key={index}
                                                    className={`btn p-1 ${index <= reviewContent.rating ? "text-warning" : "text-muted"}`}
                                                    onClick={() =>
                                                        setReviewContent({...reviewContent, rating: index})}
                                                >
                                                    <i className={"fa fa-solid fa-star"} key={index}> </i>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </label><br/>
                                <label className={"w-100 mb-2"}>
                                    Title
                                    <input
                                        className={"form-control"}
                                        placeholder={"Review title"}
                                        value={reviewContent.title}
                                        onChange={(event) =>
                                            setReviewContent({...reviewContent, title: event.target.value})}
                                    >
                                    </input>
                                </label> <br/>
                                <label className={"w-100 mb-2"}>
                                    Review
                                    <textarea
                                        className={"form-control"}
                                        placeholder={"Write your review"}
                                        value={reviewContent.body}
                                        onChange={(event) =>
                                            setReviewContent({...reviewContent, body: event.target.value})}
                                    >
                                    </textarea>
                                </label><br/>
                                <button
                                    className={"btn btn-outline-primary my-2 my-sm-0"}
                                    onClick={() => {
                                        createReviewHandler()
                                    }}>
                                    Post
                                </button>
                            </div>
                        </SecureContent>
                        <ul className={"ps-0 mt-4"}>
                            {
                                reviews.map(review =>
                                    <li className="list-group-item  align-items-start" key={review._id}>
                                        <SecureCreatorContent>
                                            <i
                                                className="fa fas fa-trash float-end p-2"
                                                onClick={() => deleteReviewHandler(review)}
                                            > </i>
                                        </SecureCreatorContent>
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
                                                <p className="text-black fw-bold mb-1">{review.title}</p>
                                                <p className="text-muted mb-1">{review.body}</p>
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

export default PodcastDetails;