import usersDao  from '../daos/users-dao.js';

const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers()
    res.json(users)
}
const findUserById = async (req, res) => {
    const userId = req.params['id']
    const user = await usersDao.findUserById(userId)
    res.json(user)
}
const findUserByEmail = async (req, res) => {
    const email = req.params.email
    const user = await usersDao.findUserByEmail(email)
    res.json(user)
}
const findUserByCredentials = async (req, res) => {
    const crendentials = req.body
    const email = crendentials.email
    const password = crendentials.password
    const user = await usersDao.findUserByCredentials(email, password)
    if(user) {
        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    }
}
const createUser = async (req, res) => {
    const newUser = req.body
    const insertedUser = await usersDao.createUser(newUser)
    res.json(insertedUser)
}
const deleteUser = async (req, res) => {
    const userId = req.params.id
    const status = await usersDao.deleteUser(userId)
    res.json(status)
}
const updateUser = async (req, res) => {
    const userId = req.params.id
    const updatedUser = req.body
    const status = await usersDao.updateUser(
        userId,
        updatedUser
    )
    res.json(status)
}

const signup = async (req, res) => {
    const user = req.body
    const existingUser = await usersDao
        .findUserByEmail(user.email)
    if(existingUser) {
        res.sendStatus(403)
    } else {
        const actualUser = await usersDao
            .createUser(user)
        req.session['currentUser'] = actualUser
        res.json(actualUser)
    }
}

const signin = async (req, res) => {
    const existingUser = await usersDao
        .findUserByCredentials(req.body.email, req.body.password)
    if(existingUser) {
        req.session['currentUser'] = existingUser
        return res.send(existingUser)
    } else {
        return res.sendStatus(503)
    }
}

const profile = (req, res) => {
    const currentUser = req.session['currentUser']
    if(currentUser) {
        res.json(currentUser)
    } else {
        res.sendStatus(503)
    }
}

const signout = (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
}

 export default (app) =>  {
    app.post('/api/profile', profile)
    app.post('/api/signup', signup)
    app.post('/api/signin', signin)
    app.post('/api/signout', signout)
    app.get('/api/users', findAllUsers)
    app.get('/api/users/:id', findUserById)
    app.get('/api/users/email/:email', findUserByEmail)
    app.post('/api/users/credentials', findUserByCredentials)
    app.post('/api/users', createUser)
    app.delete('/api/users/:id', deleteUser)
    app.put('/api/users/:id', updateUser)
};