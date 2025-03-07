const fs = require("fs");
const path = require("path");
const Movie = require('./../Modules/movieModels')

const movies = JSON.parse(fs.readFileSync("./data/movies.json"));

//using param middleware for finding id value
exports.checkId = (req, res, next, value) => {
  console.log("MOVIE ID IS " + value);

  //FIND MOVIE BASED ON ID PARAMETER
  let movie = movies.find((el) => el.id === value * 1);

  if (!movie) {
    return res.status(404).json({
      status: "fail",
      message: "MOVIE WITH ID " + value + "IS NOT FOUND",
    });
  }
  next();
};

exports.validateBody = (req, res, next) => {
  if (!req.body.name || !req.body.releaseYear) {
    return res.status(400).json({
      status: "success",
      message: "Not a valid movie data",
    });
  }
  next();
};

//ROUTE HANDLER FUNCTIONS

// 1: get api method
exports.getAllMovies = (req, res) => {
  res.status(200).json({
    status: "sucess",
    requestedAt: req.requestedAt,
    count: movies.length,
    data: {
      movies: movies,
    },
  });
};

// 2: get single movie object by using get id method
exports.getMovie = (req, res) => {
  // console.log(req.params);

  //CONVERT ID(STRING) TO NUMBER
  const id = req.params.id * 1;

  //FIND MOVIE BASED ON ID PARAMETER
  let movie = movies.find((el) => el.id === id);

  // if (!movie) {
  //   return res.status(404).json({
  //     status: "fail",
  //     message: "MOVIE WITH ID " + id + "IS NOT FOUND",
  //   });
  // }

  // SEND MOVIE IN THE RESPONSE BY JSON FORMAT
  res.status(200).json({
    status: "sucess",
    data: {
      movie: movie,
    },
  });
};

// 3: create new Movie object in array by using post api method
exports.createMovie = (req, res) => {
  // console.log(req.body);
  const newId = movies[movies.length - 1].id + 1;
  const newMovies = Object.assign({ id: newId }, req.body);
  movies.push(newMovies);
  // console.log(movies);
  fs.writeFile("./data/movies.json", JSON.stringify(movies), (err) => {
    res.status(201).json({
      satus: "sucess",
      count: movies.length,
      data: {
        movies: newMovies,
      },
    });
  });
  // res.send("created");
};

// 4: update any movie object in movie array by using api update method
exports.updateMovie = (req, res) => {
  let id = req.params.id * 1;
  let movieToUpdate = movies.find((el) => el.id === id);

  // if (!movieToUpdate) {
  //   return res.status(404).json({
  //     status: "sucess",
  //     message: "No movie object with ID " + id + "is found",
  //   });
  // }

  let index = movies.indexOf(movieToUpdate); //e.g- id=4,index=3
  Object.assign(movieToUpdate, req.body);
  movies[index] = movieToUpdate;
  fs.writeFile(
    path.join(__dirname, "data", "movies.json"),
    JSON.stringify(movies),
    (err) => {
      res.status(200).json({
        status: "sucess",
        data: {
          movies: movieToUpdate,
        },
      });
    }
  );
};

// 5: delete the particular object in movies array by using delete api method
exports.deleteMovie = (req, res) => {
  const id = req.params.id * 1;
  const movieToDelete = movies.find((el) => el.id === id);
  // if (!movieToDelete) {
  //   res.status(404).json({
  //     status: "fail",
  //     message: `No movie object with this ${id} to found delete`,
  //   });
  // }
  const index = movies.indexOf(movieToDelete); //index-3 ; id-4
  movies.splice(index, 1);
  fs.writeFile(
    path.join(__dirname, "data", "movies.json"),
    JSON.stringify(movies),
    (err) => {
      // if (err) {
      //   res.status(404).json({
      //     status: "fail",
      //     message: "fail",
      //   });
      // }
      res.status(204).json({
        status: "success",
        data: {
          movies: null,
        },
      });
    }
  );
};
