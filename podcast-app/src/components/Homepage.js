import React, {useEffect, useState} from 'react';
import {useProfile} from "../contexts/profile-context";
import {getPodcastsByCategoryAndRating, getPodcastsById, getPodcastsBySearchTerm} from "../useRequest";
import {Link} from "react-router-dom";

const Homepage = () => {

    let {profile} = useProfile();

    let [followedPodcasts, setFollowedPodcasts] = useState([])
    let [trendingPodcasts, setTrendingPodcasts] = useState([])


    useEffect(() => {
        if (profile !== null) {
            getFollowedPodcasts()
        }
    }, []);

    useEffect(() => { getTrendingPodcasts()}, []);

    const getFollowedPodcasts = async () => {
        const podcastPochaserIds = profile.following;
        let newPodcasts = [];

        if (podcastPochaserIds) {
            await Promise.all(podcastPochaserIds.map(async (pod) => {
                const details = await getPodcastsById(pod.podcastId);
                newPodcasts.push(details.podcast);
            }));
        }
        setFollowedPodcasts(newPodcasts);
    }

    const getTrendingPodcasts = async () => {
        // const trendingPods = await getPodcastsByCategoryAndRating("Comedy", 4);
        const trendingPods = await getPodcastsBySearchTerm("Comedy");
        console.log(trendingPods);
        setTrendingPodcasts(trendingPods);
    }

    const truncateDescription = (description) => {
        return description.length > 100 ? description.substring(0, 100) + "..." : description;
    }

    return (
        <div>
            <h1>Homepage</h1>
            <h3>Podcasts you follow</h3>
            <div className={"ps-0 mt-4 card-group"}>
                {
                    followedPodcasts.map((podcast) => {
                        return (<div key={podcast.podcastId}>
                            <div className={"card m-2"} style={{width: '15rem'}}>
                                <img className={"card-img-top"} src={podcast.imageUrl} alt={podcast.title}/>
                                <div className={"card-body"}>
                                    <h6 className={"card-title"}>{podcast.title}</h6>
                                    <p className={"text-muted"}>{truncateDescription(podcast.description)}</p>
                                    <Link to={`/podcast/details/${podcast.id}`}
                                          className={"link text-decoration-none p-0 m-0"}>See more</Link>
                                </div>
                            </div>
                        </div>)
                    })
                }
            </div>
            <h3>Tending Podcasts</h3>
            <div className={"ps-0 mt-4 card-group"}>
                {
                    trendingPodcasts.map((podcast) => {
                        return (<div key={podcast.podcastId}>
                            <div className={"card m-2"} style={{width: '15rem'}}>
                                <img className={"card-img-top"} src={podcast.imageUrl} alt={podcast.title}/>
                                <div className={"card-body"}>
                                    <h6 className={"card-title"}>{podcast.title}</h6>
                                    <p className={"text-muted"}>{truncateDescription(podcast.description)}</p>
                                    <Link to={`/podcast/details/${podcast.id}`}
                                          className={"link text-decoration-none p-0 m-0"}>See more</Link>
                                </div>
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    );
};

export default Homepage;