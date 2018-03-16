var mongoose = require('mongoose');
var Course = mongoose.model('Course');

module.exports.register = function(req, res) {
  var course = new Course();
  course.name = req.body.name;
  course.code = req.body.code;
  course.owner = req.body.owner;
  course.users.push(req.body.owner);//owner also a user, add to user table also ...

  course.save(function(err) {
    console.log("Error..\n"+err);
    res.status(200);
  });

};

module.exports.courseDetails = function(req,res){
  console.log("Searching and sending "+req.params.course);
  var _id = (req.params.course);
  
  Course.findById(_id ,function(err,data){
    if(err) {
      console.log(err)
      res.status(404).json(err);
    }
    console.log(data);
    res.status(200).json(data)   
  });
}