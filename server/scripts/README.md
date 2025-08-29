1- Rides table need to be filled via node scripts/seedRides.js
2- wearable devices needs to be filled via node scripts/seedWearableDevices.js
3- Guest and Wearable devices needs to be created and updated via 
cmd: node scripts/seedGuestsAndDevices.js
Guests and wearable device will get update every one minute
4- Guest Metrics needs to be created every 2 minutes using 
cmd: node scripts/seedGuestMetricsContinuous.js 2 --continuous

Note scripts needs to be run on top to bottom
