const authHelper = require('../helpers/auth');

const Sellers = {
    index : (req, res) => {
        res.send('Seller admin');
    }
}

module.exports = Sellers;