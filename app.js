var express = require('express');
var app = express();

let count = 0;

app.get('/', function (req, res) {
  res.send(`Hello World! Count ${count += 1}`);
});

app.listen(3000, function () {
  count
  console.log('Example app listening on port 3000!');
});

app.use('/static', express.static('public'));

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});