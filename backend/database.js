const mongoose = require('mongoose');
const connection = "mongodb+srv://admin:admin!!@cluster0.8iy4x.mongodb.net/lms?retryWrites=true&w=majority";
mongoose.connect(connection,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

