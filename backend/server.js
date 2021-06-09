require('./database');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
//middleware
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;
//models
const users = require('./api/user');

//middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api/*', users);


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
}
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./build", "index.html"));
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


