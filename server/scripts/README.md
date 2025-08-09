# Database Seeding Scripts

This directory contains scripts to populate the SafePulse database with sample data for testing and development.

## Scripts Overview

### 1. `seedAll.js` - Master Seeding Script

Seeds all data types: users, guests, and rides.

**Usage:**

```bash
# Seed with default 50 guests
npm run seed:all

# Seed with custom number of guests
node scripts/seedAll.js 100
```

**What it creates:**

- 3 admin users (admin, manager, staff)
- 50 guests with wearable devices and health metrics
- 10 rides with sessions and metrics

### 2. `seedGuests.js` - Guest Data Seeding

Creates random guest data with realistic information.

**Usage:**

```bash
# Seed with default 50 guests
npm run seed:guests

# Seed with custom number of guests
node scripts/seedGuests.js 25
```

**What it creates:**

- Random guest profiles with realistic names, emails, phone numbers
- Health data (heart rate ranges, weight, height)
- Emergency contact information
- Medical conditions and allergies
- Wearable devices for each guest
- Health metrics (heart rate, blood pressure, steps, calories)

### 3. `seedRides.js` - Ride Data Seeding

Creates amusement park rides with sessions and metrics.

**Usage:**

```bash
npm run seed:rides
```

**What it creates:**

- 10 different rides (roller coasters, water rides, family rides, etc.)
- Ride sessions linking guests to rides
- Real-time metrics during ride sessions

## Available Commands

### Seeding Commands

```bash
# Seed everything (users + guests + rides)
npm run seed:all

# Seed only guests
npm run seed:guests

# Seed only rides
npm run seed:rides

# Seed only users (no guests)
npm run seed:users
```

### Clearing Commands

```bash
# Clear all data
npm run clear:all

# Clear only guest data
npm run clear:guests

# Clear only ride data
npm run clear:rides
```

## Default Admin Users

After running `seed:all` or `seed:users`, you'll have these admin accounts:

| Username | Password   | Role    | Email                 |
| -------- | ---------- | ------- | --------------------- |
| admin    | admin123   | admin   | admin@safepulse.com   |
| manager  | manager123 | manager | manager@safepulse.com |
| staff    | staff123   | staff   | staff@safepulse.com   |

## Sample Data Generated

### Guest Data Includes:

- **Personal Info:** Name, DOB, gender, email, phone
- **Health Data:** Baseline heart rate, safe ranges, weight, height
- **Medical Info:** Known conditions, allergies
- **Emergency Contact:** Name and phone number
- **Wearable Device:** Device type, serial number, assignment date
- **Health Metrics:** Heart rate, blood pressure, steps, calories burned

### Ride Data Includes:

- **Ride Info:** Name, type, height requirements, heart rate limits
- **Physical Data:** G-force, duration
- **Sessions:** Guest-ride interactions with timing
- **Metrics:** Real-time heart rate and G-force during rides

## Data Realism

The scripts generate realistic data:

- **Names:** Common first and last names
- **Emails:** Based on name with random numbers
- **Phone Numbers:** Valid US format (XXX-XXX-XXXX)
- **Health Data:** Realistic ranges for heart rate, weight, height
- **Dates:** Recent dates for sessions and metrics
- **Medical Info:** Common conditions and allergies

## Dependencies

- Requires database connection to be configured
- Requires all models to be properly set up
- Requires `bcryptjs` for password hashing

## Error Handling

All scripts include proper error handling and will:

- Log progress to console
- Handle database connection errors
- Skip existing data (won't duplicate)
- Provide clear error messages

## Customization

You can modify the scripts to:

- Change the number of records generated
- Adjust data ranges (age, heart rate, etc.)
- Add new data types
- Modify the realism of generated data

## Notes

- Run `seed:all` first to set up everything
- Guests must exist before seeding rides (due to foreign key constraints)
- The scripts are idempotent - running them multiple times won't create duplicates
- Clear data before re-seeding if you want fresh data
