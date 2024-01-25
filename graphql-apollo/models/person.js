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
	}
});

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Person', personSchema);