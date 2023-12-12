const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: String, 
  number: String
})

const Contact = mongoose.model('Contact', contactSchema);
mongoose.set('strictQuery', false)

let password, name, number, url;

switch (process.argv.length) {
  case 2:
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
    break;
  case 3:
    password = process.argv[2];
    url = `mongodb+srv://russelgabrielsy:${password}@cluster0.a1mq7nq.mongodb.net/phonebookApp?retryWrites=true&w=majority`
    mongoose.connect(url);
    Contact.find({}).then(result => {
      console.log('phonebook:');
      result.forEach(contact => {
        console.log(`${contact.name} ${contact.number}`);
      })
      mongoose.connection.close();
    })
    break;
  case 4:
    console.log('Number is required');
    process.exit(1);
    break;
  case 5:
    password = process.argv[2];
    name = process.argv[3];
    number = process.argv[4];
    url = `mongodb+srv://russelgabrielsy:${password}@cluster0.a1mq7nq.mongodb.net/phonebookApp?retryWrites=true&w=majority`
    const contact = new Contact({ name, number })

    mongoose.connect(url);
    contact.save().then(result => {
      console.log(`Added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    break;
  default:
    console.log('Too many arguments');
    process.exit(1);
    break;
}
