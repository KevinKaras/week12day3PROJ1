const express = require('express')
const router = express.Router();
const app = express()

app.use(express.json());


router.get("/", (req, res) => {
    res.send("test index root");
  });

module.exports = router;
