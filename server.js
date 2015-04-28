var express = require('express');
var app = express();               
var morgan = require('morgan');      
var bodyParser = require('body-parser'); 
var Linkedin = require('node-linkedin')('api', 'secret', 'callback');
var linkedin = Linkedin.init('my_access_token');
var request = require("request");
var cheerio = require("cheerio");

app.use(express.static(__dirname + '/public'));   
app.use(morgan('dev'));                                 

app.listen(8080);
console.log("App listening on port 8080");

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))


app.post('/linkedin', function(req, res) {
  console.log('received post!');
  console.log(req.body.url);

  getLinkedInSkills(req.body.url, function(skills) {
    res.send(skills);
  });

});

var angelListUrl = 'https://api.angel.co/1/tags/14781/jobs?&access_token=c5f37bb9913b8bce889b16dc62ddb51ff2200a4ba38a1c13'

app.get('/angellist', function(req, res) {
  getAngelListJobs(angelListUrl, function(data) {
    res.send(data);
  })
});


app.get('*', function(req, res) {
  res.sendfile('./public/index.html');
});


var getLinkedInSkills = function(url, callback) {
  request(url, function (error, response, body) {
    if (!error) {
      var $ = cheerio.load(body)
       var skills = [];

        $('.endorse-item-name-text').each(function(i, elem) {
          skills[i] = $(this).text();
        });

        console.log('Your skills:', skills.join(', '));

        callback(skills)
        
    } else {
      console.log("We’ve encountered an error: " + error);
    }
  });
}

var getAngelListJobs = function(url, callback) {
  request(angelListUrl, function (error, response, json) {
    if (!error && response.statusCode == 200) {

      var data = JSON.parse(json);
      var positions = [];

      for (var i = 0; i < data.jobs.length; i++) {
        
        var job = data.jobs[i];

        var position = {};
        position.title = job.title;
        position.salaries = [job.salary_min, job.salary_max];
        position.description = job.description;
        position.url = job.angellist_url;

        var tagList = {};

        for (var j = 0; j < job.tags.length; j++) {
          var tag = job.tags[j];
          if (!tagList[tag.tag_type]) {
            tagList[tag.tag_type] = [];
          }
          tagList[tag.tag_type].push(tag.display_name);
        }

        position.tags = tagList;
        positions.push(position);

      }

      console.log(positions[0]);
      callback(positions);

    } else {
      console.log('Error:', response.statusCode, error)
    }
  });



}




