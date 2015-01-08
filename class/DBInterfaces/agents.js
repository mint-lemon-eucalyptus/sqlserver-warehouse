var config = require('../../config.js').datasource;
var MyPG = require('../util/datasource.js');

var Model = function () {
    var storage = new MyPG(config);


    this.getAll = function (js, done) {
        storage.query(
            'select * from selectAllAgents();',
            done);
    }
    this.getById = function (js, done) {
        storage.query(
            'select * from selectAgentById(' + js.id + ');',
            done);
    }
    this.getByName = function (js, done) {
        storage.request(function (err, req) {
            req.input('name', storage.sql.VarChar(50), js.name);
            req.execute('getAgentsByName', function (err, rs) {
                done(err, (err ? null : rs[0]))
            });
        });
    }

    this.clearAll = function (js, done) {
        storage.request(function (err, req) {
            req.execute('clearAllAgents', done);
        });
    }
    this.insertNew = function (js, done) {
        storage.request(function (err, req) {
            req.input('name', storage.sql.VarChar(50), js.name);
            req.input('address', storage.sql.VarChar(50), js.address);
            req.execute('addAgent', function (err, rs) {
                done(err, rs ? rs[0] : null)
            });
        });
    }
    this.update = function (js, done) {
        storage.request(function (err, req) {
            req.input('name', storage.sql.VarChar(50), js.name);
            req.input('address', storage.sql.VarChar(50), js.address);
            req.input('id', storage.sql.Int, js.id);
            req.execute('updateAgentData', function (err, rs) {
                done(err, (err ? null : rs[0]))
            });
        });
    }
    this.removeById = function (js, done) {
        storage.request(function (err, req) {
            req.input('id', storage.sql.Int, js.id);
            req.execute('removeAgent', function (err, rs) {
                done(err, (err ? null : rs[0]))
            });
        });
    }
    return this;
}


module.exports = Model;