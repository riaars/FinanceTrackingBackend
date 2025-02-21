const express = require("express");
const cors = require("cors");
const database = require("./config/database.json");
const db = require("./models");
const config = require("./config/configuration.json");
const port = 5000;

const BACKEND_APP_HOST = config.BACKEND_APP_HOST;
const BACKEND_APP_PORT = config.BACKEND_APP_PORT;

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

const expense_db = database.url + "/" + database.database_name;
db.mongoose
  .connect(expense_db, {})
  .then(() => {
    console.log("Successfully connect to MongoDB");
  })
  .catch((error) => {
    console.error(("Connection error", error));
    process.exit();
  });

app.listen(port, () => {
  console.log(
    `Server running at: http://${BACKEND_APP_HOST}:${BACKEND_APP_PORT}`
  );
});
