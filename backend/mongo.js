const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://russelgabrielsy:${password}@cluster0.fay7odg.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false);
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema);

// const note = new Note({
//   content: 'bad bunny is the best artist ever',
//   important: true
// })

// note.save().then(result => {
//   console.log('note saved!');
//   mongoose.connection.close()
// })

Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note);
  })
  mongoose.connection.close();
})