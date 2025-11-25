# System Design Document - CaravanShare

## 1. Architecture Overview

CaravanShare follows a **Layered Architecture** to separate concerns and ensure maintainability.

### Layers

1.  **Presentation Layer (Frontend)**
    - Built with React and TypeScript.
    - Communicates with the backend via REST API using Axios.
    - Components are organized by Pages and reusable UI components.

2.  **API Layer (Backend Controllers)**
    - Built with Express.js.
    - Handles HTTP requests, parses input, and sends responses.
    - Delegates business logic to the Service Layer.

3.  **Service Layer (Business Logic)**
    - Contains the core business rules (e.g., calculating prices, validating dates).
    - Orchestrates data flow between Controllers and Repositories.
    - Transaction management (if needed).

4.  **Data Access Layer (Repositories)**
    - Abstracts the database interactions.
    - Uses Prisma ORM to query SQLite/PostgreSQL.
    - Provides a clean interface for the Service Layer.

## 2. Database Schema

### Users
- `id`: Int (PK)
- `email`: String (Unique)
- `name`: String
- `role`: Enum (GUEST, HOST)

### Caravans
- `id`: Int (PK)
- `ownerId`: Int (FK -> Users)
- `name`: String
- `description`: String
- `location`: Json
- `pricePerDay`: Float
- `amenities`: Json
- `images`: Json

### Reservations
- `id`: Int (PK)
- `userId`: Int (FK -> Users)
- `caravanId`: Int (FK -> Caravans)
- `startDate`: DateTime
- `endDate`: DateTime
- `status`: Enum (PENDING, CONFIRMED, CANCELLED)
- `totalPrice`: Float

### Reviews
- `id`: Int (PK)
- `userId`: Int (FK -> Users)
- `caravanId`: Int (FK -> Caravans)
- `rating`: Int (1-5)
- `comment`: String

### Payments
- `id`: Int (PK)
- `reservationId`: Int (FK -> Reservations)
- `amount`: Float
- `status`: Enum (PENDING, COMPLETED, FAILED)

## 3. Key Flows

### Reservation Flow
1.  User selects dates on `CaravanDetailPage`.
2.  Frontend calls `POST /reservations`.
3.  Backend validates availability and creates a `PENDING` reservation.
4.  User is redirected to `PaymentPage`.
5.  User submits payment (`POST /payments`).
6.  Backend processes payment and updates reservation status to `CONFIRMED`.

### Search Flow
1.  User enters location/price on `CaravanListPage`.
2.  Frontend calls `GET /caravans?location=...&minPrice=...`.
3.  Backend filters caravans using Prisma queries (or in-memory for complex JSON fields).
4.  Results are displayed to the user.

## 4. Future Improvements

- **Authentication**: Replace mock login with JWT/OAuth.
- **Real Payments**: Integrate Stripe or PayPal.
- **Map Integration**: Visual search using Google Maps or Leaflet.
- **Image Upload**: Store images in S3 instead of local/DB.
