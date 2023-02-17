const path = require('path');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_CONNECTION_DEV_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));