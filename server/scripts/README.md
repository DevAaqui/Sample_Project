1- Rides table need to be filled via node scripts/seedRides.js
2- wearable devices needs to be filled via node scripts/seedWearableDevices.js
3- Guest and Wearable devices needs to be created and updated via 
cmd: node scripts/seedGuestsAndDevices.js
Guests and wearable device will get update every one minute
4- Guest Metrics needs to be created every 2 minutes using 
cmd: node scripts/seedGuestMetricsContinuous.js 2 --continuous

5- Ride Sessions and Ride Metrics needs to be fulfilled
shell script
# Create 50 ride sessions (default)
node scripts/seedRideSessionsAndMetrics.js

# Create specific number of sessions
node scripts/seedRideSessionsAndMetrics.js 100

# Clear existing data and recreate
node scripts/seedRideSessionsAndMetrics.js 50 --force

Note: scripts needs to be run on top to bottom
