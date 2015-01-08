'use strict';

/* Services */

function handleServerErrors(e) {
    // console.log('error', e)
    if (e.message) {
        alert("Something is wrong...\n" + e.message);
    } else {
        alert("Something is wrong...\n" + JSON.stringify(e, null, 3));
    }
}

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
    value('version', '0.1')
    .service('Goods', function ($q, $http) {
        this.getAll = function () {
            var deferred = $q.defer();
            $http.post('/goods/getAll').then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.remove = function (entity) {
            var deferred = $q.defer();
            $http.post('/goods/removeById', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.add = function (entity) {
            var deferred = $q.defer();
            $http.post('/goods/insertNew', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.getById = function (entity) {
            var deferred = $q.defer();
            $http.post('/goods/getById', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.getByName = function (entity) {
            var deferred = $q.defer();
            $http.post('/goods/getByName', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.update = function (entity) {
            var deferred = $q.defer();
            $http.post('/goods/update', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
    })
    .service('Agents', function ($q, $http) {
        this.getAll = function () {
            var deferred = $q.defer();
            $http.post('/agents/getAll').then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.remove = function (entity) {
            var deferred = $q.defer();
            $http.post('/agents/removeById', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.add = function (entity) {
            var deferred = $q.defer();
            $http.post('/agents/insertNew', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.getById = function (entity) {
            var deferred = $q.defer();
            $http.post('/agents/getById', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.getByName = function (entity) {
            var deferred = $q.defer();
            $http.post('/agents/getByName', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.update = function (entity) {
            var deferred = $q.defer();
            $http.post('/agents/update', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
    })


    .service('Pricings', function ($q, $http) {
        this.getByType_Agent_Good = function () {
            var deferred = $q.defer();
            $http.post('/pricings/getByType_Agent_Good').then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.remove = function (entity) {
            var deferred = $q.defer();
            $http.post('/agents/removeById', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.add = function (entity) {
            var deferred = $q.defer();
            $http.post('/agents/insertNew', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.getById = function (entity) {
            var deferred = $q.defer();
            $http.post('/agents/getById', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
        this.update = function (entity) {
            var deferred = $q.defer();
            $http.post('/agents/update', entity).then(function (res) {
                var _rs = res.data;
                if (_rs.err) {
                    handleServerErrors(_rs.err)
                } else {
                    deferred.resolve(_rs.response);
                }
            }, function () {
                deferred.reject(arguments);
            });
            return deferred.promise;
        }
    })
