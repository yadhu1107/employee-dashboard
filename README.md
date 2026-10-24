# Employee Portal — React Assignment 2

A minimal Employee Dashboard built with React, Vite, React Router DOM, and Bootstrap.

## Features

- Navbar links for Home and Employee Form.
- Dashboard fetches users from `https://jsonplaceholder.typicode.com/users`.
- Displays employee ID, name, and email in a responsive table.
- Employee form fields: Name, Designation, Location, and Salary.
- Form submission is local only; it does **not** send a POST request or save data to a backend.
- Responsive slate-purple and blush theme with subtle geometric accents.

## Requirements

- Node.js and npm installed.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Create a production build

```bash
npm run build
npm run preview
```

## GitHub submission

Create a public repository on GitHub, then from this project folder run:

```bash
git init
git add .
git commit -m "Complete Employee Dashboard Assignment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/employee-dashboard.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username. If Git is already initialized and the remote is configured, use `git add .`, `git commit`, and `git push` instead.
