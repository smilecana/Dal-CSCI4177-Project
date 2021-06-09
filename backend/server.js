const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('./database');
//middleware
app.use(bodyParser.json());
app.use(cors());

// API
const users = require('./api/user');
app.use('/api/users', users);
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});