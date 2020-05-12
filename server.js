const express = require('express')
const cookie = require('cookie-parser')
const mongoose = require('mongoose')
const taskRouter = require('./routes/taskRoute')

const app = express()

const PORT = 5000

app.use(cookie())
app.use(express.json())

mongoose.connect(
  'mongodb://localhost:27017/full-stack-sandbox',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('📦 => database')
  }
)

app.use('/task', taskRouter)

app.use('/', (req, res) => {
  return res.status(200).json({ message: 'this is just a test route!' })
})

app.listen(PORT, () => {
  console.log(`🌎 => http server: ${PORT}`)
})
