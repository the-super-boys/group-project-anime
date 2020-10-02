const axios = require('axios')

class TriviaController {
  static triviaShow (req, res, next) {
    axios({
      method: "post",
      url: "https://opentdb.com/api.php?amount=1&category=31&type=boolean"
    })
      .then(response => {
        let trivia = response.data.results[0].question
        let answer = response.data.results[0].correct_answer
        res.status(200).json({
          trivia,
          answer
        })
      })
      .catch(err => next(err))
  }
}

module.exports = TriviaController