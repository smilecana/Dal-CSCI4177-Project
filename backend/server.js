const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
const path = require('path');
const cors = require('cors');

//middleware
app.use(bodyParser.json());
app.use(express.json())
app.use(routes);
app.use(cors())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
      app.listen(PORT);
    })
module.exports = app;