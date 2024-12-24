const express = require('express');
const router = express.Router();
const { createAgency, loginAgency, updateAgencyProfile } = require('../controllers/agency/agencyController');
const { createVehicle, getVehicles, getVehiclesByAgency, updateVehicle, deleteVehicle, getVehicleById, getVehicleByRegistrationNumber }  = require('../controllers/agency/vehicleController');
const upload = require("../middleware/multerConfig");
const {  createBooking, updateBookingStatus, getBookingDetailsById, getAllBookings, getBookingDetailsByDate } = require('../controllers/agency/bookingController');
const { pagination, options } = require("../controllers/agency/pagination")
const verifyToken = require("../middleware/verifyToken");

router.get('/pagination', pagination);
router.get('/vehicle/options', options);

// Agency routes
router.post('/agencies', createAgency);                        // create agency
router.post('/loginAgency', loginAgency);                      // login agency
router.put('/update/agency',verifyToken, updateAgencyProfile); // update agency

// Vehicle routes
router.post('/vehicles', upload.array('images', 5), createVehicle); // create vehicle
router.get('/get-all-vehicles', getVehicles);                       // Fetch all Vehicles with Agency name and id
router.get('/get-vehicle-By/:vehicleId', getVehicleById);           // get vehicle by id
router.get('/vehicles-with-agency/:agencyId', getVehiclesByAgency); // Find vehicles with agency id
router.put('/vehicles/update/:vehicleId', updateVehicle);           // update vehicle
router.post('/vehicle/delete/:vehicleId', deleteVehicle);           // for delete vehicle
router.get('/get-vehicle/:registrationNumber', getVehicleByRegistrationNumber) // fetch vehicle by registration number


// BOOKING ROUTES
router.post('/booking', createBooking);                                // create booking
router.put('/update-Booking-Status/:bookingId', updateBookingStatus);  // update booking status
router.get('/booking-details/:bookingId', getBookingDetailsById);      // get booking details by id
router.get('/all-bookings', getAllBookings);                           // fetch all bookings
router.get('/get-booking-by-date', getBookingDetailsByDate);           // fetch booking by date




// Protected route
router.get("/home", verifyToken, (req, res) => {
    res.status(200).json({
      msg: "Welcome to the protected home route!",
      user: req.user 
    });
});


module.exports = router;
