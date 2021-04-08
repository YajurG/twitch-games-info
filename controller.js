const Index = require("./index.js");

exports.getToken = (req, res) => {
  let token = Index.getAccessToken(process.env.GET_TOKEN,
    (err, result) => {
      if (err){
        res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving token."
      });
      } else {
        res.send(result);
      }
    })
}
