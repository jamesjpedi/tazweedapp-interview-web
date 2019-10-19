const authHelper = require('../helpers/auth');

const Sellers = {
    index : (req, res) => {
        res.render('seller', { title : 'Seller dashboard', url : req.originalUrl });
    },

    profile : (req, res) => {
        res.render('profile', { title : 'Profile', url : req.originalUrl });
    },

    timeSlots : (req, res) => {
        res.render('timeslots', { title : 'Time slots', url : req.originalUrl });
    },
}

module.exports = Sellers;