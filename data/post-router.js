const express = require('express')
const db = require('./db')

const router = express.Router();

router.post('/posts', (req, res) => {
    const post = req.body
    if (!post.title || !post.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.insert(post)
            .then(posts => {
                res.status(201).json(posts)
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
})

router.get('/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get('/posts/:id', (req, res) => {
    const id = req.params.id
    db.findById(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
})

router.get('/posts/:id/comments', (req, res) => {
    const id = req.params.id
    db.findPostComments(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(() => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})





module.exports = router; 