import podcastsDao  from '../daos/podcasts-dao.js';

const findAllPodcasts = async (req, res) => {
    const podcasts = await podcastsDao.findAllPodcasts()
    res.json(podcasts)
}
const findPodcastById = async (req, res) => {
    const podcastId = req.params['id']
    const podcast = await podcastsDao.findPodcastById(podcastId)
    res.json(podcast)
}
const findPodcastByPodchaserId = async (req, res) => {
    const podcastId = req.params['id']
    const podcast = await podcastsDao.findPodcastByPodchaserId(podcastId)
    res.json(podcast)
}

const createPodcast = async (req, res) => {
    const newPodcast = req.body
    const insertedPodcast = await podcastsDao.createPodcast(newPodcast)
    res.json(insertedPodcast)
}
const deletePodcast = async (req, res) => {
    const podcastId = req.params.id
    const status = await podcastsDao.deletePodcast(podcastId)
    res.json(status)
}
const updatePodcast = async (req, res) => {
    const podcastId = req.params.id
    const updatedPodcast = req.body
    const status = await podcastsDao.updatePodcast(
        podcastId,
        updatedPodcast
    )
    res.json(status)
}

const upsertPodcastByPodchaserId = async (req, res) => {
    const podcastId = req.params.id
    const updatedPodcast = req.body
    const status = await podcastsDao.upsertPodcastByPodchaserId(
        podcastId,
        updatedPodcast
    )
    res.json(status)
}

export default (app) =>  {
    app.get('/api/podcasts', findAllPodcasts)
    app.get('/api/podcasts/:id', findPodcastById)
    app.get('/api/podcasts/podchaser/:id', findPodcastByPodchaserId)
    app.post('/api/podcasts', createPodcast)
    app.delete('/api/podcasts/:id', deletePodcast)
    app.put('/api/podcasts/:id', updatePodcast)
    app.put('/api/podcasts/podchaser/:id', upsertPodcastByPodchaserId)
};