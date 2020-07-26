const Clarifai = require('clarifai');
require('dotenv').config();
const app = new Clarifai.App({
    apiKey: process.env.APIKEY
  });

  const handleApiCall = (req, res) =>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("failed to handleApiCall"))
  }
 
const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => res.json(entries[0]))
        .catch(err => res.status(400).json('發生錯誤'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall:handleApiCall
}