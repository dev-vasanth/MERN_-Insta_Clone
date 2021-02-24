import jwt from 'jsonwebtoken';
require('dotenv/config')
import mongoose from 'mongoose'
import Users from '../users/model'
module.exports = (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(400).send({ success: false, message: "You need to logged in" })
    }
    const token = authorization.replace("Bearer ", "")

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(400).send({ success: false, message: "You need to logged in" })
        }
        const { _id } = payload
        Users.findById(_id).then(usersData => {
            req.user = usersData
            next();
        })
    })
}