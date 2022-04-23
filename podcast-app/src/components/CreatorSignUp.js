import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {findAllCreators, createCreator} from "../actions/creator-actions";
import {getPodcastsBySearchTerm,} from "../useRequest";

const CreatorSignUp = () => {

        const initialCreatorDetails = {
            userId: "12345",
            podcastId: "",
            podcastName: "",
            funFact: "",
            boringFact: "",
        }

        const initialUserDetails = {
            username: "",
            password: "",
        }

        const initialErrors = {
            credentialsError: "",
            serverError: "",
        }

        const initialPodcastSearchDetails = {
            results: [],
            status: "",
            errorMsg: "",
            selectedPodcastId: "",
        }

        let [creatorDetails, setCreatorDetails] = useState(initialCreatorDetails);
        let [userDetails, setUserDetails] = useState(initialUserDetails);
        let [errors, setErrors] = useState(initialErrors);
        let [podcastSearchDetails, setPodcastSearchDetails] = useState(initialPodcastSearchDetails);
        // TODO i was checking to see if all the necessary inputs were filled before making a creator but it was buggy so i'm temporarily disabling it
        // let [submitIsDisabled, setSubmitIsDisabled] = useState(true)

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
            // checkIfSubmitIsValid();
        }

        const handleRadioOnChange = (result) => {
            setCreatorDetails({
                ...creatorDetails,
                podcastId: result.id,
                podcastName: result.title
            })
            // checkIfSubmitIsValid();
        }

        // const checkIfSubmitIsValid = () => {
        //     if (userDetails.username
        //         && userDetails.password
        //         && creatorDetails.podcastName
        //         && creatorDetails.podcastId
        //         && creatorDetails.userId) {
        //
        //         setSubmitIsDisabled(false)
        //     } else {
        //         setSubmitIsDisabled(true);
        //     }
        // }

// PODCHASER REQUEST
//         const [isSending, setIsSending] = useState(false)
//         const isMounted = useRef(true)

// set isMounted to false when we unmount the component
//         useEffect(() => {
//             return () => {
//                 isMounted.current = false
//             }
//         }, [])
//
//         const sendRequest = useCallback(async () => {
//             if (isSending) return
//             setIsSending(true)
//
//             const result = await getPodcastsBySearchTerm(creatorDetails.podcastName);
//             setPodcastSearchDetails({...podcastSearchDetails, results: result.podcasts.data})
//
//             // once the request is sent, update state again
//             if (isMounted.current) // only update if we are still mounted
//                 setIsSending(false)
//         }, [isSending, creatorDetails.podcastName]) // update the callback if the state changes
//

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
                <br/>

                <p>Find the podcast that you are a creator for</p>
                <label>Podcast Name
                    <input
                        value={creatorDetails.podcastName}
                        name={"podcastName"}
                        onChange={handleCreatorInputChange}>
                    </input>
                </label>
                <button
                    // onClick={sendRequest}
                >
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
                                {result.title}</div>)
                    })}
                </div>
                <br/>
                <button onClick={createCreatorHandler}>
                    Submit
                </button>
            </div>
        );
    }
;

export default CreatorSignUp;
