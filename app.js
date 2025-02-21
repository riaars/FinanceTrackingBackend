const express = require("express");
const cors = require("cors");
const database = require("./config/database.json");
const db = require("./models");
const config = require("./config/configuration.json");

const dotenv = require("dotenv");
dotenv.config();

const signIn = require("./routes/signIn");
const signUp = require("./routes/signUp");
const inputExpense = require("./routes/inputExpense");

const app = express();

app.get("/", (req, res) => {
  res.send("Finance Tracking");
});

app.use([express.json(), cors()]);

app.use("/signIn", signIn);
app.use("/signUp", signUp);
app.use("/inputExpense", inputExpense);

const expense_db = `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`;

db.mongoose
  .connect(expense_db, {})
  .then(() => {
    console.log("Successfully connect to MongoDB");
  })
  .catch((error) => {
    console.error(("Connection error", error));
    process.exit();
  });

app.listen(process.env.BACKEND_APP_PORT, () => {
  console.log(
    `Server running at: http://${process.env.BACKEND_APP_HOST}:${process.env.BACKEND_APP_PORT}`
  );
});
