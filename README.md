# PassOP — Password Manager (MongoDB)

A simple password manager with a React + Vite frontend and a Node.js backend using MongoDB.

## Features

- Save, view, and manage passwords locally via a backend API (MongoDB).
- Lightweight React front-end (Vite) and minimal Express-style backend.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js (server.js), Express-style handlers
- Database: MongoDB (Atlas or self-hosted)

## Prerequisites

- Node.js (v18+ recommended)
- npm (bundled with Node)
- A MongoDB connection URI (MongoDB Atlas or local)

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/Tanish018/PassOP-With-MongoDB.git
cd passop-MongoDB
```

2. Install and run the frontend:

```bash
npm install
npm run dev
```

This runs the Vite development server (usually at `http://localhost:5173`).

3. Install and run the backend:

```bash
cd backend
npm install
# Start backend server (option A)
node server.js

# Or add a script in `backend/package.json`:
# "start": "node server.js"
# then run: npm start
```

The backend will listen on the port configured inside `server.js` (commonly `process.env.PORT` or `5000`).

## Environment Variables

Create a `.env` file in the `backend/` folder with at least the following:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
# Optionally: JWT_SECRET=your_jwt_secret
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas URI or local connection string.

## Project Structure

- `src/` — React app source
- `public/` — static assets
- `backend/` — Node.js server and backend code

## Notes & Next Steps

- The backend `package.json` currently has no `start` script; you can add one as shown above.
- Consider adding instructions for seeding data, API docs, or Postman collection if needed.

## Contributing

Contributions are welcome — open issues or submit pull requests.

## License

This project is provided as-is. Add a license file if you plan to publish publicly.

