angular.module('starter.controllers').controller('TutCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  //alert('got '+localStorage.getItem('tutorialdone'));
  if(localStorage.getItem("tutorialdone")!=null)
  {
    $state.go('login');
  }

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('login');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})


