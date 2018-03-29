var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();
  console.log("Registering " + JSON.stringify(req.body));
  user.name = req.body.name;
  user.email = req.body.email;
  user.faculty = req.body.faculty;
  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
      console.log("Logged in");
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};


module.exports.forgotPassword = function(req, res) {

 /* TODO :
  Retreive Email id
  Use User.find to check if user exists
  if yes send else send back error
 */
  console.log("Searching for "+req.body.email);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) { return done(err); }
    // If user is found in database
    if(user){
      res.status(200);
      res.json({
        "email" : req.body.email
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
 
};