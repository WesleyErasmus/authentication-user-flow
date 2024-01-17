# Authentication User Flow

React + TypeScript + Vite

## Installation

1. Install dependencies
```bash
npm install
```
2. Start the development server
```bash
npm run dev
```

## Key Features
- __Secure User Management:__ Leverages Firebase Authentication for backend security.
- __Email and Password Authentication:__ Supports sign-up, login, and password reset using email and password credentials.
- __Intuitive User Flow:__ Guides users through sign-up, login, and password reset processes.
- __Dashboard Access:__ Directs authenticated users to the dashboard page.
- __404 Page:__ Catches all undefined routes and redirects users to a "page-not-found" page.

## User Flow

(*Sign up --> Login --> (Reset Password) --> Dashboard*)

#### 1. Sign-up
 - Users can create a new account using an email address and password
 - Firebase Authentication method used `createUserWithEmailAndPassword`

#### 2. Login
 - Users can log in using the newly created account credentials
 - Firebase Authentication method used: `signInWithEmailAndPassword`

#### 3. Reset Password
 - Users can reset their password via a unique password reset link which gets emailed to them
 - Firebase Authentication method used: `sendPasswordResetEmail`

#### 4. Dashboard
 - After a successful login users are directed to the dashboard page

## Firebase Methods Used:

`createUserWithEmailAndPassword`
`signInWithEmailAndPassword`
`sendPasswordResetEmail`

## Packages Used
- __Firebase Authentication:__ Secure backend user management and authentication.
- __Formik:__ Form handling and validation.
- __Yup:__ Schema-based form validation.
- __React-router-dom:__ Client-side routing for navigation.
- __Bootstrap:__ Responsive UI framework.
- __Popperjs:__ For Bootstrap tooltips and popovers.
- __Bootstrap Icons:__ Icons for improved UX.

#

Find me on [LinkedIn](https://www.linkedin.com/in/wesley-erasmus-75a72a1ba/) and say hi 👋.
