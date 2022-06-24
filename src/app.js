const express = require ('express');
const { Cat } = require ('./models');
const cats = require('./models/cats');

const app = express();

// we expect to have to parse json from request bodies, 
// so we need the JSON middleware
app.use(express.json())

// put routes and controller functions here
app.get('/', (req, res) => {
    res.send('Hello crazy cats and kittens')
})

app.post('/cats', (req, res) => {
    Cat.create(req.body)
    // Cat.create({name, breed, lastFed})
    .then(cat => res.status(201).json(cat))
    .catch(cat => res.status(400).json('error creating cat'))
})

app.get('/cats', (req, res) => {
    // Cat.findAll(req.body)
    Cat.findAll({ where: req.query})
    .then(cat => res.status(200).json(cat))
    .catch(cat => res.status(400).json('error finding all cats'))
})

app.get('/cats/:catId', (req, res) => {
    Cat.findByPk(req.params.catId)
    // Cat.findByPk({ where: req.params.catId })
    .then(cat => res.status(200).json(cat))
    .catch(cat => res.status(400).json('error finding cat by Id'))
})

app.patch('/cats/:catId', (req, res) => {
    Cat.update(req.body, { where: { id: req.params.catId } })
    .then(cat => res.status(200).json(cat))
    .catch(cat => res.status(400).json('error updating cat'))
})

app.delete('/cats/:catId', (req, res) => {
    Cat.destroy({ where: { id: req.params.catId } })
    .then(cat => res.status(200).json(cat))
    .catch(cat => res.status(400).json('error deleting cat'))
})

app.patch('/feed/:catId', (req, res) => {
    Cat.update({ lastFed: new Date() }, { where: { id: req.params.catId } })
    .then(cat => res.status(200).json(cat))
    .catch(_ => res.status(400).json('error updating when cat was fed'))
})

module.exports = app
