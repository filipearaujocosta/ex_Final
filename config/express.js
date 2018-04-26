var express = require('express');
var app = express();
var consign = require('consign');


app.set('view engine', 'ejs');
app.set('views', './app/views');

var ui5Router = require('../app/ui5/ui5Router');

app.use('/', ui5Router.getRouter(express));

consign({
    cwd: 'app',   
    verbose: false,
    extensions: [ '.js', '.json', '.node' ]   
  })
  .include('controller')
  .then('routes')  
  .into(app);  

module.exports = function(){
    return app;
}