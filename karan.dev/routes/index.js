var express = require('express');
var router = express.Router();

/* Mongo Models */
var Dog = require('../models/Dog');
var Training = require('../models/Training');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* API Breeds route page. */
router.get('/api/bork', function(req, res, next) {
  Dog.find(function(err, breeds){
    if(err) return next(err);
    res.json(breeds);
  })
});

/* API Training route page. */
router.get('/api/training', function(req, res, next) {
  Training.find(function(err, training){
    if(err) return next(err);
    res.json(training);
  })
});

router.post('/api/bork', function(req, res, next) {
  Dog.create(req.body)
  .then(function(dbDog) {
    res.json(dbDog);
  })
  .catch(function(err) {
    res.json(err);
  });
});

/* Get by 'id' API route */
router.get('/api/bork/:id', function(req, res, next) {
  Training.create(req.body).then(function(dbTraining) {
    return Dog.findOneAndUpdate({_id: req.params.id }, { training:dbTraining._id }, { new: true });
  })
  .then(function(dbDog) {
    res.json(dbDog);
  })
  .catch(function(err) {
    res.json(err);
  });
});

module.exports = router;
