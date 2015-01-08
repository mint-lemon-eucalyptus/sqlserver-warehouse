var config = require('../../config.js').datasource;
var MyPG = require('../util/datasource.js');

var Model = function () {
    var storage = new MyPG(config);


    this.getAllPricings = function (js, done) {
        if (js.type) {
            done({detail: 'type field are not filled'});
            return;
        }
        storage.request(function (err, req) {
            req.input('type', storage.sql.SmallInt, js.type);
            req.execute('getAllPricings', function (err, rs) {
                done(err, rs ? rs[0] : null)
            });
        });
    }

    return this;
}


module.exports = Model;