'use strict';

angular.module('myjamApp')
.controller('NavbarCtrl', function ($scope, $location, $http, $log, Auth, VideosService) {
  $scope.menu = [{
    'title': 'Home',
    'link': '/'
  }];

  $scope.isCollapsed = true;
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.isAdmin = Auth.isAdmin;
  $scope.getCurrentUser = Auth.getCurrentUser;

  $scope.logout = function() {
    Auth.logout();
    $location.path('/login');
  };

  $scope.isActive = function(route) {
    return route === $location.path();
  };

  $scope.search = function (searchValue) {
    $http.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: 'AIzaSyAdLbwPetb6jwTyHDuh1QeVwAYD3cv_7ak',
        type: 'video',
        maxResults: '8',
        part: 'id,snippet',
        fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
        q: searchValue
      }
    })
    .success( function (data) {
      VideosService.listResults(data);
      $log.info(data);
    })
    .error( function () {
      $log.info('Search error');
    });
  }
});