const bookingService = require('../../services/bookingService');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        // Pass the entire request body to the service
        const newBooking = await bookingService.createBookingService(req.body);

        res.status(201).json({ message: 'Booking created successfully', data: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { bookingStatus, paymentStatus } = req.body;

        // If neither bookingStatus nor paymentStatus is provided, return an error
        if (bookingStatus === undefined && paymentStatus === undefined) {
            return res.status(400).json({
                message: 'At least one field (bookingStatus or paymentStatus) must be provided.'
            });
        }

        const updatedBooking = await bookingService.updateBookingStatusService(
            bookingId, 
            req.body // Pass the entire body to the service
        );

        res.status(200).json({
            message: 'Booking updated successfully',
            data: updatedBooking
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating booking status',
            error: error.message
        });
    }
};

// Fetch booking details by ID
exports.getBookingDetailsById = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await bookingService.getBookingDetailsByIdService(bookingId);

        res.status(200).json({ message: 'Booking details fetched successfully', data: booking });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking details', error: error.message });
    }
};

// Fetch all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await bookingService.getAllBookingsService();

        res.status(200).json({
            message: 'All bookings fetched successfully',
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching bookings',
            error: error.message
        });
    }
};

// Get booking details by date
exports.getBookingDetailsByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query; // Expecting startDate and endDate from query parameters
        console.log("start date in controller", startDate)
        console.log("end Date in controller", endDate)
        const bookings = await bookingService.getBookingDetailsByDateService(startDate, endDate);
        res.status(200).json({ message: 'Bookings retrieved successfully', data: bookings });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching bookings', error: error.message });
    }
};
