'use strict';
const express = require('express');
// const router = express.router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

BlogPosts.create('First Post','This is my first blog post!','Ben','2018-04-25');

app.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});