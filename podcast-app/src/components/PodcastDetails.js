// star ratings logic inspired by: https://w3collective.com/react-star-rating-component/
import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getPodcastEpisodes, getPodcastsById} from "../useRequest";
// import {updateUser} from "../services/user-service";
import {updateUser} from "../actions/user-actions";
import {findReviewsByPodcastId} from "../services/review-service.js";
import {useProfile} from "../contexts/profile-context";
import {findAllCreators} from "../services/creator-service";
import {useDispatch, useSelector} from "react-redux";
import {createReview, updateReview} from "../actions/review-actions";
import SecureContent from "./secure-content";


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

        let {profile} = useProfile();
        const {pid} = useParams();
        let dispatch = useDispatch();

        useEffect(() => getPodcastInfo(), []);
        useEffect(() => getReviews(), []);
        useEffect(() => getPodcastCreatorIfExists(), []);
        // useEffect(() => getEpisodes(episodesDetails.currentPage), []);

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

        const checkIfAlreadyFollowing = (userFollowingList) => {
            let alreadyFollowing = false;
            userFollowingList.forEach((id) => {
                if (id.podcastId === pid)
                    alreadyFollowing = true;
            })
            return alreadyFollowing;
        }

        const handleFollowOrUnfollow = async () => {
            const isAlreadyFollowing = checkIfAlreadyFollowing(profile.following);
            if (!isAlreadyFollowing) {
                // add this podcast to user following list
                let newUser = profile;
                newUser.following.push({podcastId: pid});
                const userResult = await updateUser(dispatch, newUser)
            } else {
                // remove this podcast from user following list
                let newUser = profile;
                newUser.following = newUser.following.filter((podcast) => {
                    return podcast.podcastId !== pid
                })
                const userResult = await updateUser(dispatch, newUser)
            }
        }

        const createReviewHandler = async () => {
            // add the review to the db
            console.log(profile._id);
            const response = await createReview(dispatch, reviewContent, pid, profile._id, profile.credentials.username);
            // empty review input
            setReviewContent(initialReviewContent);
            // update user with new review id
            let updatedUser = profile;
            console.log(response[0]._id);
            updatedUser.reviews.push({_id: response[0]._id});
            console.log(updatedUser);
            const newUser = await updateUser(dispatch, updatedUser);
            await getReviews();
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

        // const numberRatingToStars = (number) => {
        //     console.log('stars');
        //     let stars = [];
        //     for(let i=0; i<number; i++){
        //         stars.push(<i className="fa fa-solid fa-star"> </i>);
        //     }
        //     return stars;
        // }


        return (
            <>
                <div className={"container col-9 mt-5"}>
                    <h1>{podcastDetails.title}</h1>
                    <p>{pid}</p>
                    <img src={podcastDetails.imageUrl} alt={"Podcast Image"} height={350}/>
                    <p className={"mt-3"}>{podcastDetails.description}</p>
                    <SecureContent>
                        <button className={`me-2 text-muted`}
                                onClick={() => handleFollowOrUnfollow()}>Follow/Un
                        </button>
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
                        <button
                            onClick={() => {
                                getEpisodes(episodesDetails.nextPage)
                            }}
                        >Show More
                        </button>
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
                                                            index += 1; // to help create unique ids
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