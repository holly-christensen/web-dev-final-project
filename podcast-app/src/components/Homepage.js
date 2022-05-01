import React, {useEffect, useState} from 'react';
import {useProfile} from "../contexts/profile-context";
import {getPodcastsById} from "../useRequest";
import {Link} from "react-router-dom";

const Homepage = () => {

    let {profile} = useProfile();

    let [followedPodcasts, setFollowedPodcasts] = useState([])

    useEffect(() => {
        console.log("set followed podcasts: " + JSON.stringify(followedPodcasts));
    }, [followedPodcasts]);


    useEffect(() => {
        if (profile !== null) {
            getFollowedPodcasts()
        }
    }, []);

    const getFollowedPodcasts = async () => {
        const podcastPochaserIds = profile.following;
        let newPodcasts = [];

        if (podcastPochaserIds) {
            await Promise.all(podcastPochaserIds.map(async (pod) => {
                const details = await getPodcastsById(pod.podcastId);
                console.log(details)
                newPodcasts.push(details.podcast);
            }));
        }
        setFollowedPodcasts(newPodcasts);
    }

    return (
        <div>
            <h1>Homepage</h1>
            <h3>Tending Podcasts</h3>
            <h3>Podcasts you follow</h3>
            <ul className={"ps-0 mt-4"}>
                {
                    followedPodcasts.map((podcast) => {
                        return (<li>
                            <div className={"card"} style={{ width: '15rem'}}>
                                <img className={"card-img-top"} src={podcast.imageUrl} alt={podcast.title}/>
                                <div className={"card-body"}>
                                    <h6 className={"card-title"}>{podcast.title}</h6>
                                    <p className={"card-text"}>{podcast.description}</p>
                                    <Link to={`/podcast/details/${podcast.id}`} className={"btn btn-primary"}>Go</Link>
                                </div>
                            </div>
                        </li>)
                    })
                }
            </ul>
        </div>
    );
};

export default Homepage;