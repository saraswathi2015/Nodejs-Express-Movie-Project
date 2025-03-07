// IMPORT PACKAGE
const express = require("express");
const morgan = require("morgan");
let app = express();
const fs = require("fs");
const path = require("path");

//IMPORT route file from moviesRoutes.js
const moviesRouter = require("./Routes/moviesRoutes");

const movies = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "movies.json"))
);

const logger = function (req, res, next) {
  console.log("custom middleware called");
  next();
};

if (process.env.NODE_ENV === "development") {
  return app.use(morgan("dev")); //thiryparty middleware download from npm
}

app.use(express.json()); //middleware function

app.use(express.static("./public")); //static middleware
app.use(logger); //custom middleware
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

//ROUTE = HTTP METHOD + URL
// app.get("/", (req, res) => {
//   // res.status(200).send("<h4>Hello from express server</h4>");  //text response by using send menthos
//   res.status(200).json({ message: "Hello,world", status: 200 }); //json response
// });

// app.post("/", (req, res) => {
//   res.status(300).send("i am post request");
// });

//GET -api/v1/movies
// app.get("/api/v1/movies", getAllMovies);

//GET - api/v1/movies/id
// app.get("/api/v1/movies/:id", getMovie);

// POST - api/v1/movies
// app.post("/api/v1/movies", createMovie);

//PATCH- api/v1/movies
// app.patch("/api/v1/movies/:id", updateMovie);

// app.delete("/api/v1/movies/:id", deleteMovie);

//USING ROUTES
app.use("/api/v1/movies", moviesRouter);

module.exports = app;
