'use strict';

angular.module('myjamApp')
.controller('NavbarCtrl', function ($scope, $location, Auth, VideosService) {
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

  $scope.search = function(searchValue) {
    VideosService.search(searchValue);
  }
});