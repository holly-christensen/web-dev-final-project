import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getPodcastEpisodes, getPodcastsById} from "../useRequest";
import {updateUser} from "../services/user-service";
import {createPodcast, findPodcastByPodchaserId} from "../services/podcast-service";
import {useProfile} from "../contexts/profile-context";


const PodcastDetails = () => {

    const initialPodcastDetails = {
        title: '',
        description: '',
        imageUrl: '',
        userIsFollowingThisPodcast: false,
        mongoPodcastId: ''
    }
    const initialEpisodesDetails = {
        episodes: [],
        currentPage: 0,
        nextPage: 1,
    }
    let [podcastDetails, setPodcastDetails] = useState(initialPodcastDetails);
    let [episodesDetails, setEpisodesDetails] = useState(initialEpisodesDetails);
    let {profile} = useProfile();

    const {pid} = useParams();
    // const dispatch = useDispatch();


    useEffect(() => getPodcastInfo(), []);
    useEffect(() => updateWhetherUserIsFollowingThisPodcast(), []);
    // useEffect(() => getMongoPodcastId(), []);
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

    const getMongoPodcastId = async () => {
       const result = await findPodcastByPodchaserId(pid);
       return result._id;
    }

    // returns the mongo id of the newly created podcast
    const handleCreatePodcast = async () => {
        const episodeIds = episodesDetails.episodes.map((episode) => {
            return episode.episodeId;
        })
        const podcast = {
            podcastId: pid,
            title: podcastDetails.title,
            description: podcastDetails.description,
            imageUrl: podcastDetails.imageUrl,
            episodes: episodeIds,
            reviews: [] // TODO update once review component is added
        }
        const result = await createPodcast(podcast);
        console.log(JSON.stringify(result));
        return result._id;
    }

    const prettyDate = (dateString) => {
        let date = new Date(dateString);
        const month = date.toLocaleString('default', {month: 'short'})
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    const followHandler = async () => {
        let mongoId = await getMongoPodcastId();
        if (mongoId === undefined) {
            mongoId = await handleCreatePodcast();
        }

        let following = profile.following;
        following.push({_id: mongoId});
        let updatedUser = profile;
        updatedUser.following = following;
        const result = await updateUser(updatedUser);
        setPodcastDetails({...podcastDetails, userIsFollowingThisPodcast: true, mongoPodcastId: mongoId});
    }

    const unFollowHandler = async () => {
        let mongoId = await getMongoPodcastId();
        if (mongoId !== undefined) {
            console.log("not undef")
            let following = profile.following;
            following.filter((podcast) => {
                return podcast._id !== mongoId
            });
            let updatedUser = profile;
            updatedUser.following = following;
            const result = await updateUser(updatedUser);
            setPodcastDetails({...podcastDetails, userIsFollowingThisPodcast: false});
        }

        // if the mongoId is undefined, it means the podcast isn't in the db and
        // therefore can't be on the user's following list

        // if (profile.following.length > 0) {
        //     const updatedFollowing = profile.following.filter(podcast => {
        //         return podcast.podcastId !== pid
        //     })
        //     const updatedUser = profile;
        //     updatedUser.following = updatedFollowing;
        //     const result = await updateUser(updatedUser);
        //     setPodcastDetails({...podcastDetails, userIsFollowingThisPodcast: false});
        // }
    }

    // should be called one time when the component mounts
    // determines if the signed in user is following this podcast
    // sets the state to reflect that
    const updateWhetherUserIsFollowingThisPodcast = () => {
        let matches = [];
        if (profile.following) {
            matches = profile.following.filter((podcast) => {
                console.log(podcast._id+" + "+podcastDetails.mongoPodcastId);
                return podcast.podcastId === pid;
            })
        }
        const isFollowing = matches.length >0;
        setPodcastDetails({...podcastDetails, userIsFollowingThisPodcast: isFollowing});
    }

    // so when they follow a podcast i'm going to post it to the db
    // then add that id to update the user

    // to check if they are following it, check if the podchaser id exists in our podcasts db


    return (
        <>
            <div className={"container col-9 mt-5"}>
                <h1>{podcastDetails.title}</h1>
                <p>{pid}</p>
                <p>{JSON.stringify(profile)}</p>
                <img src={podcastDetails.imageUrl} alt={"Podcast Image"} height={350}/>
                <p className={"mt-3"}>{podcastDetails.description}</p>
                <div>
                    {podcastDetails.userIsFollowingThisPodcast === false &&
                        <button
                            onClick={followHandler}
                        >Follow Podcast
                        </button>}
                    {podcastDetails.userIsFollowingThisPodcast === true &&
                        <button
                            onClick={unFollowHandler}
                        >Unfollow Podcast
                        </button>}

                </div>
                <div>
                    <button onClick={handleCreatePodcast}>
                        Add to Mongodb
                    </button>
                </div>
                <div>
                    <h3>Episodes</h3>
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
                    <h3>Reviews</h3>
                </div>

            </div>

        </>
    );
};

export default PodcastDetails;