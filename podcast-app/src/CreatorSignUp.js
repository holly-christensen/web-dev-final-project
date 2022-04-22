import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {findAllCreators, createCreator} from "./actions/creator-actions";
import {getPodcastsBySearchTerm,} from "./useRequest";

const CreatorSignUp = () => {

    const initialCreatorDetails = {
        userId: '',
        podcastId: '',
        podcastName: '',
        funFact: '',
        boringFact: '',
    }

    const initialUserDetails = {
        username: '',
        password: '',
    }

    const initialErrors = {
        credentialsError: null,
        serverError: null,
    }

    const initialPodcastSearchDetails = {
        results: [],
        status: null,
        errorMsg: null,
        selectedPodcastId: null,
    }

    let [creatorDetails, setCreatorDetails] = useState(initialCreatorDetails);
    let [userDetails, setUserDetails] = useState(initialUserDetails);
    let [errors, setErrors] = useState(initialErrors);
    let [podcastSearchDetails, setPodcastSearchDetails] = useState(initialPodcastSearchDetails);

    const creators = useSelector((state) => state.creators);

    const dispatch = useDispatch();

    const createCreatorHandler = () => {
        createCreator(dispatch, creatorDetails)
            .then(r => setCreatorDetails(initialCreatorDetails));
    }

    const handleCreatorInputChange = (event) => {
        const value = event.target.value;
        setCreatorDetails({
            ...creatorDetails,
            [event.target.name]: value
        });
    }

    const handleUserInputChange = (event) => {
        const value = event.target.value;
        setUserDetails({
            ...userDetails,
            [event.target.name]: value
        });
    }

    const handleVerifyUserDetails = () => {
        // get the username and password from the state
        // make a query to get the _id of that user
        // if it fails, set the credentialsError to that message and display it
    }

    const handleRadioOnChange = (event) => {
        const id = event.target.key;
        const name = event.target.value;
        setCreatorDetails({
            ...creatorDetails,
            podcastId: id,
            podcastName: name
        })
    }

    const [isSending, setIsSending] = useState(false)
    const isMounted = useRef(true)

    // set isMounted to false when we unmount the component
    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    const sendRequest = useCallback(async () => {
        if (isSending) return
        setIsSending(true)

        const result = await getPodcastsBySearchTerm(creatorDetails.podcastName);
        setPodcastSearchDetails({...podcastSearchDetails, results: result.podcasts.data})

        // once the request is sent, update state again
        if (isMounted.current) // only update if we are still mounted
            setIsSending(false)
    }, [isSending, creatorDetails.podcastName]) // update the callback if the state changes


    return (
        <div>
            <h1>Creator Sign Up</h1>
            <p>You must already have a User account to become a creator. Create a User account <a>here</a>.</p>
            <ul>
                {/*{JSON.stringify(creators)}*/}
            </ul>
            <h2>Become a Creator</h2>
            <div>{JSON.stringify(creatorDetails)}</div>

            <p>Enter the username and password for your existing User account.</p>
            <label>Username
                <input
                    value={creatorDetails.username}
                    name={"username"}
                    onChange={handleUserInputChange}>
                </input>
            </label>
            <br/>
            <label>Password
                <input value={creatorDetails.password}
                       name={"password"}
                       type={"password"}
                       onChange={handleUserInputChange}>
                </input>
            </label>
            <button
                onClick={handleVerifyUserDetails}>
                Verify Credentials
            </button>
            <br/>

            <p>Find the podcast that you are a creator for</p>
            <label>Podcast Name
                <input value={creatorDetails.podcastName}
                       name={"podcastName"}
                       onChange={handleCreatorInputChange}>
                </input>
            </label>
            <button
                onClick={sendRequest}>
                Find Podcast
            </button>
            <div onChange={handleRadioOnChange}>
                {podcastSearchDetails.results.map((result) => {
                    return (
                        <div key={result.id}>
                            <input
                                type={"radio"}
                                value={result.title}
                                name={"results"}/>
                            {result.title}</div>)
                })}
            </div>
            <br/>
            <button onClick={createCreatorHandler}>
                Submit
            </button>
        </div>
    );
};

export default CreatorSignUp;
