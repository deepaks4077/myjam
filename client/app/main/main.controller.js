'use strict';

/*angular.module('myjamApp')
.controller('MainCtrl', function ($scope, $window, $http, socket, Search) {
	$scope.mainVideo = 'sMKoNBRZM1M';

	$window.initGapi = function() {
            $scope.$apply($scope.getChannel);
    };

	$scope.getVideos = function(val){
		return Search.googleApiClientReady().then(function (data) {
			return data;
		}, function (error) {
			console.log('Failed: ' + error)
		});
	}

	$scope.getLocation = function(val) {
		return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
			params: {
				address: val,
				sensor: false
			}
		}).then(function(response){
			return response.data.results.map(function(item){
				return item.formatted_address;
			});
		});
	};
});*/

function init() {
    window.initGapi(); // Calls the init function defined on the window
}
angular.module('myjamApp')
    .controller('MainCtrl', function ($scope, $window, $sce, googleService) {

    	$scope.mainVideo = 'sMKoNBRZM1M';

        $window.initGapi = function() {
            $scope.$apply($scope.getVideos(0));
        };

        $scope.getVideos = function(value) {
            return googleService.googleApiClientReady().then(function (data) {
                return data;
            }, function (error) {
                console.log('Failed: ' + error)
            });
        };
    })
	.service('googleService', ['$http', '$q', function ($http, $q) {

	    var deferred = $q.defer();
	    this.googleApiClientReady = function () {
	        gapi.client.setApiKey('AIzaSyAdLbwPetb6jwTyHDuh1QeVwAYD3cv_7ak');
	        gapi.client.load('youtube', 'v3', function() {
	            var request = gapi.client.youtube.playlistItems.list({
	                part: 'snippet',
	                playlistId: 'PLila01eYiSBjOtR8oqXkY0i5c1QS6k2Mu',
	                maxResults: 8
	            });
	            request.execute(function(response) {
	                deferred.resolve(response.result);
	            });
	        });
	        return deferred.promise;
	    };
	}])
