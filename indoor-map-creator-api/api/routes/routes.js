'use strict';
module.exports = function (app) {
    var userController = require('../controllers/userController');
    var projectController = require('../controllers/projectController');

    // app.route('/users/:userId')
    //     .get(userController.getUserById)
    //     .delete(userController.deleteUserById);

    // userId (google id) for get and delete command are appended by 
    // "autheticator" middleware.
    app.route('/users')
        .post(userController.createUser)
        .get(userController.getUserById)
        .delete(userController.deleteUserById);

    // userId here is the object id (_id)
    app.route('/users/:userId/projects')
        .get(userController.getAllProjectsByUserById);

    app.route('/projects')
        .post(projectController.createProject);

    app.route('/projects/:projectId')
        .get(projectController.getProjectById)
        .put(projectController.updateProject)
        .delete(projectController.deleteProject);

    app.route('/hospital/:projectId')
        .get(projectController.getGeoJson);
};