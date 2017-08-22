'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Project = mongoose.model('Project');

exports.createProject = function (req, res) {
    console.log(req.body._user);
    var newProject = new Project(req.body);
    newProject.save(function (err, project) {
        if (err) {
            res.send(err);
        } else {
            User.findOne({ userId: req.body.userId }, function (err, user) {
                if (err) {
                    res.send(err);
                } else {
                    console.log(user);
                    user._projects.push(project);
                    user.save(function (err, user) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.json(project);
                        }
                    });
                }
            });
        }
    });
};

exports.getProjectById = function (req, res) {
    Project.findById(req.params.projectId, function (err, project) {
        if (err)
            res.send(err);
        res.json(project);
    });
};

exports.updateProject = function (req, res) {
    Project.findOneAndUpdate({ _id: req.params.projectId }, req.body, { new: true }, function (err, project) {
        if (err)
            res.send(err);
        res.json(project);
    });
};

exports.deleteProject = function (req, res) {
    Project.remove({
        _id: req.params.projectId
    }, function (err, project) {
        if (err)
            res.send(err);
        res.json({ message: 'Project successfully deleted' });
    });
};
