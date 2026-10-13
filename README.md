# Jobby App

Jobby App is a responsive job-search application built with React. Sign in to
browse job listings, search and filter opportunities, and view job details,
skills, company information, and similar roles.

## Live demo

[Open Jobby App](https://anji0522.github.io/JobbyApp/)

## Features

- Sign in and sign out with protected routes.
- Search jobs by keyword.
- Filter jobs by employment type and minimum salary.
- View job descriptions, salary, location, skills, company information, and
  similar jobs.
- Responsive layouts for mobile, tablet, and desktop screens.
- Loading, error, retry, and no-results states.

## Routes

| Path | Description |
| --- | --- |
| `/login` | Sign-in page |
| `/` | Home page |
| `/jobs` | Search and filter job listings |
| `/jobs/:id` | Job details and similar jobs |
| `/not-found` | Not-found page |

## Demo credentials

Use the sample credentials provided by the Jobby API:

```text
Username: rahul
Password: rahul@2021
```

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm start
```

The app opens at `http://localhost:3000`.

## Available scripts

```bash
npm start                  # Start the development server
npm run build              # Create a production build
npm test -- --watchAll=false # Run tests once
npm run lint               # Check code style
```

## Technology

- React 17 and React Router
- JavaScript and CSS
- React Icons
- Jobby API at `https://apis.ccbp.in`
- GitHub Pages for deployment
