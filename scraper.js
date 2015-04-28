var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');


var linkedInUrl = 'https://www.linkedin.com/in/anselrosenberg';
// var url = 'https://www.linkedin.com/profile/view?id=412960964';

var angelListUrl = 'https://api.angel.co/1/tags/14781/jobs?&access_token=c5f37bb9913b8bce889b16dc62ddb51ff2200a4ba38a1c13'
  
// page=2

request(linkedInUrl, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body)
      // var skills = $('.endorse-item-name-text');

     var skills = [];

      $('.endorse-item-name-text').each(function(i, elem) {
        skills[i] = $(this).text();
      });

      console.log('Your skills:', skills.join(', '));
      
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});

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


      // console.log(job.title)
      // console.log(job.tags.length)

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

    // console.log(skills)

    // console.log(html);
    // fs.writeFile('page.js', json, function (err) {
    //     if (err) throw err;
    //     console.log('It\'s saved! in same location.');
    // });
  }
});
