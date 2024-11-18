const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Set View Engine to EJS
app.set('view engine', 'ejs');

//Setting up Public Folder
app.use(express.static(path.join(__dirname, 'public')));

//Connecting our App with MongoDB using mongoose
const url = 'mongodb+srv://rishadsahibi:<db_password>@cluster0.dikp8.mongodb.net/';

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, connectionParams).then(() => {
    console.log('MongoDB Connected');
}).catch(err => console.log(err));

//Call the database model
const Contracts = require('./models/Contracts');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//ROUTES

app.get('/', (req, res) => {
    res.render('Home');
})

app.get('/contacts', (req, res) => {

    Contacts.find().then((data) => {
        res.render('Contacts', { data: data });
    }).catch(err => conaole.log(err))

})


app.get('/contacts/:id', (req, res) => {
    Contacts.findOne({
        _id: req.params.id
    }).then(data => {
        res.render('Page', { data: data });
    })
        .catch(err => console.log(err));
})

app.get('/add', (req, res) => {
    res.render('Add');
})

app.get('/contacts/edit/:id', (req, res) => {
    Diary.findOne({
        _id: req.params.id
    }).then((data) => {
        res.render('Edit', { data: data });
    }).catch(err => console.log(err));
})


app.get('/about', (req, res) => {
    res.render('About');
})

app.put('/contacts/edit/:id', (req, res) => {
    Contacts.findOne({
        _id: req.params.id
    }).then(data => {
        data.title = req.body.title,
            data.description = req.body.description,
            data.date = req.body.date

        data.save().then(() => {
            res.redirect('/contacts');
        }).catch(err => console.log(err))
    }).catch(err => console.log(err));
})

app.delete('/contacts/delete/:id', (req, res) => {
    Contracts.remove({
        _id: req.params.id
    }).then(() => {
        res.redirect('/contacts');
    }).catch(err => console.log(err));
})

app.post('/add-to-contracts', (req, res) => {
    const Data = new Contracts({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date
    })

    //saving data in the database
    Data.save().then(() => {
        console.log("Data Saved");
        res.redirect('/contracts');
    })
        .catch(err => console.log(err));
})

app.listen(port, () => console.log("Server Started Running"));