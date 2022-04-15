import podcastsModel from '../models/podcast.model.js'

const findAllPodcasts = () => {
    return podcastsModel.find()
}
const findPodcastById = (id) => {
    return podcastsModel.findById(id)
}

const findPodcastByPodcastId = (podcastId) => {
    return podcastsModel.findOne({podcastId})
}
const createPodcast = (podcast) => {
    return podcastsModel.create(podcast)
}
const deletePodcast = (id) => {
    return podcastsModel.deleteOne({_id: id})
}
const updatePodcast = (id, updatedPodcast) => {
    return podcastsModel.updateOne(
        {_id: id},
        {$set: updatedPodcast}
    )
}

export default {
    findAllPodcasts, findPodcastById,
    findPodcastByPodcastId, createPodcast, deletePodcast,
    updatePodcast
}