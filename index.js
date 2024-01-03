const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./database");
const { TodoRoute } = require("./Routes/todo");
const { UserRoute } = require("./Routes/user");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "home page" });
});
app.use("/todo", TodoRoute);
app.use("/user", UserRoute);

app.listen(process.env.PORT, async () => {
  try {
    console.log(`server is runnning ${process.env.PORT}`);
    await connection;
    console.log("database connected successfully!");
  } catch (error) {
    console.log(error);
  }
});
