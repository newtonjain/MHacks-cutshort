angular.module('starter.controllers').controller('PotentialMatchCtrl', function($scope, $http, socket, infoBank, $state, $ionicActionSheet, ngDialog, mySocket, $timeout, $cordovaProgress) {
	//$cordovaProgress.showBar(true, 50000);
	debugTools.scopes.potentialMatchesScope = $scope;
	var matches = $scope.potentialMatches;
	
	// $scope.ideas= ['Oculus Rift', 'Raspberry Pi',  'Arduino Uno',	'Servo',
	// 'Pebble', 'Ultrasonic Rangefinder', 'LeapMotion', 'Parrot AR Drone'	, 'Meta Glasses', 'Myo', 'Google Glass'	,

	// 'Tessel Audio'	, 'Alienware Laptop'	, 'Tessel Relay'	];

	$scope.wallMessages =['Has anyone used this SDK before', 
	'I have seen this at the Ted Talks', 
	'I can help you out with that'];


	$scope.addList= function(shareText){
		if(shareText!=''){
		//alert($scope.ideas);
			$scope.ideas.push(shareText);
			}
	}

	$scope.names=[
	'david', 'sfsfds','sdfsdfsd','dsfgdsgs'
	];

	$scope.joined = false;

	$scope.joinTeam = function(){
		$scope.joined = true;

	}

	$scope.addToWall = function(newmessage){
		//alert(newmessage);
		$scope.wallMessages.push('');
		for(var i =$scope.wallMessages.length-1; i>0; i--){

			$scope.wallMessages[i]=$scope.wallMessages[i-1];


		}

		$scope.wallMessages[0]=newmessage;
		//alert($scope.wallMessages);
	}

	//var friends = $scope.connectionList;

	$scope.viewTitle = "Home";
	$scope.clicked=false;
	$scope.peopleOrderPredicates = ['hasNewMessages', 'firstName', 'lastName'];



 $scope.scrollTop = function() {
    $timeout(function() {
      $ionicScrollDelegate.scrollTop(true);
    }, 1);
  };


  $scope.notification = function(){

  $ionicActionSheet.show({
         titleText: 'Notification Panel',
  
      buttons: [
        { text: ' New Messages <i class="icon ion-ios7-arrow-thin-right"></i> ' +  $scope.count },
        { text: ' Connection Request <i class="icon ion-ios7-arrow-thin-right"></i> ' + $scope.pendingReq },
      ],

      buttonClicked: function(index) {
      //alert(index);
      if(index==0){
      	$state.go('app.connections');
      }
        if(index==1){
      	$state.go('app.potential-matches');
      }
       return true;
     }

         });
	};

  $scope.animate = true;


});

