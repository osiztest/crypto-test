'use strict';
const http = require('http');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const hostname = '0.0.0.0';
const port = process.env.PORT || 3000;

//Port and database connectivity
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



// app.post('/cryptovalue',function(req, res) {
//   var val1="btc"
//   var url="https://api.cryptonator.com/api/ticker/";
//   var uur=url+val1+'-usd';

// const rp = require('request-promise');
// const requestOptions = {
//   method: 'GET',
//   uri:uur
//  };

// rp(requestOptions).then(response => {
//   var data=JSON.parse(response)
//   var value={
//     "fullfllmentText":"the current value is "+data.ticker.price
//     }
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end(value);
// }).catch((err) => {
//   console.log('API call error:', err.message);
// });
// })
 




