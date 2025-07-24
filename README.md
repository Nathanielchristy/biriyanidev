# Biriyaniwala Backend

## Setup Instructions

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Create a `.env` file in the backend directory with the following variables:**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CORS_ORIGIN=http://localhost:3000 # or your frontend URL
   NODE_ENV=development # or production
   ```
3. **Run the server:**
   ```sh
   node server.js
   ```

## Environment Variables
| Variable      | Description                        |
|---------------|------------------------------------|
| PORT          | Port for the server (default: 5000)|
| MONGO_URI     | MongoDB connection string          |
| JWT_SECRET    | Secret for JWT signing             |
| CORS_ORIGIN   | Allowed CORS origin(s)             |
| NODE_ENV      | Set to 'development' or 'production'|

## API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
  - Body: `{ name, email, password }`
- `POST /api/auth/login` — Login
  - Body: `{ email, password }`
- `GET /api/auth/profile` — Get current user profile (requires JWT)

### Menu
- `GET /api/menu/` — List all available menu items
- `GET /api/menu/:id` — Get menu item by ID
- `POST /api/menu/` — Create menu item (admin only)
- `PUT /api/menu/:id` — Update menu item (admin only)
- `DELETE /api/menu/:id` — Delete menu item (admin only)

### Orders
- `POST /api/orders/` — Place a new order (customer only)
- `GET /api/orders/` — Get orders (customer: own, admin: all)
- `GET /api/orders/:id` — Get order by ID
- `PUT /api/orders/:id/status` — Update order status (admin only)

### Health Check
- `GET /health` — Returns `{ status: 'ok' }`

## Notes
- All protected routes require a JWT in the `Authorization: Bearer <token>` header.
- Admin-only routes require the user to have the `admin` role.
- Input validation and error handling are enforced on all endpoints.
- Logs are written to `logs/` directory. 