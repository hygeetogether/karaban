# CaravanShare

CaravanShare is a peer-to-peer caravan sharing platform that allows users to list their caravans and others to book them for their next adventure.

## Features

- **User Accounts**: Sign up as a Guest or Host.
- **Caravan Listings**: Hosts can list caravans with photos, amenities, and pricing.
- **Search & Filter**: Guests can search for caravans by location and price.
- **Reservations**: Guests can book caravans for specific dates.
- **Payments**: Mock payment integration to confirm bookings.
- **Reviews**: Guests can leave reviews and ratings for caravans.

## Tech Stack

- **Backend**: Node.js, Express, TypeScript, Prisma, SQLite (Dev) / PostgreSQL (Prod)
- **Frontend**: React, TypeScript, Vite, CSS Modules
- **Testing**: Jest (Backend)

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd karaban
    ```

2.  **Backend Setup**
    ```bash
    # Install dependencies
    npm install

    # Initialize Database
    npx prisma migrate dev --name init
    npx prisma generate
    npm run seed # Optional: Seed with dummy data

    # Start Backend Server
    npm run dev
    ```
    The backend runs on `http://localhost:3000`.

3.  **Frontend Setup**
    ```bash
    cd frontend

    # Install dependencies
    npm install

    # Start Frontend Server
    npm run dev
    ```
    The frontend runs on `http://localhost:5173`.

## Project Structure

- `src/`: Backend source code (Controllers, Services, Repositories, Models)
- `frontend/`: Frontend React application
- `prisma/`: Database schema and migrations
- `tests/`: Backend unit tests

## API Documentation

- `GET /caravans`: List all caravans (supports filtering)
- `GET /caravans/:id`: Get caravan details
- `POST /reservations`: Create a reservation
- `POST /payments`: Process a payment
- `POST /reviews`: Submit a review

## License

MIT
