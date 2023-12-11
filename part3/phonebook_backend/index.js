const express = require('express');
const app = express();

app.use(express.json());

let contacts = 
  [
    {
      "name": "Bad Bunny",
      "number": "6467875397",
      "id": 2
    },
    {
      "name": "Ozuna",
      "number": "09778211000",
      "id": 3
    },
    {
      "name": "Maluma",
      "number": "4206969420",
      "id": 4
    },
    {
      "name": "Romeo Santos",
      "number": "09175371000",
      "id": 5
    },
    {
      "name": "J Balvin",
      "number": "0192837465",
      "id": 6
    },
    {
      "name": "Anuel AA",
      "number": "0987654323100",
      "id": 7
    },
    {
      "name": "Ayra Starr",
      "number": "8284211000",
      "id": 8
    },
    {
      "name": "Tony Dize",
      "number": "5137826274",
      "id": 9
    },
    {
      "name": "Adalberto Santiago",
      "number": "3673126255",
      "id": 10
    }
  ]

app.get('/', (req, res) => {
  res.send('<h1>Phonebook Backend</h1>');
})

app.get('/info', (req, res) => {
  const date = new Date()
  const contactsLength = contacts.length
  res.send(
    `
    <p>Phonebook has info for ${contactsLength} people</p>
    <p>${date}</p>
    `
  )
})

app.get('/api/contacts', (req, res) => {
  res.json(contacts);
})

app.get('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id)
  const contact = contacts.find(contact => contact.id === id)
  if (contact) {
    res.json(contact)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/contacts/:id', (req, res) => {
  const id = Number(req.params.id)
  const contact = contacts.find(contact => contact.id === id)

  if (contact) {
    contacts = contacts.filter(contact => contact.id !== id)
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

app.post('/api/contacts', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    })
  }

  const existingContact = contacts.find(contact => contact.name === body.name)

  if (existingContact) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const contact = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000)
  }

  contacts = contacts.concat(contact)
  res.json(contact)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})