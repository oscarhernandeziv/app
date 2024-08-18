# PARSUS - Expense Tracker Web App

## Overview

As a way of teaching myself the fundamentals of modern full-stack web development, I've followed a tutorial to create a practical, real-world application using best practices and bleeding-edge technologies. This project, which I've named PARSUS, allows a user to register via email, create and manage expenses, and (soon) even view detailed expense reports.

## Live Demo

https://parsus.fly.dev/

## Tech Stack

- Complete expense tracker app built from scratch using react 18/19, bun, and hono
- 100% backend and frontend TypeScript with validation using Zod
- Hono Typescript RPC for type-safe HTTP requests
- User auth managed by Kinde Auth
- Tanstack Router, Query, and Form for the best UX and DX in an SPA
- Drizzle ORM for all interactions with a Postgres Database
- Clean, modern UI using tailwind & shadcn-ui

## Key Features

- User authentication and authorization
- Full CRUD functionality for expenses
- Date picker for selecting expense dates
- Responsive design for mobile and desktop use

## Project Structure

```
.
├── Dockerfile
├── README.md
├── drizzle/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   └── routes/
├── server/
│   ├── db/
│   └── routes/
└── package.json
```

- `frontend/`: Contains the React application
- `server/`: Houses the Hono backend
- `drizzle/`: Includes database migration files

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   bun install
   ```
3. Set up your environment variables
4. Run the development server:
   ```
   bun run dev
   ```

## Deployment

The application is containerized using Docker and can be deployed to Fly.io or any other container-friendly hosting platform.

## Acknowledgements

This project was completed by following [this tutorial](https://www.youtube.com/watch?v=jXyTIQOfTTk&t=3145s) (courtesy of [Sam Meech-Ward](https://github.com/meech-ward)), which provided great guidance and context all along the way.

## Future Improvements

- Implement data visualization for expense trends
- Add budget setting and tracking features
- Integrate with third-party financial services
