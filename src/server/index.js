require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const usersRouter = require("./routers/usersRouter");
const { notFoundError, generalError } = require("./middlewares/errors");
const verifyToken = require("./middlewares/verifyToken");
/* const seriesRouter = require("./routers/seriesRouter"); */

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

app.use("/users", usersRouter);

/* app.use("/users", usersRouter);
app.use("/series", verifyToken, seriesRouter); */

app.use(notFoundError);
app.use(generalError);

module.exports = app;
