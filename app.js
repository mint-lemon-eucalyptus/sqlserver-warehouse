/**
 * Module dependencies.
 */
"use strict";
var path = require('path');
var engine = require('ejs-locals');
var express = require('express')

var fs = require('fs');
var async = require('async');

var config = require('./config.js');


var Goods = require('./class/DBInterfaces/goods.js');

var Agents = require('./class/DBInterfaces/agents.js');

var Pricing = require('./class/DBInterfaces/pricing.js');

var Transactions = require('./class/DBInterfaces/transactions.js');
var Positions = require('./class/DBInterfaces/positions.js');

var model = {
    goods: new Goods(),
    agents: new Agents(),
    pricing: new Pricing(),
    transactions: new Transactions(),
    positions: new Positions()
};

var app = express();

app.configure(function () {
    app.set('views', __dirname + './views/ejs');
    app.set('port', 3000);
    app.engine('ejs', engine);
    app.set('view engine', 'ejs');
    app.set('view options', {
        layout: false
    });
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    app.use(function (req, res, next) {
        res.locals.cookies = req.cookies;
        res.locals.session = req.session;
        console.log(req.originalUrl, req.method);
        next();
    });

});
app.use(app.router);


app.post('/menu/admin', function (req, res) {
    res.json({items: [
        { href: "#!goods/list", name: "Goods" },
        { href: "#!agents/list", name: "Agents" },
        { href: "#!pricing/list", name: "Pricing" },
        { href: "#!transactions/list", name: "Transactions" }
        // { href: "#!datasets", name: "Datasets" },
        //{ href: "#!excercises", name: "Excercises" }
    ]});
});

app.post('/:entity/:method', function (req, res) {
    var js = req.body;
    var entity = req.params.entity;
    var method = req.params.method;
    //console.log(req.cookies)
    console.log((new Date).toTimeString().cyan, 'POST:>>', entity + '.' + method + '(', js, ')');
    if (model[entity]) {
//        console.log(entity, 'entity found')
        if (typeof model[entity][method] === 'function') {
            var user = (req.user) ? req.user : {permissions: {cms: 0}};
            //  console.log(user)
            js.cur_user = user;
            js.excercise_role = user.excercise_role;
            js.author = user.id;
//            console.log(entity, method, 'method found')
            //           console.log(entity, 'used')
            model[entity][method](js, function (err, rs) {
                //                        console.log(entity, 'method found', err, rs)
                if (err) {
                    console.log(err);
                }
                    console.log("resultset",{err: err, response: rs});
                res.send({err: err, response: rs});
            }, req.user)
        } else {
            res.send({err: 'no such method', response: {}});

        }
    } else {
        res.send({err: 'no such model', response: {}});

    }
});


app.use(function (req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.redirect('/html/index.html');
        return;
    }
    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});


app.listen(app.get('port'));
console.log('----------------Express server listening on port ' + app.get('port'), '----------------');


module.exports = app;