var youtubeServices = angular.module('youtubeServices', []);

youtubeServices.service('Search', ['$http', '$q', function($http, $q){

    var deferred = $q.defer();
    this.googleApiClientReady = function (val) {
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
}]);
