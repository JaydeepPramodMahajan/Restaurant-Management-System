const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 6677;
// const updatedOrderContent = require("./canteen_script")

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/canteenDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Create a Schema for the Data
const ItemSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    order: String,
    add: String,
    quant: Number,
    date: String,
    address: String,
    message: String
});

// Create a Model
const Item = mongoose.model('Item', ItemSchema);

// Route to handle GET request
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index_canteen.html'));
});


// Route to handle POST request
app.post('/items', async (req, res) => {
    const { name, phone, order, add, quant, date, address, message } = req.body;

    // Generate QR code
    const qrCodeData = JSON.stringify({ name, phone, order, add, quant, date, address, message });
    const qrCodePath = path.join(__dirname, `qr_codes/${Date.now()}.png`);
    await QRCode.toFile(qrCodePath, qrCodeData);

    // Create a new item using the Item model
    const newItem = new Item({
        name,
        phone,
        order,
        add,
        quant,
        date,
        address,
        message
    });

    try {
        // Save the new item to the database
        await newItem.save();

        // Generate PDF document
        const doc = new PDFDocument();
        const pdfPath = path.join(__dirname, 'order.pdf');
        const writeStream = fs.createWriteStream(pdfPath);
        doc.pipe(writeStream);

        // Add content to the PDF
        doc.fontSize(12);
        doc.text(`Name: ${name}`);
        doc.text(`Phone: ${phone}`);
        doc.text(`Order: ${order}`);
        doc.text(`Additional Food: ${add}`);
        doc.text(`Quantity: ${quant}`);
        doc.text(`Date and Time: ${date}`);
        doc.text(`Address: ${address}`);
        doc.text(`Message: ${message}`);
        
        // Add QR code to the PDF
        doc.image(qrCodePath, { fit: [100, 100], align: 'center', valign: 'center' });

        // Finalize PDF
        doc.end();

        // Send the PDF file as a response
        writeStream.on('finish', () => {
            res.sendFile(pdfPath);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error submitting order');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
