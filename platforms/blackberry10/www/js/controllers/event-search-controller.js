angular.module('starter.controllers').controller('EventSrcCtrl', function($scope, $state, $ionicActionSheet, infoBank, $http, $timeout, $ionicScrollDelegate,$parse, $ionicSlideBoxDelegate) {
    
  
    var init = function() {
    
      $scope.attendevent();
      //$scope.searchEvent("public");
          
    };
    var registered =[];
    registered = JSON.parse(localStorage["events"]);

     $scope.attendevent=function(){
    //alert($scope.eventattend);
          localStorage["events"] = JSON.stringify($scope.eventattend);

           //alert(localStorage.getItem('events'));
         for (var i = 0; i < $scope.eventattend.length; i++) {
           
            id=$scope.eventattend[i];
            if(id != registered[i]){
             // alert("I can actually detect this" + id);
            

            //alert(id);
               $http({method: 'GET', url: 'http://54.88.187.36:3000/searchEvent/'+id}).
                success(function(data, status, headers, config) {
                  console.log('got my information' +JSON.stringify(data));
                  //alert('within the data '+JSON.stringify(data));


                 if(data!=="null"){
                 $scope.EventPage.push(data);
                
                }
                }).
                error(function(data, status, headers, config) {
                  console.log('There was a problem retrieving your information');
                });  
              }
              
          };

  };


  var scrollToTop = function() {
    $timeout(function() {
      $ionicScrollDelegate.scrollTop(true);
    }, 1);
  };

   init();




  });