const { Guest, WearableDevice, GuestMetric } = require("../models");
const { Op } = require("sequelize");

// Sample data arrays for generating random guests
const firstNames = [
  "John",
  "Jane",
  "Michael",
  "Sarah",
  "David",
  "Emily",
  "Robert",
  "Lisa",
  "James",
  "Maria",
  "William",
  "Jennifer",
  "Richard",
  "Linda",
  "Joseph",
  "Patricia",
  "Thomas",
  "Barbara",
  "Christopher",
  "Elizabeth",
  "Daniel",
  "Susan",
  "Matthew",
  "Jessica",
  "Anthony",
  "Sarah",
  "Mark",
  "Karen",
  "Donald",
  "Nancy",
  "Steven",
  "Betty",
  "Paul",
  "Helen",
  "Andrew",
  "Sandra",
  "Joshua",
  "Donna",
  "Kenneth",
  "Carol",
  "Kevin",
  "Ruth",
  "Brian",
  "Sharon",
  "George",
  "Michelle",
  "Timothy",
  "Laura",
  "Ronald",
  "Emily",
  "Jason",
  "Kimberly",
  "Edward",
  "Deborah",
  "Jeffrey",
  "Dorothy",
  "Ryan",
  "Lisa",
  "Jacob",
  "Nancy",
  "Gary",
  "Karen",
  "Nicholas",
  "Betty",
  "Eric",
  "Helen",
  "Jonathan",
  "Sandra",
  "Stephen",
  "Donna",
  "Larry",
  "Carol",
  "Justin",
  "Ruth",
  "Scott",
  "Julie",
  "Brandon",
  "Joyce",
  "Benjamin",
  "Virginia",
  "Samuel",
  "Victoria",
  "Frank",
  "Kelly",
  "Gregory",
  "Lauren",
  "Raymond",
  "Joan",
  "Alexander",
  "Evelyn",
  "Patrick",
  "Judith",
  "Jack",
  "Megan",
  "Dennis",
  "Cheryl",
  "Jerry",
  "Andrea",
  "Tyler",
  "Hannah",
  "Aaron",
  "Jacqueline",
  "Jose",
  "Martha",
  "Adam",
  "Gloria",
  "Nathan",
  "Teresa",
  "Henry",
  "Ann",
  "Douglas",
  "Sara",
  "Zachary",
  "Janice",
  "Peter",
  "Kathryn",
  "Kyle",
  "Natalie",
  "Walter",
  "Debra",
  "Ethan",
  "Diana",
  "Jeremy",
  "Brenda",
  "Harold",
  "Pamela",
  "Carl",
  "Nicole",
  "Keith",
  "Emma",
  "Roger",
  "Helen",
  "Gerald",
  "Samantha",
  "Lawrence",
  "Katherine",
  "Sean",
  "Christine",
  "Arthur",
  "Debra",
  "Ryan",
  "Rachel",
  "Joe",
  "Carolyn",
  "Bryan",
  "Janet",
  "Billy",
  "Catherine",
  "Bruce",
  "Maria",
  "Willie",
  "Heather",
  "Jordan",
  "Diane",
  "Albert",
  "Julie",
  "Dylan",
  "Joyce",
  "Clarence",
  "Virginia",
  "Wayne",
  "Victoria",
  "Alan",
  "Kelly",
  "Juan",
  "Lauren",
  "Roy",
  "Joan",
  "Eugene",
  "Evelyn",
  "Ralph",
  "Judith",
  "Randy",
  "Megan",
  "Vincent",
  "Cheryl",
  "Russell",
  "Andrea",
  "Elijah",
  "Hannah",
  "Louis",
  "Jacqueline",
  "Bobby",
  "Martha",
  "Philip",
  "Gloria",
  "Johnny",
  "Teresa",
  "Earl",
  "Ann",
  "Jimmy",
  "Sara",
];

const lastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
  "Wright",
  "Scott",
  "Torres",
  "Nguyen",
  "Hill",
  "Flores",
  "Green",
  "Adams",
  "Nelson",
  "Baker",
  "Hall",
  "Rivera",
  "Campbell",
  "Mitchell",
  "Carter",
  "Roberts",
  "Gomez",
  "Phillips",
  "Evans",
  "Turner",
  "Diaz",
  "Parker",
  "Cruz",
  "Edwards",
  "Collins",
  "Reyes",
  "Stewart",
  "Morris",
  "Morales",
  "Murphy",
  "Cook",
  "Rogers",
  "Gutierrez",
  "Ortiz",
  "Morgan",
  "Cooper",
  "Peterson",
  "Bailey",
  "Reed",
  "Kelly",
  "Howard",
  "Ramos",
  "Kim",
  "Cox",
  "Ward",
  "Torres",
  "Peterson",
  "Gray",
  "Ramirez",
  "James",
  "Watson",
  "Brooks",
  "Kelly",
  "Sanders",
  "Price",
  "Bennett",
  "Wood",
  "Barnes",
  "Ross",
  "Henderson",
  "Coleman",
  "Jenkins",
  "Perry",
  "Powell",
  "Long",
  "Patterson",
  "Hughes",
  "Flores",
  "Washington",
  "Butler",
  "Simmons",
  "Foster",
  "Gonzales",
  "Bryant",
  "Alexander",
  "Russell",
  "Griffin",
  "Diaz",
  "Hayes",
  "Myers",
  "Ford",
  "Hamilton",
  "Graham",
  "Sullivan",
  "Wallace",
  "Woods",
  "Cole",
  "West",
  "Jordan",
  "Owens",
  "Reynolds",
  "Fisher",
  "Ellis",
  "Harrison",
  "Gibson",
  "McDonald",
  "Cruz",
  "Marshall",
  "Ortiz",
  "Gomez",
  "Murray",
  "Freeman",
  "Wells",
  "Webb",
  "Simpson",
  "Stevens",
  "Tucker",
  "Porter",
  "Hunter",
  "Hicks",
  "Crawford",
  "Henry",
  "Boyd",
  "Mason",
  "Morales",
  "Kennedy",
  "Warren",
  "Dixon",
  "Ramos",
  "Reyes",
  "Burns",
  "Gordon",
  "Shaw",
  "Holmes",
  "Rice",
  "Robertson",
  "Hunt",
  "Black",
  "Daniels",
  "Palmer",
  "Mills",
  "Nichols",
  "Grant",
  "Knight",
  "Ferguson",
  "Rose",
  "Stone",
  "Hawkins",
  "Dunn",
  "Perkins",
  "Hudson",
  "Spencer",
  "Gardner",
  "Stephens",
  "Payne",
  "Pierce",
  "Berry",
  "Matthews",
  "Arnold",
  "Wagner",
  "Willis",
  "Ray",
  "Watkins",
  "Olson",
  "Carroll",
  "Duncan",
  "Snyder",
  "Hart",
  "Cunningham",
  "Bradley",
  "Lane",
  "Andrews",
  "Ruiz",
  "Harper",
  "Fox",
  "Riley",
  "Armstrong",
  "Carpenter",
  "Weaver",
  "Greene",
  "Lawrence",
  "Elliott",
  "Chavez",
  "Sims",
  "Austin",
  "Peters",
  "Kelley",
  "Franklin",
  "Lawson",
  "Fields",
  "Gutierrez",
  "Ryan",
  "Schmidt",
  "Carr",
  "Vasquez",
  "Castillo",
  "Wheeler",
  "Chapman",
  "Oliver",
  "Montgomery",
  "Richards",
  "Williamson",
  "Johnston",
  "Banks",
  "Meyer",
  "Bishop",
  "McCoy",
  "Howell",
  "Alvarez",
  "Morrison",
  "Hansen",
  "Fernandez",
  "Garza",
  "Harvey",
  "Little",
  "Burton",
  "Stanley",
  "Nguyen",
  "George",
  "Jacobs",
  "Reid",
  "Kim",
  "Fuller",
  "Lynch",
  "Dean",
  "Gilbert",
  "Garrett",
  "Romero",
  "Welch",
  "Larson",
  "Frazier",
  "Burke",
  "Hanson",
  "Day",
  "Mendoza",
  "Moreno",
  "Bowman",
  "Medina",
  "Fowler",
  "Brewer",
  "Hoffman",
  "Carlson",
  "Silva",
  "Pearson",
  "Holland",
  "Douglas",
  "Fleming",
  "Jensen",
  "Vargas",
  "Byrd",
  "Davidson",
  "Hopkins",
  "May",
  "Terry",
  "Herrera",
  "Wade",
  "Soto",
  "Walters",
  "Curtis",
  "Neal",
  "Caldwell",
  "Lowe",
  "Jennings",
  "Barnett",
];

const genders = ["Male", "Female", "Other"];

const rideTypes = [
  "Roller Coaster",
  "Water Ride",
  "Family Ride",
  "Thrill Ride",
  "Kids Ride",
  "Dark Ride",
];

const deviceTypes = [
  "Smart Watch",
  "Fitness Band",
  "Health Monitor",
  "Safety Bracelet",
  "Activity Tracker",
];

// Helper function to get random item from array
const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Helper function to get random number between min and max
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper function to get random date between start and end
const getRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

// Helper function to generate random phone number
const generatePhoneNumber = () => {
  const areaCode = getRandomNumber(200, 999);
  const prefix = getRandomNumber(100, 999);
  const lineNumber = getRandomNumber(1000, 9999);
  return `${areaCode}-${prefix}-${lineNumber}`;
};

// Helper function to generate random email
const generateEmail = (firstName, lastName) => {
  const domains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "aol.com",
  ];
  const domain = getRandomItem(domains);
  const randomNum = getRandomNumber(1, 999);
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@${domain}`;
};

// Helper function to generate random date of birth (18-80 years old)
const generateDOB = () => {
  const today = new Date();
  const minAge = 18;
  const maxAge = 80;
  const minDate = new Date(
    today.getFullYear() - maxAge,
    today.getMonth(),
    today.getDate()
  );
  const maxDate = new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate()
  );
  return getRandomDate(minDate, maxDate);
};

// Helper function to generate random health data
const generateHealthData = () => {
  return {
    baseline_heart_rate: getRandomNumber(60, 100),
    safe_hr_max: getRandomNumber(120, 180),
    safe_hr_min: getRandomNumber(50, 80),
    weight_kg: getRandomNumber(45, 120) + Math.random(),
    height_cm: getRandomNumber(150, 200) + Math.random(),
    preferred_units: getRandomItem(["metric", "imperial"]),
  };
};

// Helper function to generate random emergency contact
const generateEmergencyContact = () => {
  const emergencyNames = [
    "Emergency Contact",
    "Spouse",
    "Parent",
    "Guardian",
    "Friend",
    "Relative",
  ];
  return {
    emergency_contact_name: getRandomItem(emergencyNames),
    emergency_contact_phone: generatePhoneNumber(),
  };
};

// Helper function to generate random conditions and allergies
const generateMedicalInfo = () => {
  const conditions = [
    "Hypertension",
    "Diabetes",
    "Asthma",
    "Heart Condition",
    "None",
  ];
  const allergies = ["Peanuts", "Dairy", "Gluten", "Shellfish", "None"];

  const knownConditions =
    getRandomItem(conditions) === "None" ? [] : [getRandomItem(conditions)];
  const allergiesList =
    getRandomItem(allergies) === "None" ? [] : [getRandomItem(allergies)];

  return {
    known_conditions: JSON.stringify(knownConditions),
    allergies: JSON.stringify(allergiesList),
  };
};

// Helper function to generate random wearable device
const generateWearableDevice = (guestId) => {
  const deviceType = getRandomItem(deviceTypes);
  const serialNumber = `DEV-${getRandomNumber(10000, 99999)}-${getRandomNumber(
    1000,
    9999
  )}`;
  const assignedDate = getRandomDate(new Date(2023, 0, 1), new Date());

  return {
    guest_id: guestId,
    device_type: deviceType,
    device_serial_number: serialNumber,
    assigned_date: assignedDate,
  };
};

// Helper function to generate random guest metrics
const generateGuestMetrics = (guestId, count = 5) => {
  const metrics = [];
  const baseDate = new Date(2024, 0, 1);

  for (let i = 0; i < count; i++) {
    const timestamp = getRandomDate(baseDate, new Date());
    const heartRate = getRandomNumber(60, 120);
    const bloodPressure = `${getRandomNumber(90, 140)}/${getRandomNumber(
      60,
      90
    )}`;
    const steps = getRandomNumber(1000, 15000);
    const caloriesBurned = getRandomNumber(50, 500);

    metrics.push({
      guest_id: guestId,
      timestamp: timestamp,
      heart_rate: heartRate,
      blood_pressure: bloodPressure,
      steps: steps,
      calories_burned: caloriesBurned,
    });
  }

  return metrics;
};

// Main function to seed guests
const seedGuests = async (count = 50) => {
  try {
    console.log(`Starting to seed ${count} guests...`);

    for (let i = 0; i < count; i++) {
      const firstName = getRandomItem(firstNames);
      const lastName = getRandomItem(lastNames);
      const gender = getRandomItem(genders);
      const dob = generateDOB();
      const email = generateEmail(firstName, lastName);
      const phoneNumber = generatePhoneNumber();

      const healthData = generateHealthData();
      const emergencyContact = generateEmergencyContact();
      const medicalInfo = generateMedicalInfo();

      // Create guest
      const guest = await Guest.create({
        first_name: firstName,
        last_name: lastName,
        dob: dob,
        gender: gender,
        email: email,
        phone_number: phoneNumber,
        emergency_contact_name: emergencyContact.emergency_contact_name,
        emergency_contact_phone: emergencyContact.emergency_contact_phone,
        known_conditions: medicalInfo.known_conditions,
        allergies: medicalInfo.allergies,
        baseline_heart_rate: healthData.baseline_heart_rate,
        safe_hr_max: healthData.safe_hr_max,
        safe_hr_min: healthData.safe_hr_min,
        weight_kg: healthData.weight_kg,
        height_cm: healthData.height_cm,
        preferred_units: healthData.preferred_units,
      });

      // Create wearable device for the guest
      const wearableDevice = generateWearableDevice(guest.guest_id);
      await WearableDevice.create(wearableDevice);

      // Create some metrics for the guest
      const metrics = generateGuestMetrics(
        guest.guest_id,
        getRandomNumber(3, 8)
      );
      await GuestMetric.bulkCreate(metrics);

      console.log(
        `Created guest: ${firstName} ${lastName} (ID: ${guest.guest_id})`
      );
    }

    console.log(
      `Successfully seeded ${count} guests with their devices and metrics!`
    );
  } catch (error) {
    console.error("Error seeding guests:", error);
    throw error;
  }
};

// Function to clear all guest data
const clearGuestData = async () => {
  try {
    console.log("Clearing all guest data...");

    // Delete in order due to foreign key constraints
    await GuestMetric.destroy({ where: {} });
    await WearableDevice.destroy({ where: {} });
    await Guest.destroy({ where: {} });

    console.log("All guest data cleared successfully!");
  } catch (error) {
    console.error("Error clearing guest data:", error);
    throw error;
  }
};

// Export functions for use in other scripts
module.exports = {
  seedGuests,
  clearGuestData,
  generateGuestMetrics,
  generateWearableDevice,
};

// If this script is run directly
if (require.main === module) {
  const count = process.argv[2] ? parseInt(process.argv[2]) : 50;

  // Connect to database and run seeding
  const { sequelize } = require("../models");

  sequelize
    .authenticate()
    .then(() => {
      console.log("Database connected successfully.");
      return seedGuests(count);
    })
    .then(() => {
      console.log("Seeding completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}
