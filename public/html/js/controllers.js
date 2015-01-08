'use strict';

/* Controllers */
Array.prototype.diff = function (a) {
    return this.filter(function (i) {
        return a.indexOf(i) < 0;
    });
};
function findByField(arr, f, n) {
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i][f] == n) {
            return arr[i];
        }
    }
    return null;
}

function merge(a, b) {
    var r = {};
    for (var i in a) {
        r[i] = a[i];
    }
    for (var i in b) {
        r[i] = b[i];
    }
    return r;
}


function MenuController(scope, http, $location) {
    http.post('/menu/admin', scope.form).
        success(function (response) {
            scope.pages = response.items;
            var uri = $location.$$url;
            //  console.log("response", response);
            scope.pages.map(function (item) {
                item.active = item.href.substr(1) === uri;
            });
        }).
        error(function (response) {
            scope.codeStatus = response || "Request failed";
            console.log('fail')
        });

    //handles menu item click event
    scope.click = function (item) {
        scope.pages.map(function (item) {
            item.active = false;
        });
        item.active = true;
    };
}
MenuController.$inject = ['$scope', '$http', '$location'];

function GoodsListController(scope, Service) {
    scope.data = [];
    Service.getAll().then(function (list) {
        scope.data = list;
    });
    scope.removeEntity = function (entity) {
        Service.remove(entity).then(function (response) {
            console.log(response)
            scope.data.splice(scope.data.indexOf(entity), 1);
        });
    }
}
GoodsListController.$inject = ['$scope', 'Goods'];
function GoodsAddController($scope, $location, Service) {
    $scope.entity = {           };
    $scope.saveEntity = function () {
        Service.add($scope.entity).then(function (arg) {
            if (arg[0].id) {
                //console.log(arg[0].id);
                $location.path('/goods/list');
            }
        });
    }
}
GoodsAddController.$inject = ['$scope', '$location', 'Goods'];
function GoodsEditController($scope, $routeParams, $location, Service) {
    $scope.entity = {           };
    Service.getById({id: $routeParams.id}).then(function (arg) {
        $scope.entity = arg[0];
        $scope.entity.id = $routeParams.id;
        console.log("response", $scope.entity);
    });
    $scope.saveEntity = function () {
        Service.update($scope.entity).then(function (arg) {
            $location.path('/goods/list');
        });
    }
}
GoodsEditController.$inject = ['$scope', '$routeParams', '$location', 'Goods'];

function AgentsListController(scope, Service) {
    scope.data = [];
    Service.getAll().then(function (list) {
        scope.data = list;
    });
    scope.removeEntity = function (entity) {
        Service.remove(entity).then(function (response) {
            console.log(response)
            scope.data.splice(scope.data.indexOf(entity), 1);
        });
    }
}
AgentsListController.$inject = ['$scope', 'Agents'];
function AgentsAddController($scope, $location, Service) {
    $scope.entity = {           };
    $scope.saveEntity = function () {
        console.log($scope.entity)
        Service.add($scope.entity).then(function (arg) {
            if (arg[0].id) {
                //console.log(arg[0].id);
                $location.path('/agents/list');
            }
        });
    }

}
AgentsAddController.$inject = ['$scope', '$location', 'Agents'];
function AgentsEditController($scope, $routeParams, $location, Service) {
    $scope.entity = {           };
    Service.getById({id: $routeParams.id}).then(function (arg) {
        console.log("response", arg);
        $scope.entity = arg[0];
        $scope.entity.id = $routeParams.id;
        console.log("response", $scope.entity);
    });
    $scope.saveEntity = function () {
        Service.update($scope.entity).then(function (arg) {
            $location.path('/agents/list');
        });
    }
}
AgentsEditController.$inject = ['$scope', '$routeParams', '$location', 'Agents'];

function PricingListController(scope, GoodsService, AgentsService, PricingService) {
    scope.pricingTypes = [
        {id: 0, name: 'Buy price'},
        {id: 1, name: 'Sale price'}
    ];
    scope.curPricingType = scope.pricingTypes[1];
    scope.curGood = null;
    scope.curGoodName = null;
    scope.curAgent = null;
    scope.curAgentName = null;
    scope.unBlockControls = function () {
        if (scope.curPricingType) {
            scope.goodsControlState = true;
            scope.agentsControlState = true;
        }
    }
    scope.searchByGoods = function () {
        if (scope.curGoodName) {
            GoodsService.getByName({name: scope.curGoodName}).then(function (list) {
                scope.goodsList = list;
                if (scope.goodsList.length == 1) {
                    scope.curGood = scope.goodsList[0];
                    searchPricingCallback();
                } else {
                    var o = findByField(scope.goodsList, 'name', scope.curGoodName);
                    if (o) {
                        console.log('searchByGoods', scope.goodsList);
                        scope.curGood = o;
                        searchPricingCallback();
                    }
                }
                console.log('searchByGoods', scope.curGood);
            });
        }
    }
    scope.curAgentName = 'ada'
    scope.searchByAgents = function () {
        if (scope.curAgentName) {
            AgentsService.getByName({name: scope.curAgentName}).then(function (list) {
                scope.agentsList = list;
                if (scope.agentsList.length == 1) {
                    scope.curAgent = scope.agentsList[0];
                    searchPricingCallback();
                } else {
                    var o = findByField(scope.agentsList, 'name', scope.curAgentName);
                    if (o) {
                        console.log('searchByAgents', scope.agentsList);
                        scope.curAgent = o;
                        searchPricingCallback();
                    }
                }
                console.log('searchByAgents', scope.curAgent);
            });
        }
    }
    function searchPricingCallback() {
        var obj = {type: scope.curPricingType.id};
        if (scope.curGood) {
            obj.good_id = scope.curGood.id;
        }
        if (scope.curAgent) {
            obj.agent_id = scope.curAgent.id;
        }
        PricingService.getByType_Agent_Good(obj).then(function (list) {
            scope.pricingList = list;
        });

    }
}
PricingListController.$inject = ['$scope', 'Goods', 'Agents', 'Pricings'];
function PricingEditController($scope, $http, $routeParams, $location) {

    $scope.entity = {           };
    console.log("PricingEditController", $routeParams);
    $http.post('/pricing/getById', {id: $routeParams.id}).
        success(function (response) {
            $scope.entity = response.response[0];
            $scope.entity.id = $routeParams.id;
            console.log("response", $scope.entity);
        }).
        error(function (response) {
            $scope.codeStatus = response || "Request failed";
            console.log('fail')
        });
    $scope.saveEntity = function () {
        $http.post('/pricing/updatePricingData', $scope.entity).
            success(function (response) {
                if (response.err) {
                    handleServerErrors(response.err)
                    return;
                }
                $location.path('/pricing');
            }).
            error(function (response) {
                $scope.codeStatus = response || "Request failed";
                console.log('fail')
            });
    }
}


function PricingAddController($scope, $http, $routeParams, $location) {
    $scope.entity = {           };
    console.log("PricingAddController", $routeParams);
    $scope.saveEntity = function () {
        console.log("PricingAddController", $scope.entity);
        $http.post('/pricing/insertNewAgent', $scope.entity).
            success(function (response) {
                if (response.err) {
                    handleServerErrors(response.err)
                    return;
                }
                $location.path('/agents');
            }).
            error(function (response) {
                $scope.codeStatus = response || "Request failed";
                console.log('fail')
            });
    }

}

