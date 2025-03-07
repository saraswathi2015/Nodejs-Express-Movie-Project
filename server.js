// const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

console.log(app.get("env"));

console.log(process.env);

//connecting mongoose database with nodejs
// mongoose
//   .connect(process.env.CONN_STR, {
//     useNewUrlParser: true,
//   })
//   .then((conn) => {
//     // console.log(conn);
//     console.log("DB connection successful");
//   })
//   .catch(() => {
//     console.log("some error has occured");
//   });

// const testMovie = new Movie({
//   name: "haters",
//   description:
//     "Action ajith movie packed movie starting bruce willis in this trilling adventure.",
//   duration: 5,
//   ratings: 2,
// });

// testMovie
//   .save() //save method return the promise
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log("Error occured:" + err);
//   });

// CREATE A SERVER
// const port = 3000;

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("server has started...");
});
