import axios from 'axios';
const REVIEWS_API = 'http://localhost:4000/api/reviews';

export const createReview = async (review) => {
    const response = await axios.post(REVIEWS_API, review)
    return response.data;
}

export const findAllReviews = async () => {
    const response = await axios.get(REVIEWS_API);
    const reviews = response.data;
    return reviews || 0;
}

export const findReviewById = async (review) => {
    const response = await axios.get(`${REVIEWS_API}/${review._id}`, review);
    const reviews = response.data;
    return reviews;
}

export const findReviewsByPodcastId = async (podcastId) => {
    const response = await axios.get(`${REVIEWS_API}/podcast/${podcastId}`, podcastId);
    const reviews = response.data;
    return reviews;
}

export const deleteReview = async (review) => {
    const response = await axios
        .delete(`${REVIEWS_API}/${review._id}`);
    return response.data;
}
export const updateReview = async (review) => {
    const response = await axios.put(`${REVIEWS_API}/${review._id}`, review);
    return response.data;
}