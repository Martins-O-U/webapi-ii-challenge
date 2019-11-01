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

router.post('/posts/:id/comments', (req, res) => {
    const { id } = req.params;
  
    const newComment = {
      text: req.body.text.trim(),
      post_id: id
    };
  
    if (!newComment.text) {
      return res.status(400).json({
        error: 'Please provide text for the comment.'
      });
    }
  
    db.insertComment(newComment)
      .then(data => {
        return data
          ? res.status(200).json(data)
          : res.status(404).json({
              message: 'The post with the specified ID does not exist.'
            });
      })
      .catch(() => {
        return res.status(500).json({
          error: 'There was an error while saving the comment to the database'
        });
      });
  });
  


router.delete('/posts/:id', (req, res) => {
    const id = req.params.id
    
    db.remove(id)
    .then(post => {
        if (post) {
            res.json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(() => {
        res.status(500).json({ error: "The post could not be removed" })
    })
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
    db.findById(req.params.id)
        .then(post => {
            if (post.length > 0) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    success: false,
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: "The post information could not be retrieved.",
                error
            })
        })
})

router.put('/posts/:id', (req, res) => {
    const id = req.params.id;
    const edited = req.body;

    if (!edited.title || !edited.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } 
    else {
        db.update(id, edited)
            .then(newData => {
                if (newData) {
                    res.status(200).json(newData)
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
            })
            .catch(() => {
                res.status(500).json({ error: "The post information could not be modified." })
            })
    }
})

router.get('/posts/:id/comments', (req, res) => {
    const { id } = req.params
    db.findCommentById(id)
        .then(data => {
            if (data.length > 0) {
                res.status(200).json(data)                           
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `The post with the specific does not exist.`
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                success: false,
                message: "The comments information could not be retrieved",
                error
            })
        })
})


module.exports = router; 