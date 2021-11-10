var express = require('express');
var router = express.Router();
var museumController = require('../controllers/museum');
var url = require('url');

/* GET users listing. */
router.get('/visitors', function(req, res, next) {
  var data = url.parse(req.url, true).query;
  museumController.fetchVisitors(data, function (result) {
    if (result === "Failed") {
      res.status(500).send("Something went wrong while parsing the array");
    }
    else {
      res.status(200).send(result);
    }
    
  });
  
});

module.exports = router;
