import reviewsDao  from '../daos/reviews-dao.js';

const findAllReviews = async (req, res) => {
    const reviews = await reviewsDao.findAllReviews()
    res.json(reviews)
}
const findReviewById = async (req, res) => {
    const reviewId = req.params['id']
    const review = await reviewsDao.findReviewById(reviewId)
    res.json(review)
}

const findReviewsByPodcastId = async (req, res) => {
    const podcastId = req.params['id']
    const reviews = await reviewsDao.findReviewsByPodcastId(podcastId)
    res.json(reviews)
}

const createReview = async (req, res) => {
    const newReview = req.body
    const insertedReview = await reviewsDao.createReview(newReview)
    res.json(insertedReview)
}
const deleteReview = async (req, res) => {
    const reviewId = req.params.id
    const status = await reviewsDao.deleteReview(reviewId)
    res.json(status)
}
const updateReview = async (req, res) => {
    const reviewId = req.params.id
    const updatedReview = req.body
    const status = await reviewsDao.updateReview(
        reviewId,
        updatedReview
    )
    res.json(status)
}

export default (app) =>  {
    app.get('/api/reviews', findAllReviews)
    app.get('/api/reviews/:id', findReviewById)
    app.get('/api/reviews/podcast/:id', findReviewsByPodcastId)
    app.post('/api/reviews', createReview)
    app.delete('/api/reviews/:id', deleteReview)
    app.put('/api/reviews/:id', updateReview)
};