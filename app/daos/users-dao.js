import usersModel from '../models/user.model.js'

const findAllUsers = () => {
    return usersModel.find()
}
const findUserById = (id) => {
    return usersModel.findById(id)
}
const findUserByEmail = (email) => {
    return usersModel.findOne({email})
}
const findUserByCredentials = (email, password) => {
    return usersModel.findOne({email, password})
}
const createUser = (user) => {
    return usersModel.create(user)
}
const deleteUser = (id) => {
    return usersModel.deleteOne({_id: id})
}
const updateUser = (id, updatedUser) => {
    return usersModel.updateOne(
        {_id: id},
        {$set: updatedUser}
    )
}

export default {
    findAllUsers, findUserById, findUserByEmail,
    findUserByCredentials, createUser, deleteUser,
    updateUser
}