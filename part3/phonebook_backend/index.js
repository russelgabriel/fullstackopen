const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const Contact = require('./models/contact');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('dist'));

// Define a new token 'body' that gets the request body
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '' 
});
// Include the 'body' token in the format string
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// Route handlers
app.get('/info', (req, res, next) => {
  Contact.countDocuments({})
    .then(count => {
      res.send(`<p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>`)
    })
    .catch(error => {
      console.log(error)
      next(error);
    })
})

app.get('/api/contacts', (req, res, next) => {
  Contact.find({}).then(contacts => {
    res.json(contacts)
  })
  .catch(error => {
    console.log(error)
    next(error);
  })
})

app.get('/api/contacts/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      next(error);
    })
})

app.delete('/api/contacts/:id', (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
      next(error);
    })
})

app.post('/api/contacts', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  }

  const newContact = new Contact({
    name: body.name,
    number: body.number,
  })

  newContact.save()
    .then(savedContact => {
      res.json(savedContact)
    })
    .catch(error => {
      console.log(error)
      next(error);
    })
})

app.put('/api/contacts/:id', (req, res, next) => {
  const updatedContact = {
    name: req.body.name,
    number: req.body.number
  }

  Contact.findByIdAndUpdate(req.params.id, updatedContact, { new: true, runValidators: true, context: 'query' })
    .then(updatedContact => {
      if (updatedContact) {
        res.json(updatedContact);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

// Unsupported routes and error handling
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
}

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error);
}

app.use(errorHandler);



const PORT = process.env.PORT || 3001; // Fly.io uses PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})