 angular.module('starter.controllers').controller('ConnCtrl', function($scope, $state) {
	//var connections = $scope.connections;
 
	$scope.viewTitle = "Connections";
	$scope.peopleConnected = $scope.connectionList;
  //alert('in conn ctrl '+Object.keys($scope.people).length);
	$scope.peopleOrderPredicates = ['hasNewMessages', 'firstName', 'lastName'];
  //$scope.connectNumber = Object.keys($scope.peopleConnected).length;

 //  if ($scope.connectionsList) {
	//  //  var key;
 //  //   for (key in $scope.) {
	// 	// 	var connection = connections[i];
	// 	// 	connection.afterAccept = true;

	// 	// }
	// }

  // $scope.getSortedConnections = function(list){

  //   return $.extend({},getNewMessageMatches(list));

  // }

  


  //   var getNewMessageMatches = function(list) {
  //   alert("work");
  //   var foundMatches = {};
  //   var key;
  //   for (key in list) {
      
  //     if (list[key].hasNewMessages) {
  //         foundMatches[key] = list[key];

  //      // foundMatches.push(match);
  //     }
  //   }
  //   return foundMatches;
  // };

  // var getNonPendingMatches = function(list) {
  //   var foundMatches = {};

  //    for (key in list) {
      
  //     if (!list[key].hasNewMessages) {
  //       //alert('hm..');
  //         foundMatches[key] = list[key];

  //      // foundMatches.push(match);
  //     }
 

  //   }
  //      return foundMatches;
  // }
  //   // for (var i = 0; i < potentialMatches.length; i++) {
  //   //   var match = potentialMatches[i];
  //   //   if (!match.hasReceivedConnectionRequest && !match.hasNewMessages) {
  //   //     foundMatches.push(match);
  //   //   }
  //   // }
  //   return foundMatches;
  // };

        $scope.numberOfItemsToDisplay = 10; // number of item to load each time
   // alert(" I AM PM" + $scope.potentialMatches.length);
    //alert(" I AM CONNECTIONS" + $scope.connections.length);
    $scope.noMoreItemsAvailable = false;

        $scope.addMoreItem = function(done) {

     // alert('Scrolling more');
      //alert($scope.noMoreItemsAvailable);
      //alert($scope.connections.length);
        if (Object.keys($scope.peopleConnected).length > $scope.numberOfItemsToDisplay){
        //  alert('next');
          $scope.numberOfItemsToDisplay += 20; // load 20 more items
      	$scope.$broadcast('scroll.infiniteScrollComplete');
        done(); // need to call this when finish loading more data
      }
        if(Object.keys($scope.peopleConnected).length < $scope.numberOfItemsToDisplay){
        $scope.noMoreItemsAvailable = true;

        }

      };

       $scope.$on('stateChangeSuccess', function() {
    $scope.addMoreItem();
  });

  //      $scope.$on('searchText', function(){

  //   $scope.scrollTop();
  // });

 $scope.scrollTop = function() {
    $timeout(function() {
      $ionicScrollDelegate.scrollTop(true);
    }, 1);
  };


});
