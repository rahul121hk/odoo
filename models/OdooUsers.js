const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema with timestamps option
const OdooUserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    pin: { type: String, required: true },
    lastLogin: { type: Date },
    isLoggedIn: { type: Boolean, default: false }
}, { timestamps: true });

// Create the model from the schema
const Odoo = mongoose.model('Odoo', OdooUserSchema);

// Export the model
module.exports = Odoo;
