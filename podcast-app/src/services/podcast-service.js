import axios from 'axios';
const PODCASTS_API = 'http://localhost:4000/api/podcasts';

export const createPodcast = async (podcast) => {
    const response = await axios.post(PODCASTS_API, podcast)
    return response.data;
}

export const findAllPodcasts = async () => {
    const response = await axios.get(PODCASTS_API);
    const podcasts = response.data;
    return podcasts;
}

export const findPodcastById = async (podcast) => {
    const response = await axios.get(`${PODCASTS_API}/${podcast._id}`, podcast);
    const podcasts = response.data;
    return podcasts;
}
export const findPodcastByPodchaserId = async (podcastId) => {
    const response = await axios.get(`${PODCASTS_API}/podchaser/${podcastId}`, podcastId);
    const podcasts = response.data;
    return podcasts;
}

export const deletePodcast = async (podcast) => {
    const response = await axios
        .delete(`${PODCASTS_API}/${podcast._id}`);
    return response.data;
}
export const updatePodcast = async (podcast) => {
    const response = await axios.put(`${PODCASTS_API}/${podcast._id}`, podcast);
    return response.data;
}

export const upsertPodcastByPodchaserId = async (podcast) => {
    const response = await axios.put(`${PODCASTS_API}/podchaser/${podcast}`, podcast);
    return response.data;
}