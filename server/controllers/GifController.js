const axios = require('axios')


class GifController {
    static getGif(req, res, next) {
        const { q } = req.query;
        axios({
            method: "get",
            url: `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIF_KEY}&q=${q}&limit=1&offset=0&rating=g&lang=en`
        })
            .then(response => {
                let data = response.data.data[0].images.downsized
                res.status(200).json({
                    data
                })
            })
            .catch(err => next(err))
    }
}


module.exports = GifController