
const express = require('express')
const cors = require ('cors')
const db = require('./data/db')

const server = express()

server.use(cors())
server.use(express.json())

server.get('/api/users', handleDefault)

function handleDefault (req, res){
    res.json('Test passed!')
}

server.listen(process.env.port || 4000, ()=>{
    console.log('Listening on ' + (process.env.port || 4000))
})