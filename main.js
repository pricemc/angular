var app = angular.module('madlibsApp', []);



app.controller('madlibsController', function madlibsController($scope, $http) {

    $scope.submit = function () {
        var allValues = true;
        var everything = "";
        for (i = 0; i < $scope.words.length; i++) {
            if (!$scope.words[i].value) allValues = false;

            everything += $scope.story[i] + $scope.words[i].value;
        }
        everything += $scope.story[$scope.story.length-2];
        if (!allValues) $scope.story_finished = "Please fill in all blanks";
        else {
            $scope.story_finished = everything;
            $scope.finished = true;
        }
    }
    $scope.init = function () {
        $scope.finished = false;
        $scope.words = [];
        $scope.story_finished = "Nothing here yet";
        var url = "http://madlibz.herokuapp.com/api/random?minlength=5&maxlength=25";
        console.log(url);
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            $scope.words = response.data.blanks.map(function (e) {
                return { name: e };
            })
            $scope.title = response.data.title;
            $scope.story = response.data.value;
            console.log($scope);
        }, function errorCallback(response) {
            console.log('getJSON request failed! ' + textStatus);
            console.log("incoming " + jqXHR.responseText);
        })
    }
})