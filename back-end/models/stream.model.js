const mongoose = require("mongoose")
const StreamSchema = require("./streamSchema")

const Stream = mongoose.model(
    "Stream", StreamSchema
)

module.exports = Stream;