var express = require('express');
var app = express();               
var morgan = require('morgan');      
var bodyParser = require('body-parser'); 
var Linkedin = require('node-linkedin')('api', 'secret', 'callback');
var linkedin = Linkedin.init('my_access_token');

app.use(express.static(__dirname + '/public'));   
app.use(morgan('dev'));                                 

app.listen(8080);
console.log("App listening on port 8080");

// 'https://api.linkedin.com/v1/companies/1337/updates?start=20&count=10&format=json'

// 'https://api.linkedin.com/v1/companies/1337/updates?start=20&count=10&format=json'

// var defaultOpts = {
//   'host': 'erikberg.com',
//   'path': '/',
//   'headers': {
//       'Accept-Encoding': 'gzip',
//       'Authorization': 'Bearer ' + ACCESS_TOKEN,
//       'User-Agent': USER_AGENT
//   }
// };

var linkedin = Linkedin.init('755iz8h7hgzmvf', {
    timeout: 10000 /* 10 seconds */
});

app.get('/linkedin', function(req, res) {
  https.get(defaultOpts, function(res) {

  })
});



app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});

