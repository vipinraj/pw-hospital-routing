'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');

exports.createProject = function (req, res) {
    var newProject = new Project(req.body);
    newProject.save(function (err, project) {
      if (err)
        res.send(err);
      res.json(project);
    });
  };