const mongoose = require('mongoose');

// Customer Schema
const CustomerSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String }
    },
    bookingHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking' // Reference to Booking Schema
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
