const mongoose = require('mongoose');

const AgencySchema = new mongoose.Schema({
    agencyName: { type: String, required: true, trim: true, unique: true },
    contactPerson: { type: String, required: true, trim: true },
    contactEmail: { type: String, required: true, },
    phoneNumber: { type: String, required: true },
    businessLicenseNumber: { type: String, required: true, unique: true },
    officeAddress: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String,
    },
    serviceLocations: [String],
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    password: { type:String, required: true },
    registeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Agency', AgencySchema);
