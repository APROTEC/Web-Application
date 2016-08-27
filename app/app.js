var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var port = 80;

app.use(express.static(path.join(__dirname, '/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {
    res.sendFile('./index.html');
});

app.get('/*', function (req, res) {
    res.redirect('/');
});

app.listen(process.env.PORT || port);
console.log('Listening on port ' + (process.env.PORT || port));