var MyMSSQL = require('./util/datasource');
var config = require('../config.js');

var storage = new MyMSSQL(config.datasource);

storage.query("select 34 as d,'asda'", function (err, rs) {
    console.log(err,rs)
});

