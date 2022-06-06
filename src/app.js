const express = require ('express');
const app = express();

// we expect to have to parse json from request bodies, 
// so we need the JSON middleware
app.use(express.json())

// put routes and controller functions here
app.get('/cats', (req, res) => {
    res.send('Hello crazy cats and kittens')
})

module.exports = app
