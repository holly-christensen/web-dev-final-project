import React, {useEffect, useState} from 'react';
import {findCreatorByUserId} from "../actions/creator-actions";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";


const CreatorDetails = (user) => {
    let [creator, setCreator] = useState('');
    const dispatch = useDispatch();

    useEffect(() => findCreator(), []);

   const findCreator = async () => {
       const current = await findCreatorByUserId(dispatch, userId)
       setCreator(current)
    }

    let userId = user.user._id
    return (
        <div>
            <h3>Creator Information</h3>
            <p><strong>Podcast Name: </strong>
                <Link to={`/podcasts/details/${creator.podcastId}`}>{creator.podcastName}</Link></p>
            <p><strong>Fun Fact: </strong>{creator.funFact}</p>
            <p><strong>Boring Fact: </strong>{creator.boringFact}</p>
        </div>
    );
};

export default CreatorDetails;