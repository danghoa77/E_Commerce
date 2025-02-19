const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-route');
mongoose.connect('mongodb+srv://danghoa:danghoa@cluster0.pis3u.mongodb.net/test')
    .then(() => console.log('MongoDb connected'))
    .catch((err) => console.log("error", err))



const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        //origin: 'http://localhost:5175',
        origin: true,
        methods: ['GET', 'POST', 'DELETE', 'PUT'],
        allowedHeaders: [
            "Content-Type",
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter)



app.listen(PORT, () => console.log('Server is running on:', PORT));
