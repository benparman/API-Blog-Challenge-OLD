'use strict';
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

BlogPosts.create('First Post','This is my first blog post!','Ben','2018-04-25');
BlogPosts.create('Post 2','2 is better than 1','Rachel','NOW');
BlogPosts.create('THREE!','Third time\'s a charm','ThreeAmigos','Future');


//--------------------------------------------------------------------------------
router.route('/')
  .get((req, res) => {
    res.json(BlogPosts.get());
  })
  .post(jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'publishDate'];
    for (let i=0; i<requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }
    const post = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(post);
  });
router.route('/:id').put(jsonParser, (req, res) => {
  const requiredFields = ['id', 'title', 'content', 'author', 'publishDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `Request path id (\`${req.params.id}\`) and request body id (\`${req.body.id}\`) must match!`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post \`${req.params.id}\``);
  BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(201).end();
})
  .delete((req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted post #\`${req.params.id}\``);
    res.status(204).end();
  });


module.exports = router;