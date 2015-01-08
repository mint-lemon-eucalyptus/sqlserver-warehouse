var config = require('../../config.js').datasource;
var MyPG = require('../util/datasource.js');

var Model = function () {
    var storage = new MyPG(config);


    this.getAll = function (js, done) {
        storage.query(
            'select * from selectAllGoods();',
            done);
    }
    this.getById = function (js, done) {
        storage.query(
            'select * from selectGoodById(' + js.id + ');',
            done);
    }
    this.getByName = function (js, done) {
        storage.request(function (err, req) {
            req.input('name', storage.sql.VarChar(50), js.name);
            req.execute('getGoodsByName', function (err, rs) {
                done(err, (err ? null : rs[0]))
            });
        });
    }
    this.clearAll = function (js, done) {
        storage.request(function (err, req) {
            req.execute('clearAllGoods', done);
        });
    }
    this.insertNew = function (js, done) {
        if (!js.name || !js.maker || js.name == '' || js.maker == '') {
            done({detail: 'some fields are not filled'});
            return;
        }
        storage.request(function (err, req) {
            req.input('name', storage.sql.VarChar(50), js.name);
            req.input('maker', storage.sql.VarChar(50), js.maker);
            req.execute('addGood', function (err, rs) {
                done(err, rs ? rs[0] : null)
            });
        });
    }
    this.update = function (js, done) {
        console.log("response", (!js.name || !js.maker || js.name == '' || js.maker == ''));
        if (!js.name || !js.maker || js.name == '' || js.maker == '') {
            done({detail: 'some fields are not filled'});
            return;
        }
        storage.request(function (err, req) {
            req.input('name', storage.sql.VarChar(50), js.name);
            req.input('maker', storage.sql.VarChar(50), js.maker);
            req.input('id', storage.sql.Int, js.id);
            req.execute('updateGoodData', function (err, rs) {
                done(err, (err ? null : rs[0]))
            });
        });
    }
    this.removeById = function (js, done) {
        storage.request(function (err, req) {
            req.input('id', storage.sql.Int, js.id);
            req.execute('removeGood', function (err, rs) {
                done(err, (err ? null : rs[0]))
            });
        });
    }
    return this;
}


module.exports = Model;