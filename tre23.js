const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 8000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Registrations', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Create a Schema for the Data
const ItemSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Password: Number
});

// Create a Model
const Item = mongoose.model('Item', ItemSchema);

// Add this line before defining routes
app.use(express.static(path.join(__dirname, '/')));

// Then modify this line
app.use(express.static(path.join(__dirname, '/canteen_food_delivery')));


// Route to handle GET request
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup-form.html');
});

// Route to handle POST request
app.post('/items', (req, res) => {
    const newItem = new Item({
        Username: req.body.Username,
        Email: req.body.Email,
        Password: req.body.Password
    });
    newItem.save()
        .then(item => res.redirect('/index_canteen.html'))
        .catch(err => res.status(400).send("Unable to save data"));
});

// Route to handle POST request for sign-in
app.post('/signin', (req, res) => {
    const { Username, Password } = req.body;

    // Find a user with the provided Username and Password
    Item.findOne({ Username: Username, Password: Password })
        .then(user => {
            if (user) {
                // If user exists, redirect to canteen1.html
                res.redirect('/index_canteen.html');
            } else {
                // If user does not exist or credentials are incorrect, display an error message
                res.status(401).send("Invalid credentials. Please try again.");
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Internal server error");
        });
});

// Route to handle GET request for canteen1.html
app.get('/canteen1.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index_canteen.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
