import React, {useEffect, useState} from 'react';
import {findAllCreators, findCreatorByUserId} from "../actions/creator-actions";
import {useDispatch, useSelector} from "react-redux";


const CreatorDetails = (user) => {
    console.log(user.user._id)
    const creators = useSelector((state) => state.creators);
    let [creator, setCreator] = useState('');
    const dispatch = useDispatch();

    useEffect(() => findCreator(), []);

   const findCreator = async () => {
       const current = await findCreatorByUserId(dispatch, userId)
       console.log(current)
       setCreator(current)
    }

    let userId = user.user._id
    console.log(userId)
    //findCreator()
    //console.log(result)
    console.log(creator)
    //console.log(creators)
    return (
        <div>
            <h1>Creator Details</h1>
            {creator.funFact}
        </div>
    );
};

export default CreatorDetails;