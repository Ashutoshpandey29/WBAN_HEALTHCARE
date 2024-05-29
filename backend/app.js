require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
var cors = require('cors')

const userRoutes = require('./Routes/User')
// const TARoutes = require('./Routes/TAentry')
const homoRoutes = require('./Routes/Homo')
const mspauthRoutes = require('./Routes/MSPAuth')
const detectRoutes = require('./Routes/Detection')
const MURoutes = require('./Routes/MU')
const CSRoutes = require('./Routes/CS')
const MSPRoutes = require('./Routes/MSP')

app.use(cors())
app.use('/api/user',userRoutes)
app.use('/api/homo',homoRoutes)
app.use('/api/mspauth', mspauthRoutes)
app.use('/api/emergency', detectRoutes)
app.use('/api/mu', MURoutes)
app.use('/api/cs', CSRoutes)
app.use('/api/msp', MSPRoutes)

mongoose.connect(process.env.MONGO_URI)

.then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log("Running at port ",process.env.PORT)
  })
})
.catch((error)=>{
  console.log(error)
})