import axios from 'axios';
const CREATORS_API = 'http://localhost:4000/api/creators';

export const createCreator = async (creator) => {
    const response = await axios.post(CREATORS_API, creator)
    return response.data;
}

export const findAllCreators = async () => {
    const response = await axios.get(CREATORS_API);
    const creators = response.data;
    return creators;
}

export const findCreatorById = async (creator) => {
    const response = await axios.get(`${CREATORS_API}/${creator._id}`, creator);
    const creators = response.data;
    return creators;
}

export const findCreatorByUserId = async (creator) => {
    const response = await axios.get(`${CREATORS_API}/user/${creator}`, creator);
    const creators = response.data;
    return creators;
}

export const deleteCreator = async (creator) => {
    const response = await axios
        .delete(`${CREATORS_API}/${creator._id}`);
    return response.data;
}
export const updateCreator = async (creator) => {
    const response = await axios.put(`${CREATORS_API}/${creator._id}`, creator);
    return response.data;
}