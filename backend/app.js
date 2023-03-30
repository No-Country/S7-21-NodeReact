const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const routes = require("./routes");

const { notFoundMiddleware, errorMiddleware } = require("./middlewares");

const db = require("./database/models");

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(morgan("dev", { skip: (req, res) => process.env.NODE_ENV === "test" }));

app.get("/", (req, res) => {
  res.send("Backend Barberia");
});
app.use("/api/v1", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const startApi = async () => {
  console.log("Testing the database connection...");
  try {
    await db.sequelize.authenticate();
    console.log("Database authentication successfully");
    await db.sequelize.sync({ alter: true, logging: false });
    console.log("Database synchronized");
    if (process.env.NODE_ENV !== "test") {
      app.listen(port, () => console.log(`Server start on port ${port}`));
    }
  } catch (error) {
    console.log("Unable to connect to the database \n", error);
  }
};

startApi();
