const express = require('express');

const app = express();

app.use(require('cors')())
    .use(express.json())
    .use('/api/v1/', require('./routes'))
    .listen(3333);