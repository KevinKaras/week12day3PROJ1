const { urlencoded } = require('express');
const express = require('express')
const router = express.Router()
const db = require('../db/models');
const { Tweet } = db
const app = express()
app.use(express.json())

router.get("/", (req, res) => {
    res.send("test tweets index");
  });



  
urlencoded.com/tweets



module.exports = router;