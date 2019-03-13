var express = require('express');
var app = express();
var path = require('path');

app.use('/dist', express.static(path.resolve('./dist/')))
app.use('/', express.static(path.resolve('./')));

app.listen(80, function () {
  console.log('Example app listening on port 3000!');
});