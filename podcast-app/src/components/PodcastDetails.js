import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {getPodcastEpisodes, getPodcastsById} from "../useRequest";
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

    return (
        <>
        <div className={"container col-9 mt-5"}>
            <h1>{podcastDetails.title}</h1>
            <p>{pid}</p>
            <img src={podcastDetails.imageUrl} alt={"Podcast Image"} height={350}/>
            <p className={"mt-3"}>{podcastDetails.description}</p>
            <div>
                <button>Follow Podcast</button>
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