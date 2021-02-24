import express from 'express'
import mongoose from 'mongoose'
const app = express()
const port = 3001
require('dotenv/config')
import bodyParser from 'body-parser'


app.use(bodyParser.json())
const users = require('./src/api/users/controller')
const posts = require('./src/api/posts/controller')

app.use('/api', users)
app.use('/api/posts', posts)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('database connected successfully...!'))
app.listen(port, () => console.log('server connected successfully ' + port))




