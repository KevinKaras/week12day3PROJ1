const { urlencoded } = require('express');
const express = require('express')
const router = express.Router()
const db = require('../db/models');
const { Tweet } = db
const app = express()
app.use(express.json())

const asyncHandler = handler => (req, res, next) => handler(req, res, next).catch(next)


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






module.exports = router;