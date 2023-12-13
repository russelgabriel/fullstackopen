require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
mongoose.set('strictQuery', false);

console.log('connecting to MongoDB');
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

contactSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;