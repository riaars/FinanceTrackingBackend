const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cron = require("node-cron");

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

// const expense_db = `${process.env.DATABASE_URL}`;
const expense_db =
  process.env.MONGODB_URI ||
  "mongodb+srv://riaratnasari:Morestudying2025@cluster0.udtimuc.mongodb.net/finance_tracking?retryWrites=true&w=majority";
const signIn = require("./routes/signIn");
const signUp = require("./routes/signUp");
const signOut = require("./routes/signOut");
const verifyEmail = require("./routes/verifyEmail");
const forgotPassword = require("./routes/forgotPassword");
const resetPassword = require("./routes/resetPassword");
const changePassword = require("./routes/changePassword");
const getCurrentUser = require("./routes/getCurrentUser");
const addTransaction = require("./routes/addTransaction");
const updateTransaction = require("./routes/updateTransaction");
const deleteTransaction = require("./routes/deleteTransaction");
const getAllTransactions = require("./routes/getAllTransactions");

const addMonthlyBudget = require("./routes/addMonthlyBudget");
const getMonthlyBudget = require("./routes/getMonthlyBudget");
const addSavingPlan = require("./routes/addSavingPlan");
const updateSavingPlan = require("./routes/updateSavingPlan");
const getSavingPlans = require("./routes/getSavingPlans");
const { processDueRecurrences } = require("./service/recurrenceWorker.js");

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
app.use(getCurrentUser);

app.use(addTransaction);
app.use(updateTransaction);
app.use(deleteTransaction);
app.use(getAllTransactions);
app.use(addMonthlyBudget);
app.use(getMonthlyBudget);
app.use(addSavingPlan);
app.use(updateSavingPlan);
app.use(getSavingPlans);

// --- Swagger setup ---
const swaggerDefinition = {
  openapi: "3.0.3",
  info: {
    title: "API",
    version: "1.0.0",
    description: "Finance Tracking API Documentation",
  },
  servers: [
    {
      url: `http://${process.env.BACKEND_APP_HOST}:${process.env.PORT}`, //need to be fixed for production
      description: `${process.env.NODE_ENV} server`,
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "access_token",
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
};

const options = {
  swaggerDefinition,
  // Point to the files with your routes that include JSDoc comments
  apis: ["./routes/*.js", "./app.js"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/health", (req, res) => res.json({ ok: true }));
app.get("/api/health", (_req, res) => res.send("OK"));
const tz = process.env.DEFAULT_TZ || "UTC";

async function main() {
  db.mongoose
    .connect(expense_db, {})
    .then(async () => {
      console.log("Successfully connect to MongoDB");
      await processDueRecurrences();

      // then every 5 minutes
      cron.schedule(
        "*/5 * * * *",
        async () => {
          console.log(`[${new Date().toISOString()}] recurring tick`);
          await processDueRecurrences();
        },
        { timezone: tz }
      );
    })
    .catch((error) => {
      console.error(("Connection error", error));
      process.exit();
    });
}

main();

const PORT = process.env.PORT || 3000;
// bind to all interfaces so Nginx (same host) can reach it
const HOST = process.env.BACKEND_APP_HOST || "0.0.0.0";

app.listen(PORT, () => {
  console.log(`Server running at: http://${HOST}:${PORT}`);
  console.log(`Swagger UI on http://${HOST}:${PORT}/api-docs`);
});
