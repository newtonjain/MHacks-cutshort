angular.module('starter.controllers').controller('AppCtrl', function($scope, $rootScope, $http, infoBank, socket, $state, $filter, $stateParams, $timeout, $ionicFrostedDelegate, $ionicScrollDelegate, $ionicScrollDelegate, $ionicActionSheet, ngDialog, $cordovaPush,$ionicSideMenuDelegate, mySocket, $cacheFactory, $cordovaGeolocation, $cordovaPush) {

	

	$scope.keys = [];
	$scope.EventPage = [];
	$scope.keys2 = [];
	$scope.j = 10;
	$scope.pageNumber=1;
	//$scope.cache = $cacheFactory('cacheId');
	//$scope.inRoom=false;
	debugTools.scopes.appScope = $scope;
	debugTools.states.appState = $state;
	document.addEventListener("pause",onPause,false);
	document.addEventListener("resume",onResume,false);
	document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
    //getInfoAndEmitNewUser();
	function onPause(){
		console.log("we have paused");
		//alert("in on pause state");
			//setInterval(function(){
			$scope.watchpauseID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });
		//},15000);

	}

	function onResume(){
		console.log("we have resumed");
		navigator.geolocation.clearWatch($scope.watchpauseID);

		socket.emit('new:user',
				{
				 	id:$scope.myspecificId,
				 	fence:localStorage.getItem('whichfence')
				});

		localStorage.setItem('logged', 'true');
	
	}



	function onOnline(){ 

    	getInfoAndEmitNewUser();
    }

    function onOffline(){ 
    	//alert('You are offline, please check your connection.');
   /*
    	$ionicapptutorialSheet.show({
         titleText: 'Connection status',
         cancelText: 'You are offline, please check your connection.',
         });
  */
   	//socket.emit('new:user', $scope.myspecificId);  
    }

	$scope.attendees=[];
	$scope.eventattend=[];

	$scope.messages = [];
	//$scope.potentialMatches = [];
	$scope.matchesList = {};
	$scope.roommates = [];
	$scope.connectionList ={};
	$scope.connections = [];
	$scope.receivedMessageHandler = {};
	$scope.dialogInfo = {};
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
  	$scope.pmNumber = 0;
	if (debugTools.autoMockValues.connections) {
		$scope.connections = debugTools.autoMockValues.connections;
	}
	if (debugTools.autoMockValues.potentialMatches) {
		$scope.potentialMatches = debugTools.autoMockValues.potentialMatches;
	}
	var deviceid = 0;

	var updatedeviceid = function () {
		//alert(localStorage.getItem('devid'));
		if(deviceid==0)
		{
	
		 $http({method: 'GET', url: 'http://54.88.187.36:3000/pushID',
		 	params : {
		 		deviceid: localStorage.getItem('devid'),
		 		platform: 'Android'
		 	}}).
	        success(function(data, status, headers, config) {
	          console.log('got my information2' +JSON.stringify(data));
	       //   alert('Push id android is successful');
	        }).
	        error(function(data, status, headers, config) {
	          console.log('There was a problem retrieving your information');
	     
	        });
	        deviceid = 1;
	    }

	};

	//$scope.whichfence;
	if(localStorage.getItem('whichfence')==null)
	{
		localStorage.setItem('whichfence','null');
	}

	var getInfoAndEmitNewUser = function () {
		infoBank.myInfo().then(function(data) {

			//alert("data.id is: " + data.id);
			
			$scope.myspecificId = data.id;
		
			$scope.pendingConnections = data.pending;

			$scope.pendingmessages=data.pendingMsgs_fromid;

			/*
				Fix for interests. If the user has no interests then there is nothing 
				to split causing the code to break and nothing after this to be excuted
			*/

			//if(data.interests == ''){
			//	var interestsArray = data.interests.split(",");
			//}

			//alert(JSON.stringify(data));
			$scope.eventattend=data.events_attending;
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

			if(device.platform == 'android' || device.platform == 'Android'){
			//	alert('I am android');
				updatedeviceid();

			}

			  $timeout(function() {
				socket.emit('new:user',
				{
				 	id:data.id,
				 	fence:localStorage.getItem('whichfence')
				});
			},1000);	

			 // $scope.searchEvent('DD');
		});
	};

	 getInfoAndEmitNewUser();
	
		
		 setInterval(function(){
		 	//alert("triggering");
		$scope.watchID = navigator.geolocation.watchPosition(onSuccess, onError, { enableHighAccuracy: true });

		},10000);

	infoBank.konectList().then(function(data) {
		
		var i;
		if (data && data.length) {
			for ( i = 0; i < data.length; i++) {
				//$scope.connections.push(data[i]);
				$scope.connectionList[data[i].id]= data[i];
				$scope.connectionList[data[i].id].afterAccept = true;
			}
			listenPendingMessages($scope.connectionList, $scope.pendingmessages);
			 //$scope.connectNumber = Object.keys($scope.connectionList).length;
			//listenPendingMessages($scope.matchesList, $scope.pendingmessages);
			// $scope.getSortedConnections($scope.peopleConnected);
		}

	})

	socket.on('add:user', function(message) {
			
		if ($scope.myspecificId != message.id) {
			//alert('adding user' + JSON.stringify(message));
			// alert('adding user' + JSON.stringify(message.matchinginterests));
		
			//for(var i=0; i<20; i++){
		//	alert('adding user' + JSON.stringify(message));

			
			//$scope.matchesList[message.id + message.id] = message;


			// 	$scope.temp = $scope.templatemp + 1;
			//}
		// for(var i=0; i<10; i++){
		// 	 if ($scope.matchesList[message.id+i] === undefined) {
		// 	 	//alert("I am in if statement");
  //     		  $scope.keys.push(message.id+i);

  //     		  if($scope.keys2.length<10){
  //     		  	$scope.keys2.push(message.id+i);

  //     		  }

  //    			 }
  //    		$scope.matchesList[message.id+i] = message;
  //    	}

  			if ($scope.matchesList[message.id] === undefined) {
			 
      		  $scope.keys.push(message.id);

     			if($scope.keys2.length<10){
     				//alert("pushing keys2 " + message.id);
      		  	$scope.keys2.push(message.id);

      		  }
     		}
     		$scope.matchesList[message.id] = message;

			
			if ($scope.isAConnection(message)) {
				message.afterAccept = true;
			}
			if ($scope.hasPendingSentConnectionRequest(message)) {
				//alert("this is true");
				message.konnect = true;
				$scope.getPeopleWithPendingConnection();
				//$scope.pendingRequestList();
			}if(message.afterAccept!=true){
			if ($scope.hasPendingReceivedConnectionRequest(message)) {
				//alert(" this is the one"+ JSON.stringify(message));
				message.hasReceivedConnectionRequest = true;
				$scope.getPeopleWithPendingConnection();
				$scope.pendingRequestList();
			}
		}

			
		// var counter = 0;
		 var matching_string=[];
				$scope.myProfile.common = [message.id, message.matchinginterests];
				message.commonInterest = message.matchinginterests;
				 message.numInterests=message.matchinginterests.length;
				$scope.orderPeopleByInterest=['numInterests'];
				//alert("I have a score for you" + message.score);

				
			
			$scope.$apply();
			//$scope.$broadcast("scroll.refreshComplete");
		}
	});

		$scope.next = function(){
			if($scope.keys[$scope.j+10]!=null){
			//	alert("in first if");
			var cnt = $scope.j;
			$scope.k = $scope.j;
			//alert("in next");
			 for(var i=cnt; i<cnt+10; i++){

			 	$scope.keys2[i - cnt] = $scope.keys[i];
			 	//alert(" the value of i is:" + i + " value of cnt is: " + cnt + " and the value of i-cnt is: " + $scope.keys[i] + "keys2"+ $scope.keys2[i - cnt]);

			 	//alert($scope.keys2[i]);

			 	
			 }
			 $ionicScrollDelegate.scrollTop(true);

			 
			 $scope.j= $scope.j +10;
			 $scope.pageNumber = $scope.pageNumber + 1;
			// alert($scope.j);
			}
			else if($scope.keys[$scope.j+10]==null){
			if($scope.keysLength() - $scope.j>0){
			//	alert("in second if");
			var cnt = $scope.j;
			$scope.k = $scope.j;
			//alert("in next");
			 for(var i=cnt; i<cnt+10; i++){
			 	
				
			 	$scope.keys2[i - cnt] = $scope.keys[i];
			 	//alert(" the value of i is:" + i + " value of cnt is: " + cnt + " and the value of i-cnt is: " + $scope.keys[i] + "keys2"+ $scope.keys2[i - cnt]);
			 	if($scope.keys[i]==null){
			 		var diff = i - cnt;
			 		//alert("now splicing" + diff );
			 		$scope.keys2[diff]= [0];
			 		//$scope.keys2.splice(diff);
			 	}
			 	//alert($scope.keys2[i]);

			 }

			 $ionicScrollDelegate.scrollTop(true);
			 $scope.lastPage = true;
			 
			// $scope.j= $scope.j +10;
			 $scope.pageNumber = $scope.pageNumber + 1;
			// alert($scope.j);
			}
		}


		}

		$scope.previous = function(){
			if($scope.keys[$scope.k-10]!=null){
			$scope.lastPage = false;
			var cnt = $scope.k -10;
			 $scope.j = $scope.k ;
			 for(var i=cnt; i<cnt+10; i++){

			 	$scope.keys2[i - cnt] = $scope.keys[i];
			 	//alert($scope.keys2[i]);

			 	
			 }
			 $ionicScrollDelegate.scrollTop(true);
			 
			 $scope.k= $scope.k - 10;
			 $scope.pageNumber = $scope.pageNumber - 1;
			// alert($scope.k);
			}
		}

		$scope.keysLength = function(){
			var i = 0
			$scope.counting = 0
			while($scope.keys[i]!= null){
				i++;
				$scope.counting = $scope.counting + 1;
			}
			return $scope.counting;
		}

			$scope.keys2Length = function(){
			var i = 0
			$scope.counting2 = 0
			while($scope.keys2[i]!= null){
				i++;
				$scope.counting2 = $scope.counting2 + 1;
			}
			alert($scope.keys2);
			return $scope.counting2;

		}



	$scope.pendingRequestList = function() {
		//alert("in pending request function");
		$scope.prequestList={};
		var key;
	

		for (key in $scope.matchesList) {
			//var person = people[i];
			//alert('hey1 '+ key);

			if ($scope.matchesList[key].hasReceivedConnectionRequest) {
				alert("in pending request function" + $scope.matchesList[key]);

				$scope.prequestList[key] = $scope.matchesList[key];
			}
		}
	};


	var outfence = false;
	if(localStorage.getItem('whichfence')=="null")
		{
			outfence = false;
		}else{
			outfence = true;
		}
 	
	var infence;

	var onSuccess = function(position) {



		//alert("position function invoked");
        /*var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';
        //$scope.geoinfo = element.innerHTML;*/
        //var userGeo = [position.coords.latitude, position.coords.longitude];
        //alert(userGeo[0]);
        //$http({method: 'GET', url: 'http://54.88.187.36:3000/myLocation',data: userGeo});
        var userGeo = [position.coords.latitude, position.coords.longitude];
			//alert('The Latitude:'+ userGeo[0] + "///////////" + 'The longitude:'+ userGeo[1]);
			//$cordovaGeolocation.clearWatch($scope.watch);
			//$cordovaGeolocation.clearWatch($scope.watchpauseID);

			//alert('The Latitude:'+ lat + "/////////////////" + 'The longitude:'+ long);
			
			$http({method: 'GET', url: 'http://54.88.187.36:3000/myLocation',
		          params: {
					locationx : position.coords.latitude
				   ,locationy : position.coords.longitude	            
					 //locationx: 43,  locationy：34    
		          }})
		                .success(function(data, status, headers, config) {
		                  console.log('got my information3' +JSON.stringify(data));
		                 // alert('success happened');
		                 // alert(data);
		                

		                 if(data!=="null")
		                 {
		                 infence=true;
		              	 onGeoTestResponse(data);
		              	}
		              	if(data=="null"){
		              	 infence=false;
		                 onGeoTestResponse(data);

		              	}
		                  //alert(JSON.stringify(data));
		                }).
		                error(function(data, status, headers, config) {
		                  console.log('There was a problem retrieving your information');
		            
		                });

		    navigator.geolocation.clearWatch($scope.watchID);
			navigator.geolocation.clearWatch($scope.watchpauseID);


    };


    $scope.fenceChange1 = function(fence){
    	//var fence = "pwc";
    	infence = true;
    	onGeoTestResponse(fence);
    	$scope.inRoom=true;

    }

      $scope.fenceChange2 = function(fence){
    	//var fence = "pwc";
    	infence = false;
    	onGeoTestResponse(fence);
    	$scope.inRoom=false;

    }


    var onGeoTestResponse = function(data) {

    	//alert("value of infence is: " + infence + " the data is: " + data);
    	if(outfence !== infence){
    		outfence = infence;
    	
    		//alert('state changed, event is ' + data);
    		localStorage.setItem('whichfence',data);
    		$scope.removeEveryone();
    		//alert($scope.potentialMatches.length);
    		//$scope.potentialMatches.splice(0, $scope.potentialMatches.length);
    		//alert($scope.myspecificId);
    		socket.emit('new:user', 
		    {
		    	id: $scope.myspecificId,
		    	fence:data,
		    	statechange:true
		    });


		if(data!=="null")
		                 {
    	$ionicActionSheet.show({
         titleText: 'Welcome',
         cancelText: 'Welcome to the ' + data + " event",
         });

    	
   		//$scope.searchEvent(data);

    	}
    }
		
    
    	//setTimeout(testConnection, 5000);
    };

	var onError = function(position) {
       // alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
    }

	$scope.removeEveryone = function(){

		for (key in $scope.matchesList) {
			delete $scope.matchesList[key];
		}

		$scope.keys.splice(0,$scope.keys.length);
		$scope.keys2.splice(0,$scope.keys2.length);

	
		for (key in $scope.prequestList) {
			delete $scope.prequestList[key];
		}
			//alert(JSON.stringify($scope.matchesList));
			//alert($scope.keys);
			//alert($scope.keys2);

	}    

	$scope.getSortedPeople = function(people) {
		//alert('getsorted '+JSON.stringify(people));
		return [].concat(getNewMessageMatches(people)).concat(getPendingMatches(people)).concat(getNonPendingMatches(people));
	};

	$scope.hasPendingSentConnectionRequest = function(person) {
		
		for (var i = 0; i < $scope.pendingConnections.length; i++) {
			var connection = $scope.pendingConnections[i];
			if (person.id === connection.name && connection.request_type === 'request') {
				//$scope.getPeopleWithPendingConnection();
				return true;
				
			}
		}
		return false;
	};

	$scope.hasPendingReceivedConnectionRequest = function(person) {
		var connections = $scope.pendingConnections;
	//	alert(" hasPendingReceivedConnectionRequest" + JSON.stringify($scope.pendingConnections) );

		for (var i = 0; i < connections.length; i++) {
			var connection = connections[i];
			if (person.id === connection.name && connection.request_type === 'receive') {
				//$scope.getPeopleWithPendingConnection();
				return true;
				
			}
		}
		return false;
	};

	$scope.isAConnection = function(person) {

		if($scope.connectionList[person.id])
			{
				//alert("I am being called" + JSON.stringify(connections[person.id]));
				return true;
			}


		// for (var i = 0; i < connections.length; i++) {
		// 	var connection = connections[i];
		// 	if (person.id === connection.id) {
		// 		return true;
		// 	}
		// }
		return false;
	};

	var getNewMessageMatches = function(potentialMatches) {
		var foundMatches = [];
		for (var i = 0; i < potentialMatches.length; i++) {
			var match = potentialMatches[i];
			if (match.hasNewMessages) {
				foundMatches.push(match);
			}
		}
		return foundMatches;
	};

	var getPendingMatches = function(potentialMatches) {
		var foundMatches = [];
		for (var i = 0; i < potentialMatches.length; i++) {
			var match = potentialMatches[i];
			if (match.hasReceivedConnectionRequest) {
				foundMatches.push(match);
			}
		}
		return foundMatches;
	};
	$scope.getPendingRequests = getPendingMatches;

	var getNonPendingMatches = function(potentialMatches) {
		var foundMatches = [];
		for (var i = 0; i < potentialMatches.length; i++) {
			var match = potentialMatches[i];
			if (!match.hasReceivedConnectionRequest && !match.hasNewMessages) {
				foundMatches.push(match);
			}
		}
		return foundMatches;
	};

	$scope.exceptEmptyComparatorSummary = function (actual, expected) {
		$scope.getsearchSummary=false;
		var sln = expected.length;
	
		var slnSummary= actual.length+10;
		var str = actual;
    	var pos = str.search(new RegExp(expected, "i"));
    	if(sln>=2 && pos>=0){
    		$scope.personalSummary= actual.substring(pos-10, slnSummary);
    		$scope.getsearchSummary=true;
    		return true;}
    	
 		else{

 			$scope.getsearchSummary=false;
 		return angular.equals(expected, actual);
 	};

	};   
    	
	$scope.exceptEmptyComparatorInterest = function (actual, expected) {

			$scope.getsearchInterest=false;
			var sln = expected.length;
			var actualInterest=actual;
    			if(actual.search(new RegExp(expected, "i"))>=0 && sln>=2){

    				$scope.getsearchInterest=true;
    				$scope.searchinterest=actualInterest;
    				return true;
    				}
    			
    		else{
    			$scope.getsearchInterest=false;
 		return angular.equals(expected, actual);
    		};

    	};

	var loggingOut = function() {
		socket.on('logout:ack',function(){

				localStorage.removeItem('logged');
				 //super.clearCache();
				window.location = 'index.html'; 
				
		});
	};

	var listenForNewMessageEvent = function() {
		socket.on('send:receive', function(data) {
			
			if ($state.current.name === "app.dialogue" && $scope.dialogInfo.id === data.from_id) {
				$scope.receivedMessageHandler.onReceiveMessage(data);
				socket.emit('ack:msg',
			{
				to_id : data.from_id,
				from_id : $scope.myspecificId
			}
		)
			} else {
				flagNewMessagesForPeople($scope.matchesList, data);
				flagNewMessagesForPeople($scope.connectionList, data);
				$scope.getPeopleWithNewMessageCount();

				$scope.$apply();
			}
		});
	};


	var listenPendingMessages = function(matches, pendingmessages){
		
		for (var j = 0; j<pendingmessages.length; j++){
	
			if(matches[pendingmessages[j]])
			{
				//alert("I am being called" + JSON.stringify(matches[pendingmessages[j]]));
				matches[pendingmessages[j]].hasNewMessages = true;
			}
			$scope.getPeopleWithNewMessageCount();
			
		// for (var i = 0; i < matches.length; i++) {
		// 	console.log('in inner loop '+i);
		// 	var match = matches[i];
		// 	if (match.id === pendingmessages[j]) {
		// 	console.log('this id matched for messages '+match.id);

		// 		match.hasNewMessages = true;
		// 	}
		// }
	}
	};

		var flagNewMessagesForPeople = function(matches, data) {
			//alert("Entering function" + JSON.stringify(matches[data.from_id]));
		if(matches[data.from_id])
		{
			//alert("I am in the if statement" + data.from_id);
			matches[data.from_id].hasNewMessages = true;
		}

	

	};

	listenForNewMessageEvent();
	loggingOut();

	$scope.viewPerson = function(match) {
		$scope.match = match;

		$state.go('app.person');
		
		
		ngDialog.close();

		$scope.getsearchSummary=false;
		$scope.getsearchInterest=false;
		$scope.searchinterest={};
		$scope.personalSummary={};
	};	



	$scope.getPeopleWithNewMessageCount = function() {
		//var people = $filter('unique')([].concat($scope.connections), 'id');
		//var people = $scope.connection;

		$scope.count = 0;
		var key;
		for (key in $scope.connectionList) {
			//var person = people[i];

			if ($scope.connectionList[key].hasNewMessages) {
	
			//alert('hey2 '+JSON.stringify(key));
				console.log('messagecount '+$scope.connectionList[key].id);
				$scope.count = $scope.count +1;
			}
		}
		return $scope.count;
	};
	
	$scope.getPeopleWithPendingConnection = function() {
		//var people = $filter('unique')([].concat($scope.connections), 'id');
		//var people = $scope.connection;
		$scope.pendingReq = 0;
		
		var key;
		for (key in $scope.matchesList) {
			//var person = people[i];

			if ($scope.matchesList[key].hasReceivedConnectionRequest) {
	
			//alert('hey2 ');
				//console.log('messagecount '+$scope.connectionList[key].id);
				$scope.pendingReq = $scope.pendingReq +1;
			}
		}
		return $scope.pendingReq;
	};


	$scope.getPeopleWithNewMessageCount();
	$scope.getPeopleWithPendingConnection();
	//$scope.searchEvent('Demo');

    $scope.searchEvent = function(eventID) {
    	//alert("searching event"+ eventID);

     // var eventid=document.getElementById("eventID").value;
      var id = eventID.toUpperCase();
      //	alert(id);
        $http({method: 'GET', url: 'http://54.88.187.36:3000/searchEvent/'+id}).
                success(function(data, status, headers, config) {
                  console.log('got my information1' +JSON.stringify(data));
                  //alert(JSON.stringify(data));
                      if(data==="null"){
                      	$scope.value = true;

						ngDialog.open({
            					template: 'Please enter a valid event ID.',
 								scope: $scope,
 								plain:true,
            					className: 'ngdialog-theme-plain'

          			});
                     
   			 }else{
                      $scope.EventPage.push(data);
               //  alert("here is the length"+ $scope.EventPage.length + JSON.stringify($scope.EventPage) );
              }

                }).
                error(function(data, status, headers, config) {
                  console.log('There was a problem retrieving your information');
                  
                });

      };


  
       $scope.attendConfirm=function(eventID){
     	       	 
     //   var deferred = $q.defer(); 
         id=document.getElementById("eventID").value.toUpperCase();

         //alert(id);
        $http({method: 'GET', 
          url: 'http://54.88.187.36:3000/attend/',
          params: {
            userid:$scope.myspecificId,
            eventid: id
          }})
        .success(function(data, status, headers, config) {
                  console.log(''+JSON.stringify(data));
                  //alert(JSON.stringify(data));

                  $scope.eventattend=data.events_attending;
            	 //alert($scope.eventattend);
                  //alert(data.events_attending);
                  //deferred.resolve(data); 
                  $scope.$apply();
                 }).
                  
        error(function(data, status, headers, config) {
                  console.log('There was a problem retrieving your information');

       //         deferred.reject();
                });      
        };

 $scope.viewEvent = function(events) {
    	//alert(JSON.stringify(events));
    	  	
    $scope.eventinfo=events;
	if(events.ID=="PWC"){
	$state.go('app.eventprofilePWC');
	}
	else{
	$state.go('app.eventprofile');
	}
    };

	 infoBank.attendeeList().then(function(data) {
        	var i;
        	var j;
        	var peoplelist=[];
        	for ( i = 0; i < data.length; i++) {
        		$scope.attendees.push(data[i]);
        	}
        	//alert(peoplelist);
        	
        	//alert($scope.attendees);

        });

	 $scope.emailcomment="Please Enter your PWC email address";
  $scope.emailtoken = function(email){
    
    var emailadd=document.getElementById("email").value;
    //alert(emailadd);
    var searchemail = emailadd.search("@pwc");
    if(emailadd=="guest@pwc.com")
    	 $scope.verify=true;
    //alert(searchemail);
    if(searchemail>0)
    {
      $scope.emailcomment="Please check your email to confirm your identity";
      //alert(emailadd);
    }
    else
      $scope.emailcomment="please enter an valid PWC email address";
      //alert("please enter an valid PWC email address");
      
    };

     $scope.open = function () {

     	
    //alert(openedId); 	
    //alert(JSON.stringify($scope.eventinfo));
    		$scope.value = true;

          ngDialog.open({
            template: 'templates/searchMatches.html',
 			scope: $scope,
 
            className: 'ngdialog-theme-default'

          });
        };
    $scope.close=function(){
    	ngDialog.close();
    };

//////
var pushNotification;
            //alert("ohh fuck");
            function onDeviceReady() {
                //alert("deviceready");
                $("#app-status-ul").append('<li>deviceready event received</li>');
                
                document.addEventListener("backbutton", function(e)
                {
                    $("#app-status-ul").append('<li>backbutton event received</li>');
                    
                    if( $("#home").length > 0)
                    {
                        // call this to get a new token each time. don't call it to reuse existing token.
                        //pushNotification.unregister(successHandler, errorHandler);
                        e.preventDefault();
                        navigator.app.exitApp();
                    }
                    else
                    {
                        navigator.app.backHistory();
                    }
                }, false);
            
                try 
                { 
                	 //alert('I am trying');
                    pushNotification = window.plugins.pushNotification;
              $("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
                    if (device.platform == 'android' || device.platform == 'Android' ||
                            device.platform == 'amazon-fireos' ) {
            
            pushNotification.register(successHandler, errorHandler, {"senderID":"826694012155","ecb":"onNotification"});        // required!
                    //alert(senderID);
                    } else {
                        //alert('I am apple');
                        pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});    // required!
                        
                    }
                }
                catch(err) 
                { 
                    txt="There was an error on this page.\n\n"; 
                    txt+="Error description: " + err.message + "\n\n"; 
                   // alert(txt); 
                } 
            }

   //          function onNotificationAPN (event) {
			// 	if ( event.alert )
			// 	{
			// 		navigator.notification.alert(event.alert);
			// 	}

			// 	if ( event.sound )
			// 	{
			// 		var snd = new Media(event.sound);
			// 		snd.play();
			// 	}

			// 	if ( event.badge )
			// 	{
			// 		pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
			// 	}
			// }
    

            function tokenHandler (result) {
            	 alert(" in token handler" + result);
                $("#app-status-ul").append('<li>token: '+ result +'</li>');
             

            $http({method: 'GET', url: 'http://54.88.187.36:3000/pushID',
		 	params : {
		 		deviceid: result,
		 		platform: 'Ios'
		 	}}).
	        success(function(data, status, headers, config) {
	          console.log('got my information' +JSON.stringify(data));
	        }).
	        error(function(data, status, headers, config) {
	          console.log('There was a problem retrieving your information');
	     
	        });
                
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }
            
            function successHandler (result) {
                $("#app-status-ul").append('<li>success:'+ result +'</li>');
                
            }
            
            function errorHandler (error) {
                $("#app-status-ul").append('<li>error:'+ error +'</li>');
               // alert('Not registered');
            }

            document.addEventListener('deviceready', onDeviceReady, true);
            
/////////Intro Tour   

 //     $scope.ChangeEventMenu = function (targetElement) {
 //        console.log("Change Event called");
 //        console.log(targetElement);
 //        localStorage.setItem($scope.localID,"1");
 //    };

 //    $scope.BeforeChangeEventMenu = function (targetElement) {
 //        console.log("Before Change Event called");
 //        console.log(targetElement);

 //    };




 //    $scope.AfterChangeEventMenu = function (targetElement) {
 //        console.log("After Change Event called");
 //        console.log(targetElement);
    
 //    };


 //    $scope.ExitEventMenu = function () {
 //  		localStorage.setItem("informed","1");

 //  		$state.go('app.my-profile');
 //        console.log("Exit Event called");
 //        $scope.TourOpen();
     

 //    };
    

 //     $scope.CompletedEventMenu = function (step1) {
 //      	localStorage.setItem("informed","1");
      
 //         $state.go('app.my-profile');
 //         $scope.TourOpen();
         

 //    };

    
   

    
 //     $scope.MenuTour = {
 //        steps:[
 //         {
 //            element:'#step1',
 //            intro: 'Click here to activate the menu options',
 //            position: 'right'
 //        },
 //         {
 //            element:'#step2',
 //            intro: 'Here is the list of all the users who are near-by',
 //            position: 'bottom'
 //        },
 //        {
 //            element:'#step3',
 //            intro: 'Your connection list, you can send messages to your connections',
 //            position: 'bottom'
 //        }, 
 //        {
 //            element:'#step4',
 //            intro: 'If you are going to a KONECTIVITY serviced event, please click here ',
 //            position: 'bottom'
 //        },
 //        {
 //            element:'#step5',
 //            intro: 'You can change your personal profile in here',
 //            position: 'bottom'
 //        }
       
 //        ],
 //        showStepNumbers: false,
 //        exitOnOverlayClick: false,
 //        exitOnEsc:true,
 //        nextLabel: '<strong>NEXT!</strong>',
 //        prevLabel: '<span style="color:green">Previous</span>',
 //        skipLabel: 'Exit',

 //        doneLabel: '<strong>Tour End</strong>'
 //    };

 // $scope.TourOpen = function () {

     	
 //    //alert(openedId); 	
 //    //alert(JSON.stringify($scope.eventinfo));
 //    		$scope.value = true;

 //          ngDialog.open({
 //            template: 'Please complete your personal information, and add your interests, it can help you connect with more interesting people.',
 // 			scope: $scope,
	// 		plain:true,
	// 		className: 'ngdialog-theme-plain'

 //          });
 //        };


 //    $scope.apptutorial = function(){
 //    	return false;

 //    };


	 $scope.connectionremove = function(match){	
	 	//alert(match.id);
	 	//$scope.connectremove(match);


		if($scope.connectionList[match.id])
			{
				//alert("I am deleting" + JSON.stringify($scope.connectionList[match.id]));
				
				delete $scope.connectionList[match.id];
			}

	 	  // for (var i = 0; i < $scope.connections.length; i++) {      
     //      var person = $scope.connections[i];
     //      if (match.id === person.id){      
     //      $scope.connections.splice(i, 1); 
     //    }
     //  }
	 };



	 $scope.connectionNumber = function(){
	 	$scope.temp =  Object.keys($scope.connectionList).length;
		return $scope.temp;


	 }

	 $scope.pmatchesNum = function(){
	 	$scope.pmNum = Object.keys($scope.matchesList).length;
		return $scope.pmNum;


	 }



	 $scope.change = function() {
      console.log('editclicked');
      $scope.edited=true;
      $scope.unregister();
    };

    $scope.unregister = function() {
    alert("detecting before http");
         if($scope.edited){
           // alert("detecting");
    $http({method: 'POST', url: 'http://54.88.187.36:3000/updateProfile', data: $scope.myProfile}).
    success(function(data, status, headers, config) {
                  //alert('got my information' +JSON.stringify(data));
                 // alert('Welcome');
              $scope.removeEveryone();
                socket.emit('new:user',
                    {
                      id:$scope.myspecificId,
                      fence:localStorage.getItem('whichfence')
                    });
                // unregister();
                  
                }).
                error(function(data, status, headers, config) {
                 // alert("an error occured");
                        
                });
  
            
                 

        }
        // unregister();
          };


  // $rootScope.$on('pushNotificationReceived', function(event, notification) {
  //   if (notification.alert)
  //     navigator.notification.alert(notification.alert)

  //   if (notification.sound)
  //     var snd = new Media(event.sound);
  //     snd.play();

  //   if (notification.badge) {
  //     $cordovaPush.setBadgeNumber(notification.badge)
  //       .then(function(result) {
  //         // Success!
  //       }, function(err) {
  //         // An error occurred. Show a message to the user
  //       });
  //   }
  // });
// $scope.profileChanged = function(){
// 	setTimeout(function() {


//     alert('Welcome');
    
//          }, 2000);
            
// 		};



});
