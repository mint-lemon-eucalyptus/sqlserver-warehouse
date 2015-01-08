var async = require('async');
var assert = require("assert");

var Goods = require('../class/DBInterfaces/goods.js');
var model = {
    goods: new Goods()
};


var ent1, ent2;

describe('Model', function () {
    it('clear all', function (done) {
        model.goods.clearAll(null, done);
    });
    it('goods list must be empty', function (done) {
        model.goods.getAll(null, function (err, rs) {
            //       console.log(err,rs);
            assert.equal(rs.length, 0);
            done();
        });
    });
    it('adding a new good', function (done) {
        ent1 = {name: 'cups', maker: 'apple'};
        model.goods.insertNewGood(ent1, function (err, rs) {
            console.log(err, rs);
            assert.equal(err, undefined);
            assert.equal(rs.length, 1);
            assert.equal(typeof rs[0].id, 'number');
            ent1.id = rs[0].id;
            done();
        });
    });
    it('adding a second good', function (done) {
        ent2 = {name: 'tits', maker: 'woman'};
        model.goods.insertNewGood(ent2, function (err, rs) {
            assert.equal(rs.length, 1);
            assert.equal(typeof rs[0].id, 'number');
            ent2.id = rs[0].id;
            done();
        });
    });
    it('goods list must contain exact 2 entities', function (done) {
        model.goods.getAll(null, function (err, rs) {
            assert.equal(rs.length, 2);
            done();
        });
    });
    it('get by Id', function (done) {
        model.goods.getById(ent1, function (err, rs) {
            assert.equal(rs.length, 1);
            console.log('get by Id',rs)
            assert.equal(rs[0].id, ent1.id);
            assert.equal(rs[0].name, ent1.name);
            assert.equal(rs[0].maker, ent1.maker);
            done();
        });
    });
    it('update name', function (done) {
        ent1.name = 'boobs'
        model.goods.updateGoodData(ent1, function (err, rs) {
            // console.log('updateGoodData', rs)
            assert.equal(rs.length, 1);
            assert.equal(rs[0].id, ent1.id);
            assert.equal(rs[0].name, ent1.name);
            assert.equal(rs[0].maker, ent1.maker);
            done();
        });
    });
    it('remove by id', function (done) {
        model.goods.removeById(ent1, function (err, rs) {
            assert.equal(err, undefined);
            done();
        });
    });
    it('goods list must contain exact 1 entity', function (done) {
        model.goods.getAll(null, function (err, rs) {
         //   console.log('updateGoodData', rs)
            assert.equal(rs.length, 1);
            assert.equal(rs[0].name, ent2.name);
            done();
        });
    });
});



