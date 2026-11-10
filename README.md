# Fintrack

Fintrack is a full-stack personal finance and expense tracking application designed to help users monitor spending, understand patterns, and stay in control of their money. The app combines a modern React frontend with a secure Spring Boot backend to provide a clean, responsive dashboard for managing transactions, analyzing monthly trends, and maintaining financial awareness.

## Overview

Fintrack allows users to:

- Create, view, edit, and delete expenses
- Track spending by title, description, amount, category, and date
- Search and filter transactions by category and keyword
- Export transaction data as CSV
- Review a summary dashboard of current-month spending
- Analyze category-wise spending and monthly trends
- Register and log in securely
- Verify email accounts and sign in with Google OAuth

The project is structured as a split-stack application:

- Frontend: React + Vite + Tailwind CSS
- Backend: Java + Spring Boot + Spring Security + JPA
- Database: PostgreSQL

## Features

### Authentication

- Email/password registration and login
- Email verification for new accounts
- Google OAuth login
- JWT-based session handling
- Protected routes for authenticated users only

### Expense management

- Add new expenses with validation
- Update existing expense entries
- Delete transactions with confirmation
- Search transactions by title or note text
- Filter by category
- Sort transaction history

### Dashboard and analytics

- Monthly total spending overview
- Average spend per transaction
- Transaction count summaries
- Charts for spending over time
- Category breakdown and contribution percentages
- Trend tracking across months

### User experience

- Responsive design for desktop and mobile
- Dark mode support
- Clean dashboard layout
- Landing page and auth screens
- Modern motion and UI transitions

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Zustand
- React Hook Form
- Zod
- Recharts
- Tailwind CSS 4
- Lucide React
- Motion

### Backend

- Java 21
- Spring Boot 4.1.0
- Spring Web MVC
- Spring Data JPA
- Spring Security
- OAuth2 Client
- Validation
- PostgreSQL Driver
- Lombok
- JWT (`jjwt`)
- Spring Mail

### Database

- PostgreSQL

### Development tools

- Maven
- npm
- Vite dev server
- Spring Boot Maven plugin

## Project Structure

```text
fintrack/
├── README.md
├── backend/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   └── src/
│       ├── main/
│       │   ├── java/com/example/fintrack/
│       │   └── resources/
│       └── test/
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
```

## Backend Architecture

The backend is built around a Spring Boot REST API with layered architecture:

- Controller layer for REST endpoints
- Service layer for business logic
- Repository layer for database access using Spring Data JPA
- Entity model for users and expenses
- Security configuration for authentication and route protection
- Exception handling for consistent API responses

Main backend responsibilities include:

- User registration and login
- Email verification flow
- JWT issuance and validation
- OAuth2 login support
- Expense CRUD operations tied to the authenticated user

## Frontend Architecture

The frontend is a single-page application with route-based screens:

- Landing page
- Login / Register screen
- Email verification page
- Dashboard
- Transactions page
- Insights page
- OAuth callback handling

Application state is managed centrally using Zustand, while UI validation is handled with React Hook Form and Zod.

## Configuration

The backend uses environment variables defined in `application.yml`:

```properties
server:
  port: 8000
  servlet.context-path: /api/v1

spring:
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/fintrack}
    username: ${DB_USERNAME:fintrack}
    password: ${DB_PASSWORD:}

  security:
    oauth2:
      client:
        registration:
          google:
            client-id: ${GOOGLE_CLIENT_ID}
            client-secret: ${GOOGLE_CLIENT_SECRET}

app:
  mail:
    from: ${MAIL_USERNAME}
  frontend-url: ${FRONTEND_URL:http://localhost:5173}
  jwt:
    secret: ${JWT_SECRET}
    expiration: 86400000
```

Required environment variables:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `JWT_SECRET`
- `FRONTEND_URL`

## Running the Project

### 1. Start the backend

From the `backend` directory:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The backend runs on:

- `http://localhost:8000/api/v1`

### 2. Start the frontend

From the `frontend` directory:

```bash
npm install
npm run dev
```

The frontend runs on:

- `http://localhost:5173`

## Typical User Flow

1. Create an account or sign in with Google.
2. Verify the email address if required.
3. Add daily expenses from the dashboard or transactions page.
4. Use filters and searches to review spending history.
5. View monthly and category-based insights to spot patterns.
6. Export records when needed for reporting or personal review.

## Notes

This application is designed as a personal finance dashboard rather than a large enterprise finance system. It focuses on clarity, usability, and a strong user experience for keeping track of day-to-day spending and understanding monthly financial patterns.

## License

This project is currently distributed without a formal license declaration in the repository metadata.
