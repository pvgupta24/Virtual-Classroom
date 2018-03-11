var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlCourse = require('../controllers/course');
// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// courses
//router.get('/courses', auth, );

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

//new course
router.post('/newCourse',ctrlCourse.register);

module.exports = router;
