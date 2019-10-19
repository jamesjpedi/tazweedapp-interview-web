require('dotenv').config();

const http        = require('http');
const express     = require('express');

const bodyParser  = require('body-parser');

const app     = express();
const server  = http.createServer(app);

global.__basedir = __dirname;

const PORT = process.env.PORT || 3000;

//body parser middlewares
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.status(200).json({
        success : true,
    });
})

server.listen(PORT, function(){
    console.log('Server is running on port : '+ PORT);
});