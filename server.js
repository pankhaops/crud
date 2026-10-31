const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(express.json())

const Item = require('./models/item')

// Create
app.post('/items', async (req, res) => {
  res.json(await Item.create(req.body))
})

// Read
app.get('/items', async (req, res) => {
  res.json(await Item.find())
})

// Update
app.put('/items/:id', async (req, res) => {
  res.json(await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }))
})

// Delete
app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id)
  res.json({ message: 'Deleted successfully' })
})

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(5000, () => console.log('Server running on port 5000'))
})