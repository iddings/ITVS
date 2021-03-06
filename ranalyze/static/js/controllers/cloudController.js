(function(app){
"use strict";

    var cloudController = function($scope, $rootScope, database, tabs) {

        var self = this;

        $scope.cloudParams = {};

        self.cloudMode = true;

        $scope.tableOrder = "-weight";

        var defaultsPromise = database.config.getCloudParams()
            .then(function(defaults){
                angular.extend($scope.cloudParams, defaults)
            });

        self.updateWeights = function(){
            defaultsPromise.then(function(){
                var entryWeight = $scope.cloudParams.entryWeight,
                totalWeight = $scope.cloudParams.totalWeight;
                for (var i=0;i<$scope.words.length;i++) {
                    $scope.words[i].weight = entryWeight * $scope.words[i].entries + totalWeight * $scope.words[i].total;
                }
                // Trigger an update by deep copying the words array
                $scope.words = angular.copy($scope.words);
            });
        };

        var d = new Date();

        database.frequency.overview({
            gran: database.frequency.granularity.DAY,
            limit: 150,
            year: 2016, //d.getFullYear()
            month: 11, //d.getMonth() + 1
            day: 14 //d.getDate()
        })
            .then(function(data){
                $scope.words = data.map(function(item){
                    return {
                        text: item.word,
                        entries: item.entries,
                        total: item.total,
                        html: {
                            class: 'clickable'
                        },
                        handlers: {
                            "click": function() {
                                tabs.setTab(0);
                                $rootScope.$broadcast('search.simple', {
                                    query: item.word,
                                    advanced: false,
                                    subreddit: []
                                });
                            }
                        }
                    };
                });
                self.updateWeights();
            });

    };

    app.controller('cloudController', cloudController);

})(app);