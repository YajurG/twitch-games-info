const mongoose = require('mongoose');
const StreamSchema = require('./streamSchema');

const TopStreams = mongoose.model(
    "TopStreams", StreamSchema
);

module.exports = TopStreams;