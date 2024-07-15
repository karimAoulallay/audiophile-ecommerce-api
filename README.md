# Audiophile E-commerce API

## Project Overview

Audiophile E-commerce API is the backend part of the Audiophile E-commerce application. This API handles user authentication, user authorization and cart management. This repository contains the server-side (backend) part of the application, built with Node.js and Express, interacting with a MongoDB database. The project aims to simulate a real-world e-commerce application, demonstrating full-stack development skills to potential recruiters.

You can find the client-side (frontend) repository [here](https://github.com/karimAoulallay/audiophile-ecommerce).

## Tech Stack

**Frontend:**

- React
- React Router
- Context API
- Fetch API
- TailwindCSS
- Vite

**Backend:**

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication

## Features

- User authentication (registration, login, auto-login using refresh tokens)
- Product management (create, read, update, delete products)
- Cart management
- Using HTTP-only cookies for authentication to protect against CSRF attacks

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository

```sh
git clone git@github.com:karimAoulallay/audiophile-ecommerce-api.git
```

2. Navigate to the cloned repository

```sh
cd audiophile-ecommerce-api
```

3. Install dependencies

```sh
npm install
```

4. Create a .env file in the root directory and add the following environment variables:

```sh
MONGO_URI=<your_mongo_db_connection_string>
JWT_REFRESH_SECRET=<your_jwt_refresh_secret>
JWT_ACCESS_SECRET=<your_jwt_access_secret>
CLIENT_ORIGIN=<your_client_server_url>
```

5. Run products seeder

```sh
node ./seeders/productsSeeder.js
```

6. Start the server

```sh
npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
