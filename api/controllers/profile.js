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
  console.log("Editing Profile "+ JSON.stringify(req.body));  
  var id = req.body._id;
  User.findByIdAndUpdate(id, {
    dob : req.body.dob,
    gender : req.body.gender,
    phone:req.body.phone,
    education:req.body.education
    //TODO : same for other updates
  }, {new: true}, function(err, user) {
    if(err)   
      console.log(err);
    else{
      console.log("Updated ..");
      res.status(200).json(user);
    }
  });

};