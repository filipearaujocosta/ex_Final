module.exports = function(app){
    controller = app.controller.homeControl;
    app.get('/home', controller.home);
    app.get('/',controller.home);
}
