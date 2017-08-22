'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Enter project name.']
        },
        centerLat: {
            type: String
        },
        centerLong: {
            type: String
        },
        zoomLevel: {
            type: Number
        },
        featureTypes: { // stores the type of each feature (room, door, etc) in the same order as geoJson
            type: [] 
        },
        geoJson: {
            type: String
        },
        geoJsonUrl: {
        	type: String
        },
        _user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Project', ProjectSchema);