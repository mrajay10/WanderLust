# WanderLust 🏡

An Airbnb-inspired listing platform built with the MERN-adjacent stack (Express + MongoDB + EJS). Users can browse, create, edit, and delete property listings, and leave reviews on them.

## Features

- **Listings CRUD** — create, view, update, and delete property listings
- **Reviews** — add and delete reviews tied to a specific listing
- **Server-side validation** — Joi-based schema validation for listings and reviews
- **Custom error handling** — centralized error middleware with a dedicated error page
- **Method override** — supports PUT/DELETE via HTML forms
- **Templating** — EJS with `ejs-mate` for layout support

## Tech Stack

| Layer      | Technology            |
|------------|------------------------|
| Runtime    | Node.js                |
| Framework  | Express.js             |
| Database   | MongoDB + Mongoose     |
| Templating | EJS + ejs-mate         |
| Validation | Joi                    |
| Utilities  | method-override        |

## Project Structure

```
WanderLust/
├── app.js                  # Main server entry point
├── schema.js                # Joi validation schemas (listingSchema, reviewSchema)
├── models/
│   ├── listing.js           # Listing Mongoose model
│   └── review.js            # Review Mongoose model
├── utils/
│   ├── wrapAsync.js         # Async error wrapper for route handlers
│   └── ExpressError.js      # Custom error class
├── views/
│   ├── listings/            # index, new, show, edit templates
│   └── error.ejs            # Error page
└── public/                  # Static assets (CSS, JS, images)
```

## Routes

| Method | Route                              | Description                  |
|--------|-------------------------------------|-------------------------------|
| GET    | `/listings`                         | View all listings             |
| GET    | `/listings/new`                     | Form to create a new listing  |
| POST   | `/listings`                         | Create a new listing          |
| GET    | `/listings/:id`                     | View a single listing         |
| GET    | `/listings/:id/edit`                | Form to edit a listing        |
| PUT    | `/listings/:id`                     | Update a listing               |
| DELETE | `/listings/:id`                     | Delete a listing               |
| POST   | `/listings/:id/reviews`             | Add a review to a listing     |
| DELETE | `/listings/:id/reviews/:reviewId`   | Delete a review                |

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB running locally (`mongod`) on the default port `27017`

### Installation

```bash
git clone https://github.com/mrajay10/WanderLust.git
cd WanderLust
npm install
```

### Running the app

Make sure MongoDB is running locally, then start the server:

```bash
node app.js
```

The app will connect to the local database `wanderlust` and start listening on:

```
http://localhost:8080
```

You should see:
```
Connection Successful
Server is listening to port 8080
```

## Notes

- Uses a wildcard catch-all route (`/*splat`) to handle 404s for undefined routes.
- All async route handlers are wrapped with `wrapAsync` to forward errors to the centralized error handler instead of needing try/catch everywhere.
- Listing and review validation errors return a `400` status with a combined error message via `ExpressError`.

## License

This project is for educational purposes as part of a personal MERN stack learning project.
