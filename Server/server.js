const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sqlite3 = require('sqlite3'); 

const app = express();
const PORT = 5000;

dotenv.config();

app.use(express.json()); 
app.use(cors());

app.post('/login', (req, res) => {
    //verify user credentials   

    if(!req.body.email || !req.body.password) {
        console.log('Request missing email or password param');
        return res.status(400).send('Request missing email or password param');
    }
    const { email, password } = req.body;
    
    console.log(`Email: ${email}, Password: ${password}`);

    const db = new sqlite3.Database('auth.db', (error) => {
        console.log('entrou db')
        if (error) {
            console.error(error.message);
            return res.status(500).send('Database connection error');
        }

        const query = 'SELECT * FROM User WHERE email = ? AND password = ?';

        db.get(query, [email, password], (err, row) => {
            console.log('entrou get query')
            if (err) {
                console.error(err.message);
                return res.status(500).send('Database query error');
            }
            if (!row) {
                return res.status(400).send('User not found or invalid credentials');
            }

            const payload = {
                email: email,
            };

            const options = {
                expiresIn: '1h',
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, options);

            res.setHeader('Authorization', `Bearer ${token}`);

            res.status(200).json({ token });
        });
        db.close();
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
