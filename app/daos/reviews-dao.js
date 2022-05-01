import reviewsModel from '../models/review.model.js'

const findAllReviews = () => {
    return reviewsModel.find()
}

const updateReview = async (id, review) => {
    // update
    return reviewsModel.updateOne(
        {_id: id},
        {$set: review}
    )
}

const findReviewById = (id) => {
    return reviewsModel.findById(id)
}

const findReviewsByPodcastId = (podcastId) => {
    return reviewsModel.find({"podcastId": podcastId})
}

const deleteReview = (id) => {
    return reviewsModel.deleteOne({_id: id})
}

const createReview = (review) => {
    return reviewsModel.insertMany(review)
}

export default {
    findReviewById, deleteReview, updateReview, findAllReviews, createReview, findReviewsByPodcastId
}