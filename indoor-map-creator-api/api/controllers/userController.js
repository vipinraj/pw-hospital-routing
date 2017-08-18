'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');


exports.getUserById = function (req, res) {
  User.findOne({ userId: req.params.userId }, function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.deleteUserById = function (req, res) {
  User.remove({
    userId: req.params.userId
  }, function (err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully deleted' });
  });
};

exports.createUser = function (req, res) {
  var newUser = new User(req.body);
  newUser.save(function (err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.getAllProjectsByUserById = function (req, res) {
  User.findOne({ userId: req.params.userId })
    .populate('_projects')
    .exec(function (err, user) {
      if (err)
        res.send(err);
      res.json(user._projects);
    });
};





exports.list_all_tasks = function (req, res) {
  Task.find({}, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.create_a_task = function (req, res) {
  var new_task = new Task(req.body);
  new_task.save(function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.read_a_task = function (req, res) {
  Task.findById(req.params.taskId, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.update_a_task = function (req, res) {
  Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};
// Task.remove({}).exec(function(){});
exports.delete_a_task = function (req, res) {

  Task.remove({
    _id: req.params.taskId
  }, function (err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
