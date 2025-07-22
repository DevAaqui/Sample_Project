# SafePulse Server - Quick Setup Guide

## Prerequisites

- Node.js (v16+)
- MySQL (v8.0+)
- npm or yarn

## Quick Start

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   ```bash
   cp env.example .env
   # Edit .env with your MySQL credentials
   ```

3. **Set up database**

   ```bash
   npm run setup
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

## Default Admin Account

- **Email**: admin@safepulse.com
- **Password**: admin123

## API Base URL

- **Development**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## Database Tables Created

- `users` - User accounts and authentication
- `guests` - Guest information and access
- `vehicles` - Transportation vehicles
- `rides` - Transportation activities
- `activities` - User/guest activity tracking
- `alerts` - Notifications and alerts
- `health_metrics` - Health monitoring data
- `safety_reports` - Safety incident reports
- `maintenance_records` - Maintenance tracking

## Key Features

- ✅ JWT Authentication
- ✅ Role-based Access Control
- ✅ User Management
- ✅ Guest Management
- ✅ Transportation Management
- ✅ Activity Tracking
- ✅ Health Monitoring
- ✅ Safety Management
- ✅ Alert System
- ✅ Maintenance Tracking

## Next Steps

1. Test the API endpoints using Postman or similar
2. Connect the frontend (safepulse directory)
3. Customize models and routes as needed
4. Add more features and business logic
