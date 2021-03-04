const { urlencoded } = require('express');
const express = require('express')
const router = express.Router()
const db = require('../db/models');
const { Tweet } = db
const app = express()
app.use(express.json())
const {check, validationResult} = require('express-validator');

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next)

const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => error.msg);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    return next(err);
  }
  next();
};


function tweetNotFoundError(tweetId){
  const err = Error('Tweet not found')
  err.errors = [`Tweet with id of ${tweetId}`]
  err.title = 'Tweet not found'
  err.status = 404
  return err;
}



router.get("/", asyncHandler ( async (req, res) => {
  const tweet = await Tweet.findAll()

    res.json({tweet});
  }));

router.get('/:id(\\d+)', asyncHandler ( async (req, res, next) => {
    const oneTweet = await Tweet.findByPk(req.params.id)
    if(oneTweet === null){
      next(tweetNotFoundError(req.params.id))
    } else {
      res.json({oneTweet})
    }

}))

router.post('/', asyncHandler, (async (req, res, next) => {

}))




module.exports = router;
