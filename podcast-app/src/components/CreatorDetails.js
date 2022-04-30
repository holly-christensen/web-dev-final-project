import React, {useState} from 'react';
import {findCreatorByUserId} from "../actions/creator-actions";
import {useDispatch, useSelector} from "react-redux";


const CreatorDetails = (user) => {
    //console.log(user.user._id)
    //const creators = useSelector((state) => state.creators);
    //let [creator, setCreator] = useState('');
    const dispatch = useDispatch();

    const findCreator = async () => {
        await findCreatorByUserId(dispatch, userId)
    }

    let userId = user.user._id
    console.log(userId)
    //findCreator()
    //console.log(result)
    //console.log(creators)
    return (
        <div>
            <h1>Creator Details</h1>
        </div>
    );
};

export default CreatorDetails;