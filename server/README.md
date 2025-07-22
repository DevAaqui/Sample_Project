# SafePulse Server

A comprehensive Node.js backend server for the SafePulse safety management system, built with Express, Sequelize, and MySQL.

## Features

- **User Management**: Complete user authentication and authorization system
- **Guest Management**: Track and manage guest access and activities
- **Transportation**: Manage rides, vehicles, and drivers
- **Activity Tracking**: Monitor user and guest activities
- **Health Monitoring**: Track health metrics and vital signs
- **Safety Management**: Report and track safety incidents
- **Alert System**: Real-time notifications and alerts
- **Maintenance Tracking**: Vehicle and system maintenance records

## Database Schema

### Core Tables

1. **users** - User accounts and authentication
2. **guests** - Guest information and access management
3. **vehicles** - Transportation vehicle management
4. **rides** - Transportation activities and trips
5. **activities** - User and guest activity tracking
6. **alerts** - Notification and alert system
7. **health_metrics** - Health monitoring data
8. **safety_reports** - Safety incident reports
9. **maintenance_records** - Maintenance tracking

### Key Relationships

- Users can have multiple rides, activities, health metrics, and safety reports
- Guests belong to hosts (users) and can have activities and alerts
- Vehicles can have multiple rides and maintenance records
- Rides are associated with passengers, drivers, and vehicles

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env
   ```

   Edit `.env` file with your database credentials:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=safepulse_db
   DB_USER=your_username
   DB_PASSWORD=your_password
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Create MySQL database**

   ```sql
   CREATE DATABASE safepulse_db;
   ```

5. **Run database migrations**

   ```bash
   npm run db:migrate
   ```

6. **Start the server**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile

### Users

- `GET /api/users` - Get all users (admin/manager)
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user (admin)
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)

### Guests

- `GET /api/guests` - Get all guests
- `GET /api/guests/:id` - Get guest by ID
- `POST /api/guests` - Create new guest
- `PUT /api/guests/:id` - Update guest
- `POST /api/guests/:id/checkin` - Check in guest
- `POST /api/guests/:id/checkout` - Check out guest
- `DELETE /api/guests/:id` - Delete guest

### Rides

- `GET /api/rides` - Get all rides
- `POST /api/rides` - Create new ride

### Vehicles

- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create new vehicle

### Activities

- `GET /api/activities` - Get all activities

### Alerts

- `GET /api/alerts` - Get all alerts

### Health

- `GET /api/health` - Get health metrics

### Safety

- `GET /api/safety` - Get safety reports

### Maintenance

- `GET /api/maintenance` - Get maintenance records

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## User Roles

- **admin**: Full system access
- **manager**: Management-level access
- **staff**: Standard user access
- **guest**: Limited access

## Development

### Scripts

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:reset` - Reset database (drop, create, migrate, seed)

### Environment Variables

| Variable         | Description       | Default               |
| ---------------- | ----------------- | --------------------- |
| `DB_HOST`        | Database host     | localhost             |
| `DB_PORT`        | Database port     | 3306                  |
| `DB_NAME`        | Database name     | safepulse_db          |
| `DB_USER`        | Database username | root                  |
| `DB_PASSWORD`    | Database password | -                     |
| `PORT`           | Server port       | 5000                  |
| `NODE_ENV`       | Environment       | development           |
| `JWT_SECRET`     | JWT secret key    | -                     |
| `JWT_EXPIRES_IN` | JWT expiration    | 24h                   |
| `CORS_ORIGIN`    | CORS origin       | http://localhost:3000 |

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation with express-validator

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "stack": "Error stack trace (development only)"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License
