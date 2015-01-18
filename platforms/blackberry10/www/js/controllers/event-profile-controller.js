angular.module('starter.controllers').controller('EventProCtrl', function($scope, $state, $ionicActionSheet, infoBank, $http, $timeout, $ionicScrollDelegate ,$parse, $ionicSlideBoxDelegate) {
    

    $scope.slideIndex=0;
   
    $scope.eventTitle = "Event Info";

   // $ionicSlideBoxDelegate.update();

    var init = function() {

    };

  

  $scope.slideTo = function(index) {

    // $ionicSlideBoxDelegate.update();
    // $ionicSlideBoxDelegate.slide(index, [100]);
    $scope.slideIndex = index;

    if(index == 0){

      $scope.eventTitle = "Event Info";
    }
     if(index == 1){

      $scope.eventTitle = "Event Details";
    }
     if(index == 2){

      $scope.eventTitle = "Showcase";
    }
     if(index == 3){
      $scope.eventTitle = "Sponsors";
    }
     if(index == 4){
      $scope.eventTitle = "Sponsors";
    }

         // scrollToTop();
  
  };


  $scope.newWindow=function(link){

    var a=link;

   window.open(a, '_system', 'location=yes');
};

  $scope.maplink=function(myAddress) {
    var map= 'http://maps.google.com/maps?q='+escape(myAddress);
     window.open(map, '_system', 'location=yes');
};
  

  $scope.zoomin=function(image) {
   


window.open(image, 'resizable=1');
};


  // var scrollToTop = function() {
  //   $timeout(function() {
  //     //$ionicSlideBoxDelegate.update();
  //     $ionicScrollDelegate.scrollTop(true);
  //   }, 1);
  // };


   init();




  });