const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes');
const cors = require('cors');
const errHandler = require('./middlewares/errHandler');

const PORT = process.env.PORT || 3000;
const app = express();

dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`Server listening in ${process.env.NODE_ENV} on PORT: ${PORT}`);
});
