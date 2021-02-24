import express from 'express';
const router = express.Router()
import { uploadPicture } from '../../services/multer'
import Posts from './model'
import requireLogin from '../middlewares/index'

router.post('/new-post', requireLogin, uploadPicture.single('postImage'), async (req, res) => {
    try {
        if (req.file) {
            req.body.postImage = `assets/posts/${req.file.filename}`
        }
        req.user.password = undefined
        req.body.postedBy = req.user
        const user = await Posts.create(req.body)
        user ? res.status(200).send({ success: true, message: 'Posted Successfully', data: user.view() }) : res.status(400).send({ success: false, message: 'Post Failed' })
    } catch (error) {
        res.status(400).send({ success: false, message: 'Failed' })
    }
})
router.get('/global-post', async (req, res) => {
    try {
        const post = await Posts.find().populate('postedBy')
        post ? res.status(200).send({ success: true, message: 'Post fetched Successfully..!', data: post }) : res.status(400).send({ success: false, message: 'Failed' })
    } catch (error) {
        res.status(400).send({ success: false, message: 'Failed' })
    }
})


module.exports = router