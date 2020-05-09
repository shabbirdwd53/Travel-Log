const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const middleware = require('./middleware');
const logRoute = require('./api/logRoute');


app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:1337',
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message : 'Welcome to Daily code buffer',
    });
});


app.use('/api/entry', logRoute);

// For Not Found
app.use(middleware.notFound);

// General Error Routes
app.use(middleware.errorHandler);


mongoose.connect(process.env.MONGO_DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
});

//const port =    process.env.PORT || 5000;
const port =  5000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});