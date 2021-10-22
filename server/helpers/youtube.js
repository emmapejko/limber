require('dotenv').config();
const axios = require('axios');

const searchYouTube = (query) => axios.get(`https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&key=${process.env.YOUTUBE_API_KEY}&q=${query}&maxResults=5`)
    .then(response => response)
    .catch(err => {
      console.log(err);
      return err;
    })

module.exports = {
  searchYouTube,
}
