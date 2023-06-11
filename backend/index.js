require("dotenv").config();
const express = require("express")
const cors = require('cors')
require('./connection/connection')
const app = express()

app.use(express.json())
app.use( cors())

const todoRouter = require('./routes/todoRoute')
app.use('/',todoRouter)

// require('./connection/server')

app.listen(5000,()=>{
   console.log("your app is running on port 5000")
})

module.exports= app