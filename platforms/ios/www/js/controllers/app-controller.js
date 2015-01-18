angular.module('starter.controllers').controller('AppCtrl', function($scope, $rootScope, $http, infoBank, socket, $state, $cordovaGeolocation, $filter, $stateParams, $timeout, $ionicFrostedDelegate, $ionicScrollDelegate, $ionicScrollDelegate, $ionicActionSheet, ngDialog,$ionicSideMenuDelegate, mySocket, $cordovaProgress, $cacheFactory,  $cordovaPush) {

	//$cordovaProgress.showBar(true, 7000);

	$scope.j = 10;
	$scope.pageNumber=1;
	$scope.noteBullets=[];

	$scope.ideas= [];
	$scope.teams =[];
	 $scope.ideasLength = $scope.ideas.length;
	
	debugTools.scopes.appScope = $scope;
	debugTools.states.appState = $state;
	document.addEventListener("pause",onPause,false);
	document.addEventListener("resume",onResume,false);
	document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
    //getInfoAndEmitNewUser();
	function onPause(){
		console.log("we have paused");
		

	}

	function onResume(){
		console.log("we have resumed");
		navigator.geolocation.clearWatch($scope.watchpauseID);


		localStorage.setItem('logged', 'true');
	}

		function onOnline(){ 

    	getInfoAndEmitNewUser();
    }

    function onOffline(){ 
 
    }


	$scope.myProfile = {
		id: '',
    	firstName: 'firstName',
    	lastName: 'lastName',
    	headline: 'profession',
    	industry: 'industry',
    	mySummary: 'A journalist who is passionate about social welfare',
    	interests: ['sport', 'music'],
    	pictureUrl: 'img/kguy.png'
    };
  	
	if (debugTools.autoMockValues.connections) {
		$scope.connections = debugTools.autoMockValues.connections;
	}
	if (debugTools.autoMockValues.potentialMatches) {
		$scope.potentialMatches = debugTools.autoMockValues.potentialMatches;
	}
	var deviceid = 0;



	// if(localStorage.getItem('whichfence')==null)
	// {
	// 	localStorage.setItem('whichfence','null');
	// }

	var getInfoAndEmitNewUser = function () {
		infoBank.myInfo().then(function(data) {
			$scope.myspecificId = data.id;
			$scope.myProfile.id = data.id;
			$scope.localID = data.id;
			$scope.myProfile.firstName = data.firstName;
			$scope.myProfile.lastName = data.lastName;
			$scope.myProfile.headline = data.headline;
			$scope.myProfile.industry = data.industry;
			$scope.myProfile.mySummary = data.summary;			
			$scope.myProfile.interests=data.interests;						
			$scope.myProfile.pictureUrl = data.pictureUrl;
			$scope.pMatches = $scope.matchesList;
			localStorage.setItem("events", 0);

			//$scope.watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });


			  $timeout(function() {
				socket.emit('new:user',
				{
				 	id:data.id,
				 	fence:localStorage.getItem('whichfence')
				});
			},1000);	
		});
	};

	 getInfoAndEmitNewUser();

	  setInterval(function(){
		 // 	//alert("triggering");
		var watchOptions = {
    frequency : 1000,
    timeout : 3000,
    enableHighAccuracy: true // may cause errors if true
  };

	 var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
    },
    function(position) {
    	// alert("got position" + position);
     //  var lat  = position.coords.latitude
     //  var long = position.coords.longitude
      $scope.onSuccess(position);
      //alert("sending");
  });


		},2000);
		

	var outfence = false;
	// if(localStorage.getItem('whichfence')=="null")
	// 	{
	// 		outfence = false;
	// 	}else{
	// 		outfence = true;
	// 	}
 	
	var infence;


	$scope.onSuccess = function(position) {

        //var userGeo = [position.coords.latitude, position.coords.longitude];
		
			//alert('The Latitude:' + position.coords.latitude + position.coords.longitude);
			
			$http({method: 'GET', url: 'http://54.88.187.36:3000/whichGeoFence',
		          params: {
					locationx : position.coords.latitude
				   ,locationy : position.coords.longitude	            
					 //locationx: 43,  locationy：34    
		          }})
		                .success(function(data, status, headers, config) {
		                  //alert('got my information3' + JSON.stringify(data));

		                 if(data!=="null")
		                 {
		                 	//alert('got my information3' + JSON.stringify(data));
		                 	infence=true;
		                 	onGeoTestResponse(data);
		                  
		                
		              	
		              	}
		              	if(data=="null"){
		              	 infence=false;
		                 onGeoTestResponse(data);

		                   ngDialog.open({
                      template: 'You are not at the Hackathon yet',
                		scope: $scope,
                		plain:true,
                      className: 'ngdialog-theme-plain'

				      });
		                  loggingOut();

		              	}
		                }).
		                error(function(data, status, headers, config) {
		                  console.log('There was a problem retrieving your information');
		            
		                });

    };

    var onGeoTestResponse = function(data) {

    	if(outfence !== infence){
    		//alert('in here');
    		outfence = infence;
    		$scope.ideas= data.materials;
    		$scope.teams = data.teams;
    	
    		//localStorage.setItem('whichfence',data);

		if(data!=="null")
		                 {
    	$ionicActionSheet.show({
         titleText: 'Welcome',
         cancelText: 'Welcome to the ' + data.FenceID + " event",
         });

    	}
    }		
    
    };

	var loggingOut = function() {
				localStorage.removeItem('logged');
				window.location = 'index.html'; 
		
	};

	$scope.projects = function(){
		return $scope.ideas.length;
	}

	$scope.viewPerson = function(idea) {
		$scope.match = idea;
		$state.go('app.person');

	};	


	 $scope.change = function() {
      console.log('editclicked');
      $scope.edited=true;
      $scope.unregister();
    };

          $scope.modifyInterest = function (newInterest) {

  //alert("triggered" + newInterest);
    if (newInterest != "" && newInterest.replace(/\s/g, '').length) {
    	//alert("I am adding");
      $scope.myProfile.interests.push(newInterest);
      $scope.change();
    }

  };

  $scope.remove = function(value){

      $scope.noteBullets.splice(value, 1);
      $scope.change();

  };
   $scope.newInterest = {one: ""};

     $scope.removing = function(value){

      $scope.myProfile.interests.splice(value, 1);
      $scope.change();

  };


 $scope.addInterests = function (interest) {

    //alert(interest);
    var dup = false;
    if(interest == "")
       {
        
       }else{
        //alert('its not');
          for(i=0;i<$scope.myProfile.interests.length;i++)
          {
            //alert($scope.myProfile.interests[i]);
            if(interest.toLowerCase()===$scope.myProfile.interests[i].toLowerCase())
            {
              //alert('We have a duplicate '+interest+' '+$scope.myProfile.interests[i]);
              dup=true;
            }
          }
          if(!dup){
            //lert('no dupe safe to add');
            $scope.myProfile.interests.push(interest);
            $scope.newInterest.one = "";
            $scope.change();
          }
       }
  };

  $scope.addingNote = function(to_do){
  	$scope.noteBullets = to_do;
  }

  $scope.addNote = function(newNote){
  	$scope.noteBullets.push(newNote);

  }



});
