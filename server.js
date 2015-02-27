// very simple static server served up using node/express
var express = require('express');
var server = express();

server.use(express.static('.'));

server.listen(process.env.PORT || 3000);