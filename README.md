Start Backend:

```npm start```

Folder Structure
```
├── Dockerfile
├── app.js
├── controllers
│ ├── auth.js
│ ├── budget.js
│ ├── savingPlan.js
│ └── transaction.js
├── folder-structure.txt
├── middlewares
│ ├── authJwt.js
│ └── verifySignUp.js
├── models
│ ├── Budget.js
│ ├── SavingPlan.js
│ ├── Transaction.js
│ ├── User.js
│ └── index.js
├── package-lock.json
├── package.json
├── routes
│ ├── addMonthlyBudget.js
│ ├── addSavingPlan.js
│ ├── addTransaction.js
│ ├── changePassword.js
│ ├── deleteTransaction.js
│ ├── forgotPassword.js
│ ├── getAllTransactions.js
│ ├── getMonthlyBudget.js
│ ├── getSavingPlans.js
│ ├── resetPassword.js
│ ├── signIn.js
│ ├── signOut.js
│ ├── signUp.js
│ ├── updateSavingPlan.js
│ ├── updateTransaction.js
│ └── verifyEmail.js
└── utils
├── emails.js
└── helpers.js
```
