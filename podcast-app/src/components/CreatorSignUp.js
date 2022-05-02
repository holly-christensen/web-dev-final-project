import React, {useCallback, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createCreator} from "../actions/creator-actions";
import {useProfile} from "../contexts/profile-context";
import {getPodcastsBySearchTerm} from "../useRequest";
import {updateUser} from "../services/user-service";
import userProfile from "./UserProfile";
import {useNavigate} from "react-router-dom";

const CreatorSignUp = () => {
    let {profile, signout, upgradeUserToCreator, checkLoggedIn} = useProfile()

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

    const navigate = useNavigate()

    const searchRef = useRef()
    const funFactRef = useRef()
    const boringFactRef = useRef()
    let [searchTerm, setSearchTerm] = useState('')
    let [creatorDetails, setCreatorDetails] = useState(initialCreatorDetails);
    let [podcastSearchDetails, setPodcastSearchDetails] = useState(initialPodcastSearchDetails);

    const creators = useSelector((state) => state.creators);

    const dispatch = useDispatch();

    const sendRequest = useCallback(async () => {
        // if (isSending) return
        // setIsSending(true)

        setSearchTerm(searchRef.current.value)
        const result = await getPodcastsBySearchTerm(searchRef.current.value);
        setPodcastSearchDetails({...podcastSearchDetails, results: result.podcasts.data})

        // once the request is sent, update state again
        // if (isMounted.current) // only update if we are still mounted
        //     setIsSending(false)
    }, []) // update the callback if the state changes

    const updateUserToCreator = () => {
        const updatedUser = {
            ...profile,
            type: "USER_CREATOR"
        }
        updateUser(updatedUser).then(r => profile = r)
    }

    const createCreatorHandler = async () => {
        const details = {
            ...creatorDetails,
            funFact: funFactRef.current.value,
            boringFact: boringFactRef.current.value,
            userId: profile._id,
            username: profile.credentials.username
        }
        createCreator(dispatch, details)
            .then(r => setCreatorDetails(details));
        updateUserToCreator()

        navigate('/profile')
    }

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
            <div className="row">
                <div className="col-9">
                    <label>Fun Fact
                        <input ref={funFactRef}
                               placeholder="fun fact"
                               type="text"
                               className="form-control"/>
                    </label>
                    <br></br>
                    <label>Boring Fact
                        <input ref={boringFactRef}
                               placeholder="boring fact"
                               type="text"
                               className="form-control"/>
                    </label>
                    <br></br> <br></br>
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
                                <div key={result.id}>
                                    <input
                                        onChange={() => {
                                            handleRadioOnChange(result)
                                        }}
                                        type={"radio"}
                                        value={result.id}
                                        name={"results"}/>
                                    <div className="row">
                                        <img className="col-2" src={result.imageUrl}/>
                                        <div className="col-10">
                                            <strong>{result.title}</strong>
                                            <p>{result.description}</p>
                                        </div>
                                        <br></br>
                                    </div>
                                </div>)
                        })}
                    </div>
                </div>
                <div className="col-1">
                    {creatorDetails.podcastId &&
                        <div>
                            <button className="btn btn-primary" onClick={createCreatorHandler}>Register</button>
                        </div>}
                </div>
            </div>
        </div>
    );
}

export default CreatorSignUp;