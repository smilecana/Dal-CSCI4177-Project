require("./database");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
const port = process.env.PORT || 5000;



//const crypto = require('crypto');
//const GridFsStorage = require('multer-gridfs-storage');
//const Grid = require('gridfs-stream');

//middleware
app.use(bodyParser.json());
app.use(express.json())
app.use(routes);


// Initilize gridFs Stream
/*conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGODB_CONNECTION_DEV_STRING,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          //bucket matches collection
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
*/


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./build", "index.html"));
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
