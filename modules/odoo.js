const bcryptjs = require('bcryptjs');
const Odoo = require("../models/OdooUsers");


exports.setOdooCredentials = (username, pin) => {
    return new Promise((resolve, reject) => {
        // Check if the user already exists
        Odoo.findOne({ username: username }, (err, existingUser) => {
            if (err) {
                return reject(err);
            }

            if (existingUser) {
                return resolve('User already registered');
            }

            // Hash the password before saving it
            bcryptjs.hash(pin, 10, (err, hashedPin) => {
                if (err) {
                    return reject(err);
                }

                const newUser = new Odoo({ username: username, pin: hashedPin });

                newUser.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve('User registered successfully');
                });
            });
        });
    });
};


exports.punchinUser = (username, pin) => {
    return new Promise((resolve, reject) => {
        // Find the user by username
        Odoo.findOne({ username: username }, (err, user) => {
            if (err) {
                return reject(err);
            }

            if (!user) {
                return reject('User not found');
            }

            // Verify the pin
            bcryptjs.compare(pin, user.pin, (err, isMatch) => {
                if (err) {
                    return reject(err);
                }

                if (!isMatch) {
                    return reject('Incorrect pin');
                }

                // Update lastLogin and isLoggedIn
                user.lastLogin = new Date();
                user.isLoggedIn = true;
                user.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    resolve('User logged in successfully');
                });
            });
        });
    });
};




exports.punchoutUser = (username, pin) => {
    return new Promise((resolve, reject) => {
        // Find the user by username
        Odoo.findOne({ username: username }, (err, user) => {
            if (err) {
                return reject(err);
            }

            if (!user) {
                return reject('User not found');
            }

            // Verify the pin
            bcryptjs.compare(pin, user.pin, (err, isMatch) => {
                if (err) {
                    return reject(err);
                }

                if (!isMatch) {
                    return reject('Incorrect pin');
                }

                if (!user.lastLogin) {
                    return reject('Last login time not available');
                }

                // Calculate time since last login
                const lastLogin = user.lastLogin;
                const currentTime = new Date();
                const timeDifference = currentTime - lastLogin; // Time difference in milliseconds

                // Update isLoggedIn to false and save
                user.isLoggedIn = false;
                user.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    // Convert time difference to a readable format
                    const timeSinceLastLogin = new Date(timeDifference).toISOString().substr(11, 8);

                    resolve({
                        message: 'User logged out successfully',
                        timeSinceLastLogin: timeSinceLastLogin
                    });
                });
            });
        });
    });
};



