const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

const db = require("./models");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const expense_db = `${process.env.DATABASE_URL}`;

const signIn = require("./routes/signIn");
const signUp = require("./routes/signUp");
const signOut = require("./routes/signOut");
const verifyEmail = require("./routes/verifyEmail");
const forgotPassword = require("./routes/forgotPassword");
const resetPassword = require("./routes/resetPassword");
const changePassword = require("./routes/changePassword");
const addTransaction = require("./routes/addTransaction");
const updateTransaction = require("./routes/updateTransaction");
const deleteTransaction = require("./routes/deleteTransaction");
const getAllTransactions = require("./routes/getAllTransactions");
const addMonthlyBudget = require("./routes/addMonthlyBudget");
const updateMonthlyBudget = require("./routes/updateMonthlyBudget");
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoDBStore({
//       uri: expense_db,
//       collection: "sessions",
//     }),
//   })
// );

// app.use(csrfProtection);

app.get("/", (req, res) => {
  res.send("Finance Tracking");
});

app.use(signIn);
app.use(signUp);
app.use(verifyEmail);
app.use(forgotPassword);
app.use(resetPassword);
app.use(changePassword);
app.use(signOut);

app.use(addTransaction);
app.use(updateTransaction);
app.use(deleteTransaction);
app.use(getAllTransactions);
app.use(addMonthlyBudget);
app.use(updateMonthlyBudget);

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
