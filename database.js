const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Create a new client instance
const client = new Client({
    user: 'derek',
    host: 'localhost',
    database: 'my_database',
    password: '',
    port: 5432,
});

// Connect to the database
client.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.error('Error connecting to the database', err);
    });

// Handle POST request to /register
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Insert username and password into the database
    const query = 'INSERT INTO users (username, password_hash) VALUES ($1, $2)';
    const values = [username, password]; // Note: You should hash the password before inserting it into the database
    client.query(query, values)
        .then(() => {
            console.log('User registered successfully');
            res.send('User registered successfully');
        })
        .catch(err => {
            console.error('Error registering user', err);
            res.status(500).send('Error registering user');
        });
});

// Handle GET request to "/"
app.get('/', (req, res) => {
    res.send('Hello World!'); // Відправляємо клієнту відповідь з привітанням
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
