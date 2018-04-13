var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var User = mongoose.model('User');

module.exports.newCourse = function (req, res) {
  console.log("Reached course.js");
  var course = new Course();
  course.name = req.body.name;
  console.log("Name added");
  course.code = req.body.code;
  console.log("Code added");
  course.owner = req.body.owner;
  console.log("Owner added");
  course.users = [req.body.owner]; //owner also a user, add to user table also ...
  console.log("Owner pushed");

  course.save(function (err) {
    if (err) {
      console.log("Error..\n" + err);
      res.status(200);
    } else {
      console.log("Adding in User collection..");
      User.findOneAndUpdate({
        email: req.body.owner
      }, {
        $push: {
          courses: req.body.code
        }
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        // If user is found in database, add course code to user 
        if (user) {
          // user.courses.push(req.body);

          res.status(200);
          res.json({
            "code": req.body.code
          });
        } else {
          // If user is not found
          res.status(401).json(info);
        }
      });

    }
  });
  console.log(course);
  console.log("Searching for " + req.body.owner);
  if (course) {

  } else {
    console.log("Could not add new curse");
  }
};

module.exports.courseDetails = function (req, res) {
  console.log("Searching and sending " + req.params.course);
  var code = (req.params.course);

  Course.findOne({
    code: code
  }, function (err, course) {
    if (err) {
      console.log(err)
      res.status(404).json(err);
    }
    console.log("Sending course " + course);
    res.status(200).json(course);
  });
}


module.exports.addSyllabus = function (req, res) {
  console.log("Adding to " + req.body.course);
  var code = (req.body.course);

  Course.findOneAndUpdate({
    code: code
  }, {
    $push: {
      syllabus: req.body.syllabus
    }
  }, {
    new: true
  }, function (err, data) {
    if (err) {
      console.log(err)
      res.status(404).json(err);
    }
    console.log("Sending course " + data);
    res.status(200).json(data);
  });
}


module.exports.allCourses = function (req, res) {
  console.log("Sending Courses");
  Course.find({}, function (err, courses) {
    if (err) {
      console.log(err)
      res.status(404).json(err);
    }
    console.log("Sending course " + courses);
    res.status(200).json(courses);
  });
}