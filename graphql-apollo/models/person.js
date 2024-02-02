const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 5
	},
	phone: {
		type: String,
		minLength: 5
	},
	street: {
		type: String,
		required: true,
		minLength: 5
	},
	city: {
		type: String,
		required: true,
		minLength: 5
	},
	friendOf: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]
});

module.exports = mongoose.model('Person', personSchema);