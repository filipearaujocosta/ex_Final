var express = require('express');
var app = express();
var consign = require('consign');


app.set('view engine', 'ejs');
app.set('views', './app/views');

consign({
    cwd: 'app',   
    verbose: false,
    extensions: [ '.js', '.json', '.node' ]   
  })
  .include('infra')
  .then('routes')
  .into(app);  

module.exports = function(){
    return app;
}