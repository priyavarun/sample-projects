const express = require("express");
const app = express();

const loggingMiddleware = function (req, res, next) {
  console.log(
    `In logging middleware at ${new Date().toISOString()} in ${req.originalUrl}`
  );
  next();
};

const authorizationMiddleware = function (req, res, next) {
  if (req.query.admin === "true") {
    req.admin = true;
    next();
  } else {
    res.send("You are not admin. Dont have access to this page");
  }
};

app.use(loggingMiddleware);

app.get("/", (req, res) => {
  res.send("Home Page / route");
});

app.get("/users", authorizationMiddleware, (req, res) => {
  res.send("Users Page response");
});

app.listen(3010, () => {
  console.log("Server started");
});
