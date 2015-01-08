var sql = require('mssql');

var Datasource = function (config) {
    this.sql = sql
    this.query = function (q, callback) {
        sql.connect(config, function (err) {
            if (err) {
                callback(err)
            } else {
                var request = new sql.Request();
                request.query(q, callback);
            }
        });

    }

    this.request = function (callback) {
        sql.connect(config, function (err) {
            if (err) {
                callback(err)
            } else {
                callback(null,new sql.Request());
            }
        });

    }
    return this;
}

module.exports = Datasource;