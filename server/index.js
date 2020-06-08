const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require("multer");
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');
const app = express();

const { mongoose } = require('./database');
const { upload } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors({origin: 'http://localhost:4200'}));
const multi = multiparty({
    uploadDir: './subidas'
});

app.use(morgan('dev'));

app.use(express.json());

const subir = multer({
    upload
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/user', require('./routes/user.route'));




// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});