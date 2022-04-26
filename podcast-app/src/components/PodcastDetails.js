import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getPodcastEpisodes, getPodcastsById} from "../useRequest";
import {findUserById, updateUser} from "../actions/user-actions";
import {useDispatch} from "react-redux";


const PodcastDetails = () => {

    const initialPodcastDetails = {
        title: '',
        description: '',
        imageUrl: ''
    }
    const initialEpisodesDetails = {
        episodes: [],
        currentPage: 0,
        nextPage: 1,
    }
    let [podcastDetails, setPodcastDetails] = useState(initialPodcastDetails);
    let [episodesDetails, setEpisodesDetails] = useState(initialEpisodesDetails);

    const {pid} = useParams();
    const dispatch = useDispatch();
    const uid = "625f16058c3f5dec99597147"; // TODO THIS IS TEMP


    useEffect(() => getPodcastInfo(), []);
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
        })
    }

    const prettyDate = (dateString) => {
        let date = new Date(dateString);
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    const followHandler = async () => {
        const podcast = {
            title: podcastDetails.title,
            id: pid,
            description: podcastDetails.description,
            imageUrl: podcastDetails.imageUrl
        }
        const updatedUser = user.following.push(podcast);
        const result = updateUser(dispatch, updatedUser);
        console.log('user followed '+pid+': '+JSON.stringify(result));
    }

    const unFollowHandler = async () => {
        const following = user.following;
        const updatedFollowing = following.filter(podcast => {
            return podcast.id !== pid
        })
        const updatedUser = user.following = updatedFollowing;
        const result = await updateUser(dispatch, updatedUser);
        console.log('user unfollowed '+pid+': '+JSON.stringify(result));
    }

    const userIsFollowingThisPodcast = false; // filter the user's list of following for this podcast id

    //so when a user wants to follow a podcast, we need to add that podcast info to the
    // user's list of followed podcasts
    // so we need to update the user service controller etc to add something that takes in
    // a podcast and adds that to the user

    return (
        <>
        <div className={"container col-9 mt-5"}>
            <h1>{podcastDetails.title}</h1>
            <p>{pid}</p>
            <img src={podcastDetails.imageUrl} alt={"Podcast Image"} height={350}/>
            <p className={"mt-3"}>{podcastDetails.description}</p>
            <div>
                <button
                    onClick={followHandler}
                >Follow Podcast</button>
                <button
                    onClick={unFollowHandler}
                >Unfollow Podcast</button>
            </div>
            <div>
                <h3>Episodes</h3>
                <div>{episodesDetails.episodes.length}</div>
                <ul className={"ps-0 mt-4"}>
                    {
                        episodesDetails.episodes.map(episode =>
                            <li className="list-group-item  align-items-start">
                                <Link to={`/podcasts/details/${pid}/${episode.id}`} className="d-flex align-items-center text-decoration-none">
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
                    onClick={() => {getEpisodes(episodesDetails.nextPage)}}
                >Show More</button>
            </div>
            <div>
                <h3>Reviews</h3>
            </div>

        </div>

        </>
    );
};

export default PodcastDetails;