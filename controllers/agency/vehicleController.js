const vehicleService = require('../../services/vehicleService');

// Create a new vehicle
exports.createVehicle = async (req, res) => {
    try {
        const savedVehicle = await vehicleService.createVehicleService(req.body, req.files);
        res.status(201).json({ message: 'Vehicle created successfully', data: savedVehicle });
    } catch (error) {
        res.status(400).json({ message: 'Error creating vehicle', error: error.message });
    }
};

// Get all vehicles
exports.getVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleService.getAllVehiclesService();
        res.status(200).json({ message: 'Vehicles retrieved successfully', data: vehicles });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
    }
};

// vehicle find by id
// exports.getVehicleById = async (req, res) => {
//     const { vehicleId } = req.params; // Extract vehicleId from URL params
//      console.log("vehicle", vehicleId);
//     try {
//         // Call the service function to find the vehicle by ID
//         const vehicle = await vehicleService.findVehicleByIdService(vehicleId);

//         // Return the vehicle as a response
//         res.status(200).json({
//             message: 'Vehicle retrieved successfully.',
//             data: vehicle
//         });
//     } catch (error) {
//         console.error('Error in controller:', error);
//         res.status(500).json({
//             message: error.message || 'An error occurred while retrieving the vehicle.',
//             data: null
//         });
//     }
// };

exports.getVehicleById = async (req, res) => {
    const { vehicleId } = req.params; // Extract vehicleId from URL params
    console.log("vehicle", vehicleId);

    // Check if vehicleId is provided in the request
    if (!vehicleId) {
        return res.status(400).json({
            message: 'Please select a vehicle.',
            data: null
        });
    }

    try {
        // Call the service function to find the vehicle by ID
        const vehicle = await vehicleService.findVehicleByIdService(vehicleId);

        // If no vehicle found, return a message
        if (!vehicle) {
            return res.status(404).json({
                message: 'Vehicle not found.',
                data: null
            });
        }

        // Return the vehicle as a response
        res.status(200).json({
            message: 'Vehicle retrieved successfully.',
            data: vehicle
        });
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({
            message: error.message || 'An error occurred while retrieving the vehicle.',
            data: null
        });
    }
};



// Get vehicles by agency ID
exports.getVehiclesByAgency = async (req, res) => {
    try {
        const vehicles = await vehicleService.getVehiclesByAgencyService(req.params.agencyId);
        res.status(200).json({ message: 'Vehicles retrieved successfully', data: vehicles });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
    }
};

// Get a single vehicle by registration number
exports.getVehicleByRegistrationNumber = async (req, res) => {
    try {
        const vehicle = await vehicleService.getVehicleByRegistrationNumberService(req.params.registrationNumber);
        res.status(200).json({ message: 'Vehicle retrieved successfully', data: vehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicle', error: error.message });
    }
};

// Update vehicle
exports.updateVehicle = async (req, res) => {
    try {
        const updatedVehicle = await vehicleService.updateVehicleService(req.params.vehicleId, req.body);
        res.status(200).json({ message: 'Vehicle updated successfully', data: updatedVehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error updating vehicle', error: error.message });
    }
};

// Delete a vehicle
exports.deleteVehicle = async (req, res) => {
    try {
        const deletedVehicle = await vehicleService.deleteVehicleService(req.params.vehicleId);
        res.status(200).json({ message: 'Vehicle deleted successfully', data: deletedVehicle });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting vehicle', error: error.message });
    }
};

















// const Vehicle = require('../../MODELS/Vehicle');
// const Agency = require('../../MODELS/Agency');

// // Create a new vehicle
// exports.createVehicle = async (req, res) => {
//     try {
//         const { agencyId, vehicleName, vehicleType, pricePerDay, availability, features } = req.body;

//         // Validate required fields
//         const requiredFields = ['agencyId', 'vehicleName', 'vehicleType', 'pricePerDay'];
//         for (let field of requiredFields) {
//             if (!req.body[field]) {
//                 return res.status(400).json({ message: `The field ${field} is required.` });
//             }
//         }

//             // Check if images were uploaded
//             if (!req.files || req.files.length === 0) {
//                 return res.status(400).json({ msg: "At least one image is required." });
//             }

//             // Extract the file paths from req.files
//             const images = req.files.map(file => file.path);  // Mapping file paths


//         // Check if the agency exists
//         const agency = await Agency.findById(agencyId);
//         if (!agency) {
//             return res.status(400).json({ message: 'Agency not found.' });
//         }

//         // Create a new vehicle
//         const vehicle = new Vehicle({
//             agencyId,
//             vehicleName,
//             vehicleType,
//             pricePerDay,
//             availability: availability ?? true, // Default to true if not provided
//             features: features || [], // Default to empty array if not provided
//             images: images || [], // Default to empty array if not provided
//         });

//         // Save the vehicle to the database
//         const savedVehicle = await vehicle.save();
//         res.status(201).json({ message: 'Vehicle created successfully', data: savedVehicle });
//     } catch (error) {
//         res.status(400).json({ message: 'Error creating vehicle', error: error.message });
//     }
// };

// // Get all vehicles
// exports.getVehicles = async (req, res) => {
//     try {
//         const vehicles = await Vehicle.find().populate('agencyId', 'agencyName'); // Populates agency details
//         res.status(200).json({ message: 'Vehicles retrieved successfully', data: vehicles });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
//     }
// };

// // Get vehicles by agency ID
// exports.getVehiclesByAgency = async (req, res) => {
//     try {
//         const { agencyId } = req.params;
//         const vehicles = await Vehicle.find({ agencyId }).populate('agencyId', 'agencyName');
//         if (vehicles.length === 0) {
//             return res.status(404).json({ message: 'No vehicles found for this agency.' });
//         }
//         res.status(200).json({ message: 'Vehicles retrieved successfully', data: vehicles });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
//     }
// };

// // Get a single vehicle by registration number
// exports.getVehicleByRegistrationNumber = async (req, res) => {
//     try {
//         const { registrationNumber } = req.params;
//         const vehicle = await Vehicle.findOne({ registrationNumber }).populate('agencyId', 'agencyName');
//         if (!vehicle) {
//             return res.status(404).json({ message: 'Vehicle not found.' });
//         }
//         res.status(200).json({ message: 'Vehicle retrieved successfully', data: vehicle });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching vehicle', error: error.message });
//     }
// };


// exports.updateVehicle = async (req, res) => {
//     try {
//         const { vehicleId } = req.params; // Vehicle ID from route parameter
//         const { pricePerDay, availability } = req.body; // Fields to update

//         if (pricePerDay === undefined && availability === undefined) {
//             return res.status(400).json({ message: 'At least one field (pricePerDay or availability) must be provided.' });
//         }

//         // Basic validation for pricePerDay and availability
//         if (pricePerDay && typeof pricePerDay !== 'number') {
//             return res.status(400).json({ message: 'pricePerDay must be a number.' });
//         }

//         if (availability !== undefined && typeof availability !== 'boolean') {
//             return res.status(400).json({ message: 'availability must be a boolean.' });
//         }

//         // Find the vehicle
//         const vehicle = await Vehicle.findById(vehicleId);

//         // If no vehicle is found, return an error
//         if (!vehicle) {
//             return res.status(404).json({ message: 'Vehicle not found.' });
//         }

//         // Update the fields if they are provided
//         if (pricePerDay !== undefined) {
//             vehicle.pricePerDay = pricePerDay;
//         }

//         if (availability !== undefined) {
//             vehicle.availability = availability;
//         }

//         // Save the updated vehicle
//         const updatedVehicle = await vehicle.save();

//         // Respond with the updated vehicle
//         res.status(200).json({
//             message: 'Vehicle updated successfully',
//             data: updatedVehicle,
//         });
//     } catch (error) {
//         // Handle any errors during the update
//         res.status(500).json({ message: 'Error updating vehicle', error: error.message });
//     }
// };


// // Delete a vehicle
// exports.deleteVehicle = async (req, res) => {
//     try {
//         const { vehicleId } = req.params;

//         // Find and delete the vehicle
//         const deletedVehicle = await Vehicle.findByIdAndDelete(vehicleId);
//         if (!deletedVehicle) {
//             return res.status(404).json({ message: 'Vehicle not found.' });
//         }

//         res.status(200).json({ message: 'Vehicle deleted successfully', data: deletedVehicle });
//     } catch (error) {
//         res.status(400).json({ message: 'Error deleting vehicle', error: error.message });
//     }
// };
