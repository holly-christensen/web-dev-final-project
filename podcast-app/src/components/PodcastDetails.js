import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getPodcastEpisodes, getPodcastsById} from "../useRequest";
import {findUserById, updateUser} from "../actions/user-actions";
import {useDispatch} from "react-redux";
import {useProfile} from "../contexts/profile-context";


const PodcastDetails = () => {

    const initialPodcastDetails = {
        title: '',
        description: '',
        imageUrl: '',
        userIsFollowingThisPodcast: false,
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
    const dispatch = useDispatch();


    useEffect(() => getPodcastInfo(), []);
    useEffect(() => updateWhetherUserIsFollowingThisPodcast(), []);
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

    const prettyDate = (dateString) => {
        let date = new Date(dateString);
        const month = date.toLocaleString('default', {month: 'short'})
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    const followHandler = async () => {
        const podcast = {
            title: podcastDetails.title,
            podcastId: pid,
            description: podcastDetails.description,
            imageUrl: podcastDetails.imageUrl
        }
        const updatedUser = profile;
        updatedUser.following.push(podcast);
        console.log(updatedUser);
        const result = updateUser(dispatch, updatedUser);
        setPodcastDetails({...podcastDetails, userIsFollowingThisPodcast: true});
    }

    const unFollowHandler = async () => {
        if (profile.following.length > 0) {
            const updatedFollowing = profile.following.filter(podcast => {
                return podcast.podcastId !== pid
            })
            const updatedUser = profile;
            updatedUser.following = updatedFollowing;
            const result = await updateUser(dispatch, updatedUser);
            setPodcastDetails({...podcastDetails, userIsFollowingThisPodcast: false});
        }
    }

    // should be called one time when the component mounts
    // determines if the signed in user is following this podcast
    // sets the state to reflect that
    const updateWhetherUserIsFollowingThisPodcast = () => {
        console.log('in here');
        let matches = [];
        if (profile.following) {
            console.log('length more than 0');
            matches = profile.following.filter((podcast) => {
                console.log(podcast.podcastId+" "+pid);
                return podcast.podcastId === pid;
            })
        }
        const isFollowing = matches.length >0;
        setPodcastDetails({...podcastDetails, userIsFollowingThisPodcast: isFollowing});
        console.log("set to "+isFollowing);
    }


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