const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const Note = require('./models/note');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.static('dist')); // Serve static files
app.use(morgan('tiny')); // Log requests

// Route handlers
app.get('/api/notes', (req, res, next) => {
  Note.find({})
    .then(notes => {
      res.json(notes);
    })
    .catch(error => {
      next(error);
    });
});

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then(note => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => {
      next(error);
    });
});

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => {
      next(error);
    });
});

app.post('/api/notes', (req, res, next) => {
  const body = req.body;

  if (body.content === undefined) {
    return res.status(400).json({
      error: 'content missing'
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false
  });

  note.save()
    .then(savedNote => {
      res.json(savedNote);
    })
    .catch(error => {
      next(error);
    });
});

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body;

  const note = {
    content: body.content,
    important: body.important
  };

  // validators are run on update too
  Note.findByIdAndUpdate(req.params.id, note, { 
    new: true,
    runValidators: true,
    context: 'query' 
  }) 
    .then(updatedNote => {
      res.json(updatedNote);
    })
    .catch(error => {
      next(error);
    });
});


// Unsupported routes and error handling
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
