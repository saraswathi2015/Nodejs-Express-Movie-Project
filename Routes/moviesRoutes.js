const express = require("express");
const moviesController = require("./../Controllers/moviesController");

const router = express.Router();

// router.param("id", (req, res, next, value) => {
//   console.log("MOVIE ID IS " + value);
//   next();
// });

router.param("id", moviesController.checkId);

// app.route("/api/v1/movies").get(getAllMovies).post(createMovie);
router
  .route("/")
  .get(moviesController.getAllMovies)
  .post(moviesController.validateBody, moviesController.createMovie);

// app.route("/api/v1/movies/:id")
router
  .route("/:id")
  .get(moviesController.getMovie)
  .patch(moviesController.updateMovie)
  .delete(moviesController.deleteMovie);

//EXPORT THIS CONTENT TO OTHER FILE
module.exports = router;
