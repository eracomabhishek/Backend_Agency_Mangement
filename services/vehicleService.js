const Vehicle = require('../models/Vehicle');
const Agency = require('../models/Agency');

// Create a new vehicle
exports.createVehicleService = async (data, files) => {
    const { agencyId, vehicleName, vehicleType, pricePerDay, availability, features } = data;

    // Validate required fields
    const requiredFields = ['agencyId', 'vehicleName', 'vehicleType', 'pricePerDay'];
    for (let field of requiredFields) {
        if (!data[field]) {
            throw new Error(`The field ${field} is required.`);
        }
    }

    // Check if images were uploaded
    if (!files || files.length === 0) {
        throw new Error("At least one image is required.");
    }

    // Extract the file paths from files
    const images = files.map((file) => file.path);

    // Check if the agency exists
    const agency = await Agency.findById(agencyId);
    if (!agency) {
        throw new Error('Agency not found.');
    }

    // Create a new vehicle
    const vehicle = new Vehicle({
        agencyId,
        vehicleName,
        vehicleType,
        pricePerDay,
        availability: availability ?? true, // Default to true if not provided
        features: features || [], // Default to empty array if not provided
        images: images || [], // Default to empty array if not provided
    });

    return await vehicle.save(); // Save the vehicle to the database
};

// get vehicle by ID
exports.findVehicleByIdService = async (vehicleId) => {
    if (!vehicleId) {
        throw new Error('Vehicle ID is required.');
    }

    try {
        // Find the vehicle by its ID
        const vehicle = await Vehicle.findById(vehicleId);

        if (!vehicle) {
            throw new Error('Vehicle not found.');
        }

        return vehicle; // Return the vehicle document if found
    } catch (error) {
        console.error('Error finding vehicle by ID:', error);
        throw new Error('Failed to find vehicle by ID.');
    }
};


// Get all vehicles
exports.getAllVehiclesService = async () => {
    return await Vehicle.find().populate('agencyId', 'agencyName'); // Populate agency details
};

// Get vehicles by agency ID
exports.getVehiclesByAgencyService = async (agencyId) => {
    const vehicles = await Vehicle.find({ agencyId }).populate('agencyId', 'agencyName');
    if (vehicles.length === 0) {
        throw new Error('No vehicles found for this agency.');
    }
    return vehicles;
};

// Get vehicle by registration number
exports.getVehicleByRegistrationNumberService = async (registrationNumber) => {
    const vehicle = await Vehicle.findOne({ registrationNumber }).populate('agencyId', 'agencyName');
    if (!vehicle) {
        throw new Error('Vehicle not found.');
    }
    return vehicle;
};

// Update vehicle details
exports.updateVehicleService = async (vehicleId, updates) => {
    const { pricePerDay, availability } = updates;

    if (pricePerDay === undefined && availability === undefined) {
        throw new Error('At least one field (pricePerDay or availability) must be provided.');
    }

    // Basic validation for pricePerDay and availability
    if (pricePerDay && typeof pricePerDay !== 'number') {
        throw new Error('pricePerDay must be a number.');
    }

    if (availability !== undefined && typeof availability !== 'boolean') {
        throw new Error('availability must be a boolean.');
    }

    // Find the vehicle
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
        throw new Error('Vehicle not found.');
    }

    // Update the fields if provided
    if (pricePerDay !== undefined) vehicle.pricePerDay = pricePerDay;
    if (availability !== undefined) vehicle.availability = availability;

    return await vehicle.save(); // Save the updated vehicle
};

// Delete a vehicle
exports.deleteVehicleService = async (vehicleId) => {
    const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);
    if (!deletedVehicle) {
        throw new Error('Vehicle not found.');
    }
    return deletedVehicle;
};


