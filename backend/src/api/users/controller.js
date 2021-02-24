import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import Users from './model'
import jwt from 'jsonwebtoken'
require('dotenv/config')
import  requireLogin  from '../middlewares/index'


router.post('/signup', async (req, res) => {
    try {
        const emailExist = await Users.findOne({ email: req.body.email })
        if (emailExist) return res.status(400).send({ success: false, message: 'Email Already Exist...!' })
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashPassword
        const user = await Users.create(req.body)
        user ? res.status(200).send({ success: true, message: 'Signup Succcessfully' }) :
            res.status(400).send({ success: true, message: 'Signup failed' })
    } catch (error) {
        res.status(400).send({ success: true, message: 'Signup failed' })
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email, !password) {
            return res.status(400).send({ success: false, message: 'All Fields Required' })
        }
        const emailExist = await Users.findOne({ email: req.body.email })
        if (!emailExist) {
            return res.status(400).send({ success: false, message: 'Email Not Registered' })
        }
        const user = await Users.findOne({ email: email })
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (validPassword) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                res.status(200).send({ success: true, message: 'signin Successfully', data: token })
            } else {
                res.status(400).send({ success: true, message: 'email and password combination not match' })
            }
        }
    } catch (error) {
        res.status(400).send({ success: true, message: 'Signin failed' })

    }
})

router.get('/get', requireLogin, (req, res) => {
    res.send('hello')
})



module.exports = router