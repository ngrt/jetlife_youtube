const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Jetski = require('../models/Jetskis');

router.get('/', (req, res) => {
    Jetski.findAll()
        .then(jetskis => {
            res.render('jetskis', {
                jetskis
            })
        })
        .catch(err => console.log(err));
})

// Display form
router.get('/add', (req, res) => {
    res.render('add');
})

router.post('/add', (req, res) => {

    let {name, type, location, price, description, email} = req.body;
    let errors = [];

    //validation
    if (!name) {
        errors.push({text: 'Please add a name'})
    }
    if (!type) {
        errors.push({text: 'Please add a type'})
    }
    if (!location) {
        errors.push({text: 'Please add a location'})
    }
    if (!price) {
        errors.push({text: 'Please add a price'})
    }
    if (!description) {
        errors.push({text: 'Please add a description'})
    }
    if (!email) {
        errors.push({text: 'Please add a email'})
    }

    // check for errors
    if (errors.length > 0){
        res.render('add', {
            errors, 
            name, 
            type, 
            location, 
            price, 
            description, 
            email
        })
    } else {
        //Insert into table
        Jetski.create({
            name,
            type,
            location,
            price,
            description,
            email
        })
        .then(jetski => res.redirect('/jetskis'))
        .catch(err => console.log(err));
    }
});

router.get('/search', (req, res) => {
    const {term} = req.query;

    Jetski.findAll({where: {location: term}})
        .then(jetskis => {
            res.render('jetskis', {jetskis})
        })
        .catch(err => console.log(err))
})

module.exports = router;