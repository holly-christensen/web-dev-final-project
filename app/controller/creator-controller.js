import creatorsDao  from '../daos/creators-dao.js';

const findAllCreators = async (req, res) => {
    const creators = await creatorsDao.findAllCreators()
    res.json(creators)
}
const findCreatorById = async (req, res) => {
    const creatorId = req.params['id']
    const creator = await creatorsDao.findCreatorById(creatorId)
    res.json(creator)
}

const findCreatorByUserId = async (req, res) => {
    const userId = req.params['id']
    const creator = await creatorsDao.findCreatorByUserId(userId)
    res.json(creator)
}

const createCreator = async (req, res) => {
    const newCreator = req.body
    const insertedCreator = await creatorsDao.createCreator(newCreator)
    res.json(insertedCreator)
}
const deleteCreator = async (req, res) => {
    const creatorId = req.params.id
    const status = await creatorsDao.deleteCreator(creatorId)
    res.json(status)
}
const updateCreator = async (req, res) => {
    const creatorId = req.params.id
    const updatedCreator = req.body
    const status = await creatorsDao.updateCreator(
        creatorId,
        updatedCreator
    )
    res.json(status)
}

export default (app) =>  {
    app.get('/api/creators', findAllCreators)
    app.get('/api/creators/:id', findCreatorById)
    app.post('/api/creators', createCreator)
    app.delete('/api/creators/:id', deleteCreator)
    app.put('/api/creators/:id', updateCreator)
    app.get('/api/creators/user/:id', findCreatorByUserId)
};