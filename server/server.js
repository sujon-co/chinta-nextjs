const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// App Config
const app = express();

if (app.get('env').toLowerCase() === 'development') {
    app.use(morgan('dev'));
}

const middlewares = [
    cors(),
    express.urlencoded({ limit: '15mb', extended: true }),
    express.json(),
];

//middlewares
app.use(middlewares);
console.log({ path: path.join(__dirname, 'public') })
// app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.use('*', (req, res) => {
    res.status(404).send({
        message: '404 Not Found',
    });
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        next('There is Error from headersSend');
    } else if (err.message) {
        res.status(err.status || 500).send({
            success: false,
            error: err.message,
        });
    } else {
        res.status(500).send({
            success: false,
            error: 'There was an error',
        });
    }
});

const PORT = process.env.PORT || 4000;
const environment = app.get('env');

// Server Configuration 
app.listen(PORT, () => {
    console.log(
        `SERVER IS RUNNING ON PORT ${PORT} AND SERVER ON MODE ${environment}`
    );
});
