# Vegas Jackpot Slots - A Slot Machine Game

A full-stack slot machine game where the house always wins! Built with React, Node.js, Express, and MongoDB.

## Features

- Simple slot machine with 3 blocks in 1 row
- 4 possible symbols with different rewards:
  - Cherry (C): 10 credits
  - Lemon (L): 20 credits
  - Orange (O): 30 credits
  - Watermelon (W): 40 credits
- Players start with 10 credits
- Pulling the lever costs 1 credit
- Server-side game session management
- Progressive cheating system:
  - Credits < 40: Truly random spins
  - 40 ≤ Credits < 60: 30% chance of re-rolling winning spins
  - Credits ≥ 60: 60% chance of re-rolling winning spins
- Tricky "CASH OUT" button that has a 50% chance of moving and a 40% chance of becoming unclickable

## Project Structure

```
/
├── frontend/                # React frontend
│   ├── public/              # Public assets
│   └── src/                 # Source files
│       ├── components/      # React components
│       ├── hooks/           # Custom React hooks
│       ├── services/        # API services
│       └── types/           # TypeScript types
└── backend/                 # Node.js Express backend
    ├── src/                 # Source files
    │   ├── controllers/     # API controllers
    │   ├── models/          # MongoDB models
    │   ├── routes/          # API routes
    │   ├── services/        # Business logic
    │   └── tests/           # Unit tests
    └── .env                 # Environment variables example
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
    cd frontend
    npm install
   
    cd ../backend
    npm install
   ```
3. Create a `.env` file in the `backend` directory  
4. Start the development servers:
   ```bash
   # In backend directory
   npm run dev
   
   # In frontend directory (new terminal)
   npm run dev
   ```

## Testing

Run backend tests:
```bash
 cd backend
 npm test
```

## Technologies Used

- **Frontend**:
  - React with TypeScript
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Axios for API requests
  - React Toastify for notifications
  - Lucide for icons

- **Backend**:
  - Node.js with Express
  - TypeScript
  - MongoDB with Mongoose
  - Jest for testing

