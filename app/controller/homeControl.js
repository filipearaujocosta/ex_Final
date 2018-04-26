module.exports = function(app){
    var Home ={

        home: function(req,res){
            res.render('home');
        }
    }
    return Home;
}