require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)

console.log('connecting to MongoDB')
mongoose.connect(url)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch(error => {
		console.log('error connecting to MongoDB:', error.message)
	})

const contactSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
	},
	number: {
		type: String,
		minlength: 8,
		required: true,
		validate: {
			validator: function(v) {
				// This regular expression checks for phone numbers formatted like "123-456-7890" or "(123)456-7890" without spaces
				return /^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/.test(v)
			},
			message: props => `${props.value} is not a valid phone number!`
		},
	}
})

contactSchema.set('toJSON', {
	transform: (doc, ret) => {
		ret.id = ret._id.toString()
		delete ret._id
		delete ret.__v
	}
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact