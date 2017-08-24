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

exports.getGeoJson = function (req, res) {
    Project.findById(req.params.projectId, function (err, project) {
        if (err)
            res.send(err);
        var output = {
            center: {
                lat: project.centerLat,
                lng: project.centerLong
            },
            zoomLevel: project.zoomLevel, 
            geoJson: JSON.parse(project.geoJson)
        };
        res.json(output);
    });
};

exports.updateProject = function (req, res) {
    var geoJsonUrl = 'http://localhost:3000/hospital/' + req.params.projectId;
    req.body.geoJsonUrl = geoJsonUrl;
    console.log(req.body);
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
