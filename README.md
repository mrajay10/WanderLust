# WanderLust 🏡

An Airbnb-inspired full-stack property listing platform built with **Node.js, Express.js, MongoDB, Mongoose, and EJS**.

WanderLust allows users to browse property listings, create and manage their own listings, upload listing images, authenticate with a local account, and add reviews to listings.

## ✨ Features

- 🏠 **Listings CRUD** — create, view, edit, and delete property listings
- ⭐ **Reviews** — add and delete reviews for listings
- 🔐 **User Authentication** — signup/login/logout using Passport and Passport Local Mongoose
- 👤 **Authorization** — only authenticated users can create listings; listing owners can manage their listings
- 🛡️ **Review Authorization** — only review authors can delete their reviews
- ✅ **Server-side Validation** — Joi validation for listings and reviews
- ☁️ **Cloudinary Image Uploads** — listing images are stored using Cloudinary and Multer
- 🗺️ **Mapbox Integration** — supports map/location functionality for listings
- 💬 **Flash Messages** — success and error feedback through `connect-flash`
- 💾 **MongoDB Sessions** — sessions are stored using `connect-mongo`
- 🧩 **EJS + EJS-Mate** — server-side rendering with reusable layouts
- 🔄 **Method Override** — supports PUT/DELETE-style form requests
- ⚠️ **Centralized Error Handling** — custom `ExpressError` middleware and error page
- 🚫 **404 Handling** — undefined routes are handled by a custom 404 error (Express 5 `/*splat` wildcard)

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js 24.17.0 |
| Backend | Express.js 5 |
| Database | MongoDB Atlas + Mongoose |
| Templating | EJS + EJS-Mate |
| Authentication | Passport.js + Passport Local Mongoose |
| Validation | Joi |
| Sessions | Express Session + Connect Mongo |
| Image Upload | Multer + Cloudinary |
| Maps | Mapbox SDK |
| Flash Messages | Connect Flash |
| HTTP Method Override | Method Override |
| Hosting | Render |

## 📁 Project Structure

```text
WanderLust/
├── app.js
├── package.json
├── package-lock.json
├── schema.js
├── middleware.js
├── cloudConfig.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── listings/
|   |    ├── edit.ejs
|   |    ├── index.ejs
|   |    ├── new.ejs
|   |    └── show.ejs
│   ├── users/
|   |    ├── login.ejs.ejs
|   |    └── signup.ejs
│   ├── layouts/
|   |    └── boilerplate.ejs
|   ├── includes/
|   |    ├── flash.ejs
|   |    ├── footer.ejs
|   |    └── navbar.ejs
│   └── error.ejs
│
└── public/
    ├── css/
    |   ├── rating.css
    |   └── style.css
    └── js/
         ├── script.js
         └── map.js
```

## 🔑 Environment Variables

Create a `.env` file in the project root.

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_token

ATLASDB_URL=your_mongodb_atlas_connection_string

SECRET=your_session_secret
```

**Important:** Never commit `.env` to GitHub. Keep API keys, database credentials, and session secrets private.

The application loads environment variables with `dotenv` in non-production environments, uses `ATLASDB_URL` for the MongoDB connection and Mongo-backed session store, and uses `SECRET` to sign sessions and encrypt the session store.

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/mrajay10/WanderLust.git
cd WanderLust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env` and add the required credentials described above.

### 4. Start the application

```bash
node app.js
```

For development with Nodemon:

```bash
nodemon app.js
```

The server runs on:

```text
http://localhost:8080
```

## 🔐 Authentication & Authorization

Passport is configured with a local authentication strategy (`passport-local` + `passport-local-mongoose`). User sessions are serialized/deserialized through the User model.

The application also contains middleware for:

- checking whether a user is logged in (`isLoggedIn`)
- preserving the requested redirect URL (`saveRedirectUrl`)
- checking listing ownership (`isOwner`)
- validating listing data (`validateListing`)
- validating review data (`validateReview`)
- checking review ownership (`isReviewAuthor`)

## ☁️ Cloudinary

Cloudinary is configured for listing image uploads via `multer-storage-cloudinary`.

Uploaded images are stored in the:

```text
wanderlust_DEV
```

folder, with PNG, JPG, and JPEG formats supported.

## 🗺️ Mapbox

Mapbox is used for map/location functionality. The Mapbox token is supplied through the `MAP_TOKEN` environment variable rather than hard-coded into the project.

## 🧪 Validation

Joi schemas validate listing and review data before it reaches the database.

### Listing validation

A listing requires:

- title
- description
- location
- country
- price

The price must be a non-negative number.

### Review validation

A review requires:

- rating from 1 to 5
- comment

## 🛣️ Main Routes

### Listings

| Method | Route | Description |
|---|---|---|
| GET | `/listings` | Display all listings |
| GET | `/listings/new` | Show create-listing form (auth required) |
| POST | `/listings` | Create a listing (auth required) |
| GET | `/listings/:id` | Show one listing |
| GET | `/listings/:id/edit` | Show edit form (owner only) |
| PUT | `/listings/:id` | Update a listing (owner only) |
| DELETE | `/listings/:id` | Delete a listing (owner only) |

### Reviews

| Method | Route | Description |
|---|---|---|
| POST | `/listings/:id/reviews` | Add a review (auth required) |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review (author only) |

### Users

| Method | Route | Description |
|---|---|---|
| GET | `/signup` | Show signup form |
| POST | `/signup` | Register a new user |
| GET | `/login` | Show login form |
| POST | `/login` | Log in |
| GET | `/logout` | Log out |

## 🧱 Middleware

The project uses custom middleware for application-level security and validation:

```text
isLoggedIn
saveRedirectUrl
isOwner
validateListing
validateReview
isReviewAuthor
```

These middleware functions protect listing/review operations and validate incoming data before controller logic executes.

## ⚙️ Application Flow

```text
Browser
   │
   ▼
Express.js
   │
   ├── Passport Authentication
   ├── Session Management
   ├── Joi Validation
   ├── Route Middleware
   │
   ├───────────────┐
   ▼               ▼
MongoDB         Cloudinary
   │               │
   └───────┬───────┘
           ▼
         EJS
           │
           ▼
        Browser
```

## 🛡️ Error Handling

The application uses a custom `ExpressError` class and centralized error middleware.

Unknown routes are converted into a `404 - Page Not Found` error, while other errors are rendered through the application's error page.

## 📦 Important Dependencies

```text
express
mongoose
ejs
ejs-mate
passport
passport-local
passport-local-mongoose
express-session
connect-mongo
connect-flash
joi
multer
cloudinary
multer-storage-cloudinary
@mapbox/mapbox-sdk
method-override
dotenv
```

## 📌 Notes

- MongoDB credentials should be stored only in environment variables.
- Cloudinary credentials should never be exposed publicly.
- Mapbox tokens should be managed through environment configuration.
- `.env` should remain excluded from Git using `.gitignore`.
- The application listens on port `8080` locally.
- Render's free tier spins down on inactivity, so the first request after idle time will be slow (cold start).

## 🌐 Live Project

**Live Demo:** [https://wanderlust-lepl.onrender.com/listings](https://wanderlust-lepl.onrender.com/listings)

## 📚 Learning Goals

This project was created as a full-stack web-development learning project to practice:

- RESTful routing
- MVC architecture
- CRUD operations
- MongoDB and Mongoose
- Authentication and authorization
- Express middleware
- Server-side validation
- Image uploads
- Cloud storage
- Sessions and cookies
- EJS templating
- Map integration
- Error handling
- Deployment

## 📄 License

This project is intended for educational and learning purposes.
