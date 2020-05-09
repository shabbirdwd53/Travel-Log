const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const middleware = require('./middleware');

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
}));


app.get('/', (req, res) => {
    res.json({
        message : 'Welcome to Daily code buffer',
    });
});

// For Not Found
app.use(middleware.notFound);

// General Error Routes
app.use(middleware.errorHandler);

const port =    process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});