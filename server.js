var express = require('express'),
 marked = require('marked'),
 hljs = require('highlight.js');

var app = express();
app.use(express.bodyParser());

marked.setOptions({
  gfm: true,
  sanitize: true,
  highlight: function (code, lang) {
    if (lang) {
      return hljs.highlight(lang, code).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});

app.post('/api/markdown', function(req, res){
  var paste = req.body;
  var input = paste.body;
  //var gfm = paste.gfm;

  //if(gfm === false)

  var html = marked(input);

  res.send({ output: html });
});

var server = app.listen(3000);