var config = require('../../config.js').datasource;
var MyPG = require('../util/datasource.js');

var Model = function () {
    var storage = new MyPG(config);



    return this;
}


module.exports = Model;