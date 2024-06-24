var express = require("express");

module.exports = function () {

    //Router
    var router = express.Router();

    var OdooController = require("../../modules/odoo");

    router.post('/punchin', (req, res) => {
        const { username, pin } = req.body;
    
        OdooController.punchinUser(username, pin)
            .then((message) => {
                return res.status(200).json({ message });
            })
            .catch((error) => {
                return res.status(400).json({ error });
            });
    });
    



    router.post('/set-credentials', (req, res) => {
        const { username, pin } = req.body;
    
        OdooController.setOdooCredentials(username, pin)
            .then((result) => {
                console.log("set credentials route", result);
    
                if (result === 'User already registered') {
                    return res.status(400).json({
                        message: result,
                    });
                }
    
                return res.status(200).json({
                    message: "Credentials set successfully",
                    data: result,
                });
            })
            .catch((error) => {
                return res.status(500).json({ error: error.message });
            });
    });


    router.post('/punchout', (req, res) => {
        const { username, pin } = req.body;
    
        OdooController.punchoutUser(username, pin)
            .then((result) => {
                console.log("logout route", result);
    
                return res.status(200).json({
                    message: result.message,
                    timeSinceLastLogin: result.timeSinceLastLogin
                });
            })
            .catch((error) => {
                return res.status(400).json({ error: error });
            });
    });
    
    

    return router;
}