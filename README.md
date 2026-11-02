# Trexo — Finance Tracking Backend

Trexo is a personal finance tracker. Log your income and expenses, set a monthly budget per category, and keep track of recurring payments like rent or subscriptions, all in one dashboard.

This repo is the REST API. It stores your data in MongoDB, handles accounts and login, and creates recurring transactions on schedule. The web client is [FinanceTrackingFrontend](https://github.com/riaars/FinanceTrackingFrontend).

## Features

- **Accounts**: sign up with email verification, log in and out, reset a forgotten password by email, change your password
- **Transactions**: add, edit, delete and list income and expenses
- **Recurring payments**: a background job creates the next transaction for each recurring plan (daily, weekly, monthly or yearly), never twice for the same period. Active plans can be listed, edited or cancelled
- **Budgets**: save and fetch a monthly budget per category
- **Saving plans**: create, update and list saving goals
- **API docs**: interactive Swagger UI at `/api-docs`

## Getting started

### Prerequisites

- Node.js 24 (the version CI uses)
- MongoDB, either a local server on `mongodb://localhost:27017` or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A Gmail account with an [app password](https://support.google.com/accounts/answer/185833), used to send verification and password reset emails

### Setup

```bash
git clone https://github.com/riaars/FinanceTrackingBackend.git
cd FinanceTrackingBackend
npm install

cp .env.example .env   # fill in JWT_SECRET, EMAIL_USER and EMAIL_PASS
npm run dev
```

The API runs at http://localhost:3000, and the API docs at http://localhost:3000/api-docs.

`FRONTEND_URL` must match the URL the frontend runs on (`http://localhost:5173`). It is used for CORS and for the links in emails, so if it's wrong the browser blocks requests and email links point to the wrong place.

### Environment variables

| Variable           | Description                                                                 | Example                                     |
| ------------------ | --------------------------------------------------------------------------- | ------------------------------------------- |
| `MONGODB_URI`      | MongoDB connection string (required, the app exits without it)             | `mongodb://localhost:27017/finance_tracking` |
| `PORT`             | Port the API listens on                                                     | `3000`                                      |
| `BACKEND_APP_HOST` | Host shown in logs and the Swagger server URL                               | `0.0.0.0`                                   |
| `FRONTEND_URL`     | Frontend URL, used for CORS and email links                                 | `http://localhost:5173`                     |
| `NODE_ENV`         | `production` enables secure cookies                                         | `development`                               |
| `JWT_SECRET`       | Secret used to sign login and email tokens                                  | any long random string                      |
| `EMAIL_USER`       | Gmail address that sends emails                                             | `you@gmail.com`                             |
| `EMAIL_PASS`       | Gmail app password                                                          | `abcd efgh ijkl mnop`                       |
| `CRON_SCHEDULE`    | When the recurring payments job runs (cron syntax, default: daily at midnight) | `0 0 * * *`                              |
| `DEFAULT_TZ`       | Timezone for the cron schedule (default: `UTC`)                             | `Europe/Stockholm`                          |
| `FORCE_HTTPS`      | Set to `true` in production to mark the login cookie as HTTPS-only          | `true`                                      |

### Scripts

| Command       | Description                                 |
| ------------- | ------------------------------------------- |
| `npm run dev` | Start the server with nodemon (auto-restart) |
| `npm start`   | Start the server with Node                  |

## Tech stack

| Area         | Tools                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| Runtime      | [Node.js](https://nodejs.org) + [Express 4](https://expressjs.com)          |
| Database     | [MongoDB](https://www.mongodb.com) with [Mongoose 8](https://mongoosejs.com) |
| Auth         | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) in an HTTP-only cookie, bcryptjs for password hashing |
| Email        | [Nodemailer](https://nodemailer.com) over Gmail                              |
| Scheduling   | [node-cron](https://github.com/node-cron/node-cron), Luxon for timezone-aware dates |
| API docs     | swagger-jsdoc + swagger-ui-express                                           |
| Utilities    | dotenv, cors, cookie-parser, uuid                                            |
| CI/CD        | GitHub Actions → AWS EC2, run with PM2 (deploy currently disabled)           |

## How it works

- **Auth**: `/signIn` checks the password with bcrypt and sets a JWT in an HTTP-only `accessToken` cookie that lasts one day. Protected routes use the `verifyToken` middleware, which reads the cookie, verifies the token and attaches the user to `req.user`. Email verification and password reset links carry their own short-lived tokens.
- **Routes**: each endpoint lives in its own file in `routes/`, with its Swagger docs as JSDoc comments. Business logic lives in `controllers/`.
- **Recurring payments**: a recurring transaction is a plan with a `nextDate`. On startup and on every `CRON_SCHEDULE` tick, `service/recurrenceWorker.js` finds plans that are due, creates a normal transaction for each, and moves `nextDate` forward. A `TransactionOccurrence` record with a unique period key makes sure each period is only charged once, even if the job runs twice.

## API overview

Full request and response details are in Swagger UI at `/api-docs`. 🔒 means the route needs the login cookie.

| Area         | Endpoints                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------ |
| Auth         | `POST /signUp`, `POST /verifyEmail`, `POST /signIn`, `POST /logout`, `POST /forgotPassword`, `POST /resetPassword`, 🔒 `POST /changePassword`, 🔒 `GET /getCurrentUser` |
| Transactions | 🔒 `POST /addTransaction`, 🔒 `PUT /updateTransaction`, 🔒 `DELETE /deleteTransaction`, 🔒 `GET /getAllTransactions` |
| Recurring    | 🔒 `GET /getActiveRecurrings`, 🔒 `PUT /updateRecurring`, 🔒 `DELETE /deleteRecurring`       |
| Budgets      | 🔒 `POST /addMonthlyBudget`, 🔒 `GET /getMonthlyBudget`                                      |
| Saving plans | 🔒 `POST /addSavingPlan`, 🔒 `PUT /updateSavingPlan`, 🔒 `GET /getSavingPlans`               |
| Health       | `GET /health`, `GET /api/health`                                                           |

## Project structure

```
├── app.js              # Entry point: Express setup, routes, Swagger, MongoDB connection, cron job
├── controllers/        # Business logic: auth, transaction, recurring, budget, savingPlan
├── middlewares/        # authJwt (login check), verifySignUp (duplicate email check)
├── models/             # Mongoose schemas: User, Transaction, TransactionOccurrence, Budget, SavingPlan
├── routes/             # One file per endpoint, with Swagger JSDoc
├── service/            # recurrenceWorker: creates due recurring transactions
├── utils/              # Email templates and sending, date helpers
├── .env.example        # Environment variable template
├── Dockerfile
└── .github/workflows/  # CI and deploy
```

## Deployment

Every push to `master` triggers the [GitHub Actions workflow](.github/workflows/backend.yml). It installs dependencies and packages the code. The deploy job, which uploads the code to an EC2 instance and restarts it with PM2, is currently disabled because the server was shut down. To turn it back on, restore the `if:` condition on the `deploy` job and set `MONGODB_URI` and the other variables on the new server.
