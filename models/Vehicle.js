const mongoose = require("mongoose");

// Utility function to generate a registration number
const generateRegistrationNumber = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Allowed characters (uppercase and numbers)
  let registrationNumber = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    registrationNumber += characters[randomIndex];
  }

  return registrationNumber;
};

const VehicleSchema = new mongoose.Schema({
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency", // Links to the Agency model
    required: true,
  },
  vehicleName: { type: String, required: true }, // e.g., Toyota Corolla
  vehicleType: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    default: generateRegistrationNumber, // Use the custom function for generating the registration number
  },
  pricePerDay: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  features: [String], // e.g., ['AC', 'GPS', 'Automatic']
  images: [String], // Array of image URLs
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
