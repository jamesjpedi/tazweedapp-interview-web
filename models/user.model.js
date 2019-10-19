const mongoose = require('mongoose');

const user = mongoose.Schema({
    _id         : mongoose.Schema.Types.ObjectId,
	name        : { type: String, required: false },
	role        : { type: String, required: true },
	email       : { type: String, required: true, unique: true },
	password    : { type: String, required: true },
	createdAt   : { type: String, required: false },
    updatedAt   : { type: String, required: false },
});

user.pre('save', function(next) {
	now = new Date();
	if (!this.createdAt ) {
		this.createdAt = now;
    }
    this.updatedAt = now;
	next();
});


module.exports = mongoose.model('User', user);