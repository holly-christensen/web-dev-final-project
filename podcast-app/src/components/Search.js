import React, {useEffect, useRef, useState} from 'react';
import {useParams, useNavigate, Link} from "react-router-dom";
import {getPodcastsBySearchTerm} from "../useRequest";

const Search = () => {
    const [podcasts, setPodcasts] = useState([])
    const {searchString} = useParams()
    const titleRef = useRef()
    const navigate = useNavigate()
    useEffect(async () => {
        if (searchString) {
            titleRef.current.value = searchString
            const result = await getPodcastsBySearchTerm(searchString);
            setPodcasts(result.podcasts.data);
            navigate(`/podcasts/${titleRef.current.value}`)
        }
    }, [])

    const searchForPodcasts = async () => {
        navigate(`/podcasts/${titleRef.current.value}`)
        const result = await getPodcastsBySearchTerm(titleRef.current.value);
        setPodcasts(result.podcasts.data);
    }


    return (
        <div>
            <h1>Search</h1>
            {/*   SEARCH BAR   */}
            <div className={"d-flex"}>
                <input
                    ref={titleRef}
                    className="form-control"
                    type="search"
                    placeholder="Search podcasts"
                    aria-label="Search podcasts"/>
                <button
                    className="btn btn-outline-primary my-2 my-sm-0"
                    type="submit"
                    onClick={searchForPodcasts}
                >Search
                </button>
            </div>
            {/*   RESULTS   */}
            <ul className={"ps-0 mt-4"}>
                {
                    podcasts.map(podcast =>
                        <li className="list-group-item  align-items-start" key={podcast.id}>
                            <Link to={`/podcasts/details/${podcast.id}`} className="d-flex align-items-center text-decoration-none">
                                <img src={podcast.imageUrl} alt={podcast.title}
                                     height={60}/>
                                <div className="ms-3">
                                    <p className="text-black fw-bold mb-1">{podcast.title}</p>
                                    <p className="text-muted mb-0">{podcast.description}</p>
                                </div>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </div>
    );
};

export default Search;