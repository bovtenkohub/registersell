const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

// Парсер тіла запиту для обробки POST-запитів
app.use(bodyParser.urlencoded({ extended: true }));

// Підключення до бази даних PostgreSQL
const client = new Client({
    user: 'derek',
    host: 'localhost',
    database: 'my_database',
    password: '',
    port: 5432,
});

// Підключення до бази даних
client.connect()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch(err => {
        console.error('Error connecting to the database', err);
    });

// Обробка POST-запиту для реєстрації нового користувача
app.post('/register', (req, res) => {
    const { username, password } = req.body;

    // Вставка імені користувача та хешу паролю до бази даних
    const query = 'INSERT INTO users (username, password_hash) VALUES ($1, $2)';
    const values = [username, password]; // Зверніть увагу: перед вставкою пароля до бази даних його слід хешувати
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
// Встановлення MIME-типу для файлу seller.js
app.get('/seller.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(__dirname + '/seller.js');
});

// Встановлення MIME-типу для файлу background.jpg
app.get('/background.jpg', (req, res) => {
    res.set('Content-Type', 'image/jpeg');
    res.sendFile(__dirname + '/background.jpg');
});

// Обробка GET-запиту для відображення реєстраційної сторінки
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/registrsel.html'); // Замініть '/path/to/your/register.html' на шлях до вашого файлу register.html
});

// Запуск серверу на вказаному порті
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


