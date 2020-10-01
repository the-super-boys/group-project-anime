const express = require('express')
const app = express()
const router = require('./routes/index')
const port = 3000


app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})