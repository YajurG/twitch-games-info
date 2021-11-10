const axios = require('axios');

const db = require("../models");
const TopStreams = db.topStreams;

exports.updateTopStreams = async (req, res) => {
    try {
        const url = "http://localhost:8080/api/topStreams";
        const token = req.query.token;
        const response = await axios.get(url, {params: {token: token}});
        const topStreams = response.data.data;
        const deleteResult = await TopStreams.deleteMany({});
        if (deleteResult.deletedCount === 0) {
            console.log("no items deleted")
        }
        const parse = ({user_name, game_id, game_name, thumbnail_url, viewer_count}) => ({user_name, game_id, game_name, thumbnail_url, viewer_count});
        const newTopStreams = topStreams.map((stream) => (
            parse(stream)
        ))
        const updateResult = await TopStreams.insertMany(newTopStreams);
        res.send({message: "top streams updated", data: updateResult});
    } catch (err) {
        console.error(err);
        res.status(500).send({error: "error occurred"})
    }
}

exports.getTopStreams = async (req, res) => {
    try {
        const data = await TopStreams.find({});
        if (!data.length) {
            res.status(500).send({error: "Empty collection. No top streams found"})
        }
        res.send({message: "top streams found", data: data});

    } catch (err) {
        console.error(err);
        res.status(500).send({error: "error occurred"})
    }
}