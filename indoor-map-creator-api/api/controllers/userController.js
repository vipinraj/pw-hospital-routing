/*
 * Takes care of the logics related
 * to users.
*/
'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');

exports.getUserById = function (req, res) {
  console.log('req.body.userId2: ' + req.body.userId);
  User.findOne({ userId: req.body.userId }, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.deleteUserById = function (req, res) {

  User.findOne({ userId: req.body.userId })
  .populate({ path: '_projects', options: { sort: { 'updatedAt': -1 } } })
  .exec(function (err, user) {
    if (err)
      res.send(err);
    // remove projects
    user._projects.forEach(function(project) {
      project.remove();
    });
    user.remove(function(err, user) {
      if (err)
        res.send(err);
      res.json({ message: 'User successfully deleted' });
    });
  });
};

exports.createUser = function (req, res) {
  console.log(req.body);
  var newUser = new User(req.body);
  newUser.save(function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.getAllProjectsByUserById = function (req, res) {
  console.log(req.params.userId);
  User.findOne({ _id: req.params.userId })
    .populate({ path: '_projects', options: { sort: { 'updatedAt': -1 } } })
    .exec(function (err, user) {
      if (err)
        res.send(err);
      res.json(user._projects);
    });
};
