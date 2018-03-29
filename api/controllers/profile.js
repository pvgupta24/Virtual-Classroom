var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User.findById(req.payload._id)
      .exec(function(err, user) {
        console.log("Sending..\n"+user);
        res.status(200).json(user);
      });
  }
  
};

module.exports.editProfile = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User.findById(req.payload._id)
      .exec(function(err, user) {
        console.log("Reached profile.js");
        console.log(req.body.dob);
        console.log(req.body.gender);
        console.log(req.body.education);
        console.log(req.body.phone);
        console.log(req.body.email);
        user.dob = req.body.dob;
        user.gender = req.body.gender;
        user.education = req.body.education;
        user.mob = req.body.phone;
        user.email = req.body.email;
        console.log("Sending..\n"+user);
        res.status(200).json(user);
      });
  }

};