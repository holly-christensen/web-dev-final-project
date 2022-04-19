import * as service from '../services/creator-service.js';

export const CREATE_CREATOR = 'CREATE_CREATOR';
export const FIND_ALL_CREATORS = 'FIND_ALL_CREATORS';
export const FIND_CREATOR_BY_ID = 'FIND_CREATOR_BY_ID';
export const UPDATE_CREATOR = 'UPDATE_CREATOR';
export const DELETE_CREATOR = 'DELETE_CREATOR';

export const createCreator = async (dispatch, creatorDetails) => {
    const creator = await service.createCreator(creatorDetails);
    dispatch({
        type: CREATE_CREATOR,
        creator: creator
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