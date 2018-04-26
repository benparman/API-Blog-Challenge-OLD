'use strict';
const express = require('express');
const blogPostRouter = require('./blogPostRouter');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));
app.use('/blog-posts', blogPostRouter);




app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});