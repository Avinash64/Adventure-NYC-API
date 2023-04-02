require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to database"))

app.use(express.json());

const userRouter = require('./routes/users')
app.use('/users', userRouter)

const profileSettingsRouter = require('./routes/profilesettings.js')
app.use('/profilesettings', profileSettingsRouter)

const postRouter = require('./routes/post')
app.use('/post', postRouter)

const friendRouter = require('./routes/friends')
app.use('/friends', friendRouter)

const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

const checkpoints = require('./routes/checkpoints')
app.use('/checkpoints', checkpoints)

app.listen(port, () => {
  console.log(`localhost:${port}`)
})