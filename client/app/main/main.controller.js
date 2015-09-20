'use strict';

angular.module('myjamApp')
.controller('MainCtrl', function ($scope, $http, $window, $sce, $log, VideosService) {
    function init() {
      $scope.youtube = VideosService.getYoutube();
      $scope.results = VideosService.getResults();
      $scope.upcoming = VideosService.getUpcoming();
      $scope.history = VideosService.getHistory();
      $scope.playlist = true;
  }

  init();

  $scope.launch = function (id, title) {
      VideosService.launchPlayer(id, title);
      VideosService.archiveVideo(id, title);
      VideosService.deleteVideo($scope.upcoming, id);
      $log.info('Launched id:' + id + ' and title:' + title);
  };

  $scope.queue = function (id, title) {
      VideosService.queueVideo(id, title);
      VideosService.deleteVideo($scope.history, id);
      $log.info('Queued id:' + id + ' and title:' + title);
  };

  $scope.delete = function (list, id) {
      VideosService.deleteVideo(list, id);
  };

  $scope.tabulate = function (state) {
      $scope.playlist = state;
  }
 
  $scope.loadMore = function () {
    VideosService.getMore();
  }
  
});
