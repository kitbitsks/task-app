const express = require('express')
require('./db/mongoose.js')
const userRouter = require('../src/routers/user')
const taskRouter = require('../src/routers/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log("Server running on Port "+ port)
})