const agencyService = require('../../services/agencyService');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../../middleware/verifyToken');
require('dotenv').config();

// Create a new agency with service layer logic
exports.createAgency = async (req, res) => {
    try {
        const savedAgency = await agencyService.createAgencyService(req.body);
        res.status(201).json({ message: 'Agency created successfully', data: savedAgency });
    } catch (error) {
        res.status(400).json({ message: 'Error creating agency', error: error.message });
    }
};

// Controller for agency login
exports.loginAgency = async (req, res) => {
    try {
        const { contactEmail, password } = req.body;

        // Validate the input data
        agencyService.validateLoginData({ contactEmail, password });

        // Authenticate the agency
        const agency = await agencyService.authenticateAgency(contactEmail, password);

        // Generate JWT token
        const token = jwt.sign(
            { id: agency._id, email: agency.contactEmail }, // Payload
            process.env.JWT_SECRET, // Secret Key
            { expiresIn: '1h' } // Token Expiry
        );

        // Respond with the token
        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(401).json({ message: error.message });
    }
};

// Controller to update agency profile
exports.updateAgencyProfile = async (req, res) => {
    try {
        // Get the userId from the middleware, where `req.user` is set after token verification
        const userId = req.user.id; 
        console.log(userId)

        // Pass the user ID and updated data to the service layer
        const updatedAgency = await agencyService.updateAgencyProfile(userId, req.body);

        // Respond with the updated agency profile
        res.status(200).json({
            message: 'Profile updated successfully',
            updatedAgency,
        });
    } catch (error) {
        console.error('Profile update error:', error.message);
        res.status(400).json({ message: error.message });
    }
};




    
// const Agency = require('../../MODELS/Agency');

// // Utility function for email validation
// const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// };

// // Utility function for phone number validation
// const isValidPhoneNumber = (phone) => {
//     const phoneRegex = /^[0-9]{10,15}$/; 
//     return phoneRegex.test(phone);
// };

// // Create a new agency with manual validation
// exports.createAgency = async (req, res) => {
//     try {
//         const { agencyName, contactPerson, contactEmail, phoneNumber, businessLicenseNumber, officeAddress } = req.body;
//         // Custom validation
//         const requiredFields = ['agencyName', 'contactPerson', 'contactEmail', 'phoneNumber', 'businessLicenseNumber'];

//         for (let field of requiredFields) {
//             if (!req.body[field]) {
//                 return res.status(400).json({ message: `The field ${field} is required.` });
//             }
//         }
//         if (!isValidEmail(contactEmail)) {
//             return res.status(400).json({ message: 'Invalid email format.' });
//         }
//         if (!isValidPhoneNumber(phoneNumber)) {
//             return res.status(400).json({ message: 'Invalid phone number. It must be 10-15 digits long.' });
//         }
//         // Validate office address if provided
//         if (officeAddress) {
//             if (!officeAddress.street || !officeAddress.city || !officeAddress.state || !officeAddress.postalCode || !officeAddress.country) {
//                 return res.status(400).json({ message: 'Complete office address is required.' });
//             }
//         }

//         const busLicenseNumber = await Agency.findOne({businessLicenseNumber})

//         if(busLicenseNumber){
//           return res.status(400).json({msg: "business License Number already exist"})
//         }

//         const agency = await new Agency(req.body);
//         const savedAgency = await agency.save();
//         res.status(201).json({ message: 'Agency created successfully', data: savedAgency });
//     } catch (error) {
//         res.status(400).json({ message: 'Error creating agency', error: error.message });
//     }
// };