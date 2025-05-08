const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// MongoDB connection
const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/calculator'; // Default for local development
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(express.json());

// Define a Schema for storing calculations
const calculationSchema = new mongoose.Schema({
    num1: Number,
    num2: Number,
    operation: String,
    result: Number,
    timestamp: { type: Date, default: Date.now }
});

// Create a model from the schema
const Calculation = mongoose.model('Calculation', calculationSchema);

// Function to validate input numbers
const validateNumbers = (num1, num2, res) => {
    if (num1 === undefined || num2 === undefined) {
        return res.status(400).json({ error: "Missing required numbers: Both num1 and num2 must be provided" });
    }
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Invalid input: num1 and num2 must be valid numbers" });
    }
    return null;
};

// Helper function to store calculation in the database
const storeCalculation = (num1, num2, operation, result) => {
    const calculation = new Calculation({ num1, num2, operation, result });
    calculation.save()
        .then(() => console.log('Calculation saved to database'))
        .catch(err => console.error('Error saving calculation to database', err));
};

// Addition Endpoint
app.get('/add', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;

    if (validateNumbers(num1, num2, res)) return;

    const result = Number(num1) + Number(num2);
    storeCalculation(num1, num2, 'addition', result);

    res.json({ result });
});

// Subtraction Endpoint
app.get('/subtract', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;

    if (validateNumbers(num1, num2, res)) return;

    const result = Number(num1) - Number(num2);
    storeCalculation(num1, num2, 'subtraction', result);

    res.json({ result });
});

// Multiplication Endpoint
app.get('/multiply', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;

    if (validateNumbers(num1, num2, res)) return;

    const result = Number(num1) * Number(num2);
    storeCalculation(num1, num2, 'multiplication', result);

    res.json({ result });
});

// Division Endpoint
app.get('/divide', (req, res) => {
    const num1 = req.query.num1;
    const num2 = req.query.num2;

    if (validateNumbers(num1, num2, res)) return;

    if (Number(num2) === 0) {
        return res.status(400).json({ error: "Cannot divide by zero" });
    }

    const result = Number(num1) / Number(num2);
    storeCalculation(num1, num2, 'division', result);

    res.json({ result });
});

// 404 Error for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: "Endpoint not found" });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Starts the server
app.listen(port, () => {
    console.log(`Calculator microservice running at http://localhost:${port}`);
});

// Add http://localhost:3000/add?num1=10&num2=5
// Subtraction http://localhost:3000/subtract?num1=10&num2=5
// Multiplication http://localhost:3000/multiply?num1=10&num2=5
// Division http://localhost:3000/divide?num1=10&num2=5
