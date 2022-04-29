import React, {useCallback, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createCreator} from "../actions/creator-actions";
import {useProfile} from "../contexts/profile-context";
import {getPodcastsBySearchTerm} from "../useRequest";

const CreatorSignUp = () => {
    let {profile, signout} = useProfile()

    const initialPodcastSearchDetails = {
        results: [],
        status: "",
        errorMsg: "",
        selectedPodcastId: "",
    }

    const initialCreatorDetails = {
        userId: profile._id,
        podcastId: "",
        podcastName: "",
        funFact: "",
        boringFact: "",
    }

    const searchRef = useRef()
    let [searchTerm, setSearchTerm] = useState('')
    let [creatorDetails, setCreatorDetails] = useState(initialCreatorDetails);
    let [podcastSearchDetails, setPodcastSearchDetails] = useState(initialPodcastSearchDetails);

    const creators = useSelector((state) => state.creators);

    const dispatch = useDispatch();

    const sendRequest = useCallback(async () => {
        // if (isSending) return
        // setIsSending(true)

        setSearchTerm(searchRef.current.value)
        const result = await getPodcastsBySearchTerm(searchTerm);
        console.log(result)
        setPodcastSearchDetails({...podcastSearchDetails, results: result.podcasts.data})

        // once the request is sent, update state again
        // if (isMounted.current) // only update if we are still mounted
        //     setIsSending(false)
    }, []) // update the callback if the state changes

    const handleRadioOnChange = (result) => {
        setCreatorDetails({
            ...creatorDetails,
            podcastId: result.id,
            podcastName: result.title
        })
        //checkIfSubmitIsValid();
    }


    return(
        <div>
            <h1>Creator Sign Up</h1>
            <p>Find the podcast that you are a creator for</p>
            <label>Podcast Name
                <input ref={searchRef}
                    defaultValue={searchTerm}
                    name={"podcastName"}>
                </input>
            </label>
            <button
                onClick={sendRequest}>
                Find Podcast
            </button>
            <div>
                {podcastSearchDetails.results.map((result) => {
                    return (
                        <div
                            key={result.id}
                        >
                            <input
                                onChange={() => {
                                    handleRadioOnChange(result)
                                }}
                                type={"radio"}
                                value={result.id}
                                name={"results"}/>
                            <div>
                                {result.title}
                                <img src={result.imageUrl} height="50"/>
                            </div>

                        </div>)
                })}
            </div>
        </div>
    );
}

export default CreatorSignUp;