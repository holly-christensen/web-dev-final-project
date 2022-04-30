import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getPodcastEpisodes, getPodcastsById} from "../useRequest";
import {updateUser} from "../services/user-service";
import {findPodcastByPodchaserId, upsertPodcastByPodchaserId} from "../services/podcast-service";
import {useProfile} from "../contexts/profile-context";


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
        let [podcastDetails, setPodcastDetails] = useState(initialPodcastDetails);
        let [episodesDetails, setEpisodesDetails] = useState(initialEpisodesDetails);
        let {profile} = useProfile();

        const {pid} = useParams();


        useEffect(() => getPodcastInfo(), []);
        // useEffect(() => updateUserIsFollowing, [])
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
            const month = date.toLocaleString('default', {month: 'short'})
            const day = date.getDate();
            const year = date.getFullYear();
            return `${month} ${day}, ${year}`;
        }

        const followHandler = async () => {
            // if (podcastDetails.userIsFollowing === false) {
                const podcastInDb = await findPodcastByPodchaserId(pid);
                if (podcastInDb.length === 0) {
                    const response = await upsertPodcastByPodchaserId(pid)
                }
                let updatedUser = profile;
                updatedUser.following.push({podcastId: pid});
                const result = await updateUser(updatedUser);
            // }
        }

        const unFollowHandler = async () => {
            // if (podcastDetails.userIsFollowing === true) {
                let updatedUser = profile;
                updatedUser.following = updatedUser.following.filter((podcast) => {
                    return podcast.podcastId !== pid
                });
                const result = await updateUser(updatedUser);
            // }
        }

        const updateUserIsFollowing = () => {
            let isFollowing = false;
            profile.following.forEach((podcast) => {
                if (podcast.podcastId === pid) {
                    isFollowing = true;
                }
            })
            setPodcastDetails({...podcastDetails, userIsFollowing: isFollowing})

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
                        {podcastDetails.userIsFollowing === false &&
                            <button
                                onClick={followHandler}
                            >Follow Podcast
                            </button>}
                        {podcastDetails.userIsFollowing === true &&
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
    }
;

export default PodcastDetails;