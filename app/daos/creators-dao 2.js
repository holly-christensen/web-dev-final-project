import creatorsModel from '../models/creator.model.js'

const findAllCreators = () => {
    return creatorsModel.find()
}
const findCreatorById = (id) => {
    return creatorsModel.findById(id)
}

const findCreatorByUserId = (userId) => {
    return creatorsModel.findOne({"userId": userId})
}

const createCreator = (creator) => {
    return creatorsModel.create(creator)
}
const deleteCreator = (id) => {
    return creatorsModel.deleteOne({_id: id})
}
const updateCreator = (id, updatedCreator) => {
    return creatorsModel.updateOne(
        {_id: id},
        {$set: updatedCreator}
    )
}

export default {
    findAllCreators, findCreatorById, createCreator, deleteCreator,
    updateCreator, findCreatorByUserId
}