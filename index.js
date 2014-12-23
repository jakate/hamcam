var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser')

var app = express();

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', function(req, res) {
  res.render('index.html');
});

var imagecount = 0;
var imagecountMax = 20;
var saveFilesTo = '../../../Dropbox/kinkkukamera';

app.post('/image', function(req, res) {
  var string = req.body.data;
  var regex = /^data:.+\/(.+);base64,(.*)$/;

  var matches = string.match(regex);
  var ext = matches[1];
  var data = matches[2];
  var buffer = new Buffer(data, 'base64');

  var filepath = saveFilesTo + '/' + imagecount + '.' + ext;
  fs.writeFileSync(filepath, buffer);

  res.send("snap index: " + imagecount);

  imagecount++;
  imagecount = imagecount%imagecountMax;
});


var server = app.listen(3000);
