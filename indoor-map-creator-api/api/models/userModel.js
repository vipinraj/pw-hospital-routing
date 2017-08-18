'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        userId: {
            type: String,
            required: [true, 'Enter user id.'],
            unique: true
        },
        _projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('User', UserSchema);