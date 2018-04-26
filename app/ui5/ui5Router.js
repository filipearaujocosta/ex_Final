module.exports = {
    getRouter: (express)=>{ // arrow funtion
        var path = require('path');
        return express.Router().use('/', express.static(path.join(__dirname,'webapp')));

    }
}