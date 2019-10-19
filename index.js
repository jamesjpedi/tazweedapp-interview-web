require('dotenv').config();

const path          = require('path');
const http          = require('http');
const express       = require('express');
const session       = require('express-session');
const mongoose    = require('mongoose');
const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');

const indexRouter   = require('./routes/index');
const sellersRouter = require('./routes/sellers');

const authHelper = require('./helpers/auth');

const app     = express();
const server  = http.createServer(app);

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

global.__basedir = __dirname;

const PORT = process.env.PORT || 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//body parser middlewares
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// set up the session
app.use(
    session({
        secret  : "tazweedapp",
        name    : "tazweedapp",
        resave  : true,
        maxAge  : 3600000,
    })
);

app.use('/', indexRouter);
app.use('/seller/', authHelper.checkLogin, sellersRouter);


server.listen(PORT, () => {
    console.log('Server is running on port : '+ PORT);
});