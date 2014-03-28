var express = require('express'),
 marked = require('marked'),
 hljs = require('highlight.js');

var app = express();
app.use(express.bodyParser());

var renderer = new marked.Renderer();

renderer.table = function (header, body) {
  return '<table class="table table-striped">' +
    '<thead>' +
      header  +
    '</thead>'+
    '<tbody>' +
      body    +
    '</tbody>'+
    '</table>'
};

marked.setOptions({
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
  var pastes = req.body;
  if(!Array.isArray(pastes)){
    pastes = [pastes]
  }

  var i, paste, html;
  var array = new Array();
  for (i = 0; i < pastes.length; i++) {
    paste = pastes[i];
    html = marked(paste.body, { gfm: paste.gfm, renderer: renderer });
    array.push({ output: html });
  }

  res.send({ array: array });
});

var server = app.listen(3000);