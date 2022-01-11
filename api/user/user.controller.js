const userService = require('./user.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getUser(req, res) {
    try {
        const user = await userService.getById(req.params.id)
        res.send(user)
    } catch (err) {
        logger.error('Failed to get user', err)
        res.status(500).send({ err: 'Failed to get user' })
    }
}

async function getUsers(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            minBalance: +req.query?.minBalance || 0
        }
        const users = await userService.query(filterBy)
        res.send(users)
    } catch (err) {
        logger.error('Failed to get users', err)
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function deleteUser(req, res) {
    try {
        await userService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete user', err)
        res.status(500).send({ err: 'Failed to delete user' })
    }
}

async function updateUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.update(user)
        res.send(savedUser)
    } catch (err) {
        logger.error('Failed to update user', err)
        res.status(500).send({ err: 'Failed to update user' })
    }
}

async function addPendingOrder(req,res) {
    // console.log('hrtr')
    // console.log(req.params.orderId)
    // console.log(req.params, req.body)
    try {
        const user = await userService.getById(req.params.userId)
        // console.log('got user:', user)
        user.pendingOrders.unshift(req.params.orderId)
        const updatedUser = await userService.update(user)
        res.json(updatedUser)
        // console.log(updateUser)
      } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add reveiw' })
      }
    

}

async function clearPendingOrders(req,res) {
    try {
        const user = await userService.getById(req.params.userId)
        user.pendingOrders = []
        const updatedUser = await userService.update(user)
        res.json(updatedUser)
        // console.log(updateUser)
      } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add reveiw' })
      }
}


module.exports = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
    addPendingOrder,
    clearPendingOrders
}