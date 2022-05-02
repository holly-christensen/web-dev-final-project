import * as service from '../services/creator-service.js';

export const CREATE_CREATOR = 'CREATE_CREATOR';
export const FIND_ALL_CREATORS = 'FIND_ALL_CREATORS';
export const FIND_CREATOR_BY_ID = 'FIND_CREATOR_BY_ID';
export const FIND_CREATOR_BY_USERID = 'FIND_CREATOR_BY_ID';
export const UPDATE_CREATOR = 'UPDATE_CREATOR';
export const DELETE_CREATOR = 'DELETE_CREATOR';

export const createCreator = async (dispatch, creatorDetails) => {
    const newCreator = {
        userId: creatorDetails.userId,
        username: creatorDetails.username,
        podcastId: creatorDetails.podcastId,
        podcastName: creatorDetails.podcastName,
        funFact: creatorDetails.funFact,
        boringFact: creatorDetails.boringFact,
    }
    const creator = await service.createCreator(newCreator);
    dispatch({
        type: CREATE_CREATOR,
        creator,
    });
}
export const findAllCreators = async (dispatch) => {
    const creators = await service.findAllCreators();
    dispatch({
        type: FIND_ALL_CREATORS,
        creators
    });
}
export const findCreatorById = async (dispatch, creatorId) => {
    const creator = await service.findCreatorById(creatorId);
    dispatch({
        type: FIND_CREATOR_BY_ID,
        creator
    });
}

export const findCreatorByUserId = async (dispatch, userId) => {
    const creator = await service.findCreatorByUserId(userId);
    dispatch({
        type: FIND_CREATOR_BY_USERID,
        creator
    });
    return creator;
}

export const updateCreator = async (dispatch, creator) => {
    const status = await service.updateCreator(creator);
    dispatch({
        type: UPDATE_CREATOR,
        creator
    });
}
export const deleteCreator = async (dispatch, creator) => {
    const response = await service.deleteCreator(creator);
    dispatch({
        type: DELETE_CREATOR,
        creator
    })
}