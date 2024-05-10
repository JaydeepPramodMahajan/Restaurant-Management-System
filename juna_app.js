// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const path = require("path");
// const app = express();
// const port = 6677;

// // Body parser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname));

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/canteenDB', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // Create a Schema for the Data
// const ItemSchema = new mongoose.Schema({
//             name: String,
//             phone: Number,
//             order: String,
//             add: String,
//             quant: Number,
//             date: String,
//             address: String,
//             message: String
// });

// // Create a Model
// const Item = mongoose.model('Item', ItemSchema);

// // Route to handle GET request
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/index_canteen.html'));
// });

// // Route to handle POST request
// app.post('/items',async(req, res) => {
//     const newItem = new Item({
//         name: req.body.name,
//         phone: req.body.phone,
//         order: req.body.order,
//         add: req.body.add,
//         quant: req.body.quant,
//         date: req.body.date,
//         address: req.body.address,
//         message: req.body.message
//     });
//     console.log(newItem);
//     newItem.save()
//         .catch(err => console.log(err));

//     res.sendFile(path.join(__dirname + '/index_canteen.html'));
// });

// // Start server
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });