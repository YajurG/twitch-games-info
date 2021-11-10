const axios = require('axios');

const db = require("../models");
const TopStreams = db.topStreams;

exports.updateTopStreams = async (req, res) => {
    try {
        const url = "http://localhost:8080/api/topStreams";
        const token = req.query.token;
        const response = await axios.get(url, {params: {token: token}});
        const topStreams = response.data;
        console.log(topStreams);
        res.send({message: "placeholder res"}); // in progress, look at games controller for ref
    } catch (err) {
        console.error(err);
        res.status(500).send({error: "error occurred"})
    }
}