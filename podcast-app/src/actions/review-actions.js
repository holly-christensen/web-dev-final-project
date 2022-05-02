import * as service from '../services/review-service.js';

export const CREATE_REVIEW = 'CREATE_REVIEW';
export const FIND_ALL_REVIEWS = 'FIND_ALL_REVIEWS';
export const FIND_REVIEW_BY_ID = 'FIND_REVIEW_BY_ID';
export const UPDATE_REVIEW = 'UPDATE_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const FIND_REVIEWS_BY_PODCAST_ID = 'FIND_REVIEWS_BY_PODCAST_ID';

export const createReview = async (dispatch, reviewContent, podcastId, userId, username) => {
    const newReview = {
        podcastId: podcastId,
        userId: userId,
        username: username,
        rating: reviewContent.rating,
        title: reviewContent.title,
        body: reviewContent.body,
        datePosted: new Date().toLocaleDateString() + "",
    }
    const review = await service.createReview(newReview);
    dispatch({
        type: CREATE_REVIEW,
        review: review
    });
    return review;
}
export const findAllReviews = async (dispatch) => {
    const reviews = await service.findAllReviews();
    dispatch({
        type: FIND_ALL_REVIEWS,
        reviews
    });
}
export const findReviewsByPodcastId = async (dispatch) => {
    const reviews = await service.findReviewsByPodcastId();
    dispatch({
        type: FIND_REVIEWS_BY_PODCAST_ID,
        reviews
    });
}
export const findReviewById = async (dispatch, reviewId) => {
    const review = await service.findReviewById(reviewId);
    dispatch({
        type: FIND_REVIEW_BY_ID,
        review
    });
    return review;
}

export const updateReview = async (dispatch, review) => {
    const status = await service.updateReview(review);
    dispatch({
        type: UPDATE_REVIEW,
        review
    });
}
export const deleteReview = async (dispatch, review) => {
    const response = await service.deleteReview(review);
    dispatch({
        type: DELETE_REVIEW,
        review
    })
}