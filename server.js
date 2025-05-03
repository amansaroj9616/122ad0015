const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
const TIMEOUT = 500; // milliseconds

app.use(cors());
app.use(express.json());

// Store for each number type
const numberStores = {
    p: [], // prime
    f: [], // fibonacci
    e: [], // even
    r: []  // random
};

// API endpoints mapping
const apiEndpoints = {
    p: 'http://20.244.56.144/evaluation-service/primes',
    f: 'http://20.244.56.144/evaluation-service/fibo',
    e: 'http://20.244.56.144/evaluation-service/even',
    r: 'http://20.244.56.144/evaluation-service/rand'
};

// Authorization token
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ2MjgzNTQ5LCJpYXQiOjE3NDYyODMyNDksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjNhYjE0OTgyLWMyYTItNDM0Yy05NzNlLTI5OWEyYzg2N2JhMyIsInN1YiI6IjEyMmFkMDAxNUBpaWl0ay5hYy5pbiJ9LCJlbWFpbCI6IjEyMmFkMDAxNUBpaWl0ay5hYy5pbiIsIm5hbWUiOiJhbWFuIHNhcm9qIiwicm9sbE5vIjoiMTIyYWQwMDE1IiwiYWNjZXNzQ29kZSI6ImJ6YkNueiIsImNsaWVudElEIjoiM2FiMTQ5ODItYzJhMi00MzRjLTk3M2UtMjk5YTJjODY3YmEzIiwiY2xpZW50U2VjcmV0IjoiTXZGTm1WSEhmY2dZekdVYSJ9.5c-lK-NgVXmnFtIrq8ZdZ5Q0ecLS9JYBawL8_hyJO54';

// Helper function to calculate average
const calculateAverage = (numbers) => {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(2);
};

// Helper function to update window
const updateWindow = (store, newNumbers) => {
    const prevState = [...store];
    
    // Add new numbers, ensuring uniqueness
    newNumbers.forEach(num => {
        if (!store.includes(num)) {
            if (store.length >= WINDOW_SIZE) {
                store.shift(); // Remove oldest number
            }
            store.push(num);
        }
    });
    
    return prevState;
};

app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;
    
    if (!['p', 'f', 'e', 'r'].includes(numberid)) {
        return res.status(400).json({ error: 'Invalid number type' });
    }

    try {
        const response = await axios.get(apiEndpoints[numberid], {
            timeout: TIMEOUT,
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`
            }
        });
        const newNumbers = response.data.numbers;
        
        console.log('Fetched numbers:', newNumbers);
        
        const prevState = updateWindow(numberStores[numberid], newNumbers);
        
        res.json({
            windowPrevState: prevState,
            windowCurrState: numberStores[numberid],
            numbers: newNumbers,
            avg: calculateAverage(numberStores[numberid])
        });
    } catch (error) {
        console.log('ERROR:', error.message); // Yeh line add karo!
        res.json({
            windowPrevState: numberStores[numberid],
            windowCurrState: numberStores[numberid],
            numbers: [],
            avg: calculateAverage(numberStores[numberid])
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 