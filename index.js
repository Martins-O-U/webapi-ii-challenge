const express = require('express')
const postRouter = require('./data/post-router')

const server = express();

server.use(express.json());
server.use('/api', postRouter)

server.get('/', (req, res) => {
    res.status(200).json({ message: "hello"})
})

server.listen(process.env.port || 4000, () => {
    console.log('Listening on '+ (process.env.port || 4000))
})