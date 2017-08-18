'use strict';
module.exports = function (app) {
    var userController = require('../controllers/todoListController');
    var projectController = require('../controllers/todoListController');

    app.route('/users/:userId')
        .get(userController.getUserById)
        .delete(userController.deleteUserById);

    app.route('/users')
        .post(userController.createUser);

    app.route('/users/:userId/projects')
        .get(projectController.getAllProjectsByUserById);

    app.route('/projects')
        .post(projectController.createProject);

    app.route('/projects/:projectId')
        .get(projectController.getProjectById)
        .put(projectController.updateProject)
        .delete(projectController.deleteProject);
};