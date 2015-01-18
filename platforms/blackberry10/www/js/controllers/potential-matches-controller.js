angular.module('starter.controllers').controller('PotentialMatchCtrl', function($scope, $http, socket, infoBank, $state, $ionicActionSheet, ngDialog, mySocket, $timeout) {

	debugTools.scopes.potentialMatchesScope = $scope;
	
	var matches = $scope.potentialMatches;

	$scope.names=[
	'david', 'sfsfds','sdfsdfsd','dsfgdsgs'
	];
	//var friends = $scope.connectionList;

	$scope.viewTitle = "Home";
	$scope.people = $scope.matchesList;
	$scope.clicked=false;
	$scope.attendee= $scope.attendees;
	$scope.showAttendee=true;
	$scope.peopleOrderPredicates = ['hasNewMessages', 'firstName', 'lastName'];


	$scope.konnect_f = function(match) {
	match.konnect = true;
		socket.emit('konnect:request', {
			from_id : $scope.myspecificId,
			to_id : match.id,
			request : match.konnect
		});
		
	};

	$scope.konnect_accept = function(match) {
		socket.emit('konnect:accept', {
			from_id : $scope.myspecificId,
			to_id : match.id,
			value : true
		});
		match.afterAccept = true;
		match.hasReceivedConnectionRequest = false;
		$scope.connectionList[match.id] = match;
		$scope.getPeopleWithPendingConnection();
		$scope.pendingRequestList();
		
		$scope.$apply();
	};

	$scope.konnect_reject = function(person) {
		socket.emit('konnect:reject', {
			from_id : $scope.myspecificId,
			to_id : person.id,
			value : false
		});
		//alert("in function konect_reject"+person+ " here is the id" + person.id);
		//removePeopleWithId(person.id);
		removeMatchesWithId(person.id);
		$scope.getPeopleWithPendingConnection();
	};

	socket.on('konnect:receive', function(message) {
		//alert("konnect recieve function triggered" + JSON.stringify(message));
		//alert("step0");
		$scope.matchesList[message.from_id].hasReceivedConnectionRequest = true;
		//alert("step1");
		$scope.getPeopleWithPendingConnection();
		//alert("step2");
		$scope.pendingRequestList();

	});

	socket.on('user:left', function(message) {
		//alert("user left" + JSON.stringify(message));
		//removePeopleWithId(message);
		//removeMatchesWithId(message);
	});

	socket.on('konnect:remove', function(message) {
		//removePeopleWithId(message.from_id);
		//alert("Socket remove" + JSON.stringify(message));
		removeMatchesWithId(message.from_id);
	});

	socket.on('konnect:allow', function(message) {
		//alert("Socket allow konect allow function triggered" + JSON.stringify(message));
		$scope.matchesList[message.from_id].afterAccept = true;
			$scope.connectionList[message.from_id]= $scope.matchesList[message.from_id];

	});

	socket.on('konnect:removeIdsuccess', function(message){
		//removePeopleWithId(message.from_id);
		//alert("Socket request2 removeIdsuccess" + JSON.stringify(message));
		removeMatchesWithId(message.id);
	});

	socket.on('konnect:removeIdNotification', function(match){
		//alert(match.from_id);
		//alert("I am  fking deleting" + JSON.stringify(match));
		//alert("Socket request3" + JSON.stringify(match));
		removeMatchesWithId(match.from_id);
	});

		$scope.konnect_delete = function(match) {
		 
		//var cusName = $scope.friends.firstName + ' ' + $scope.friends.lastName;
		$scope.value = true;

		ngDialog.open({
            template: 'Delete',
 			scope: $scope,
 			
            className: 'ngdialog-theme-plain'

          });
	};
        
		$scope.confirm=function(match){
			//alert("44" + JSON.stringify(match.id));
			if($scope.connectionList[match.id])
			{
			//	alert("I am confirming" + JSON.stringify($scope.connectionList[match.id]));
				socket.emit('konnect:removeId', {
					from_id : $scope.myspecificId,
					to_id : match.id
					});


				delete $scope.connectionList[match.id];
				$scope.getPeopleWithNewMessageCount();
			}

		
			$scope.clicked = true;
			match.konnect = false;
			match.afterAccept= false;
		//
			ngDialog.close();
};

	
	var removeMatchesWithId = function(id){

			alert("In remove function" + id);
			//alert("rf step0");
				
			delete $scope.matchesList[id];
			//alert("rf step1");
			
			//alert("rf step2");

			for(var i = $scope.j-10; i<$scope.j; i++){
				if($scope.keys[i]==id){
					//alert("key1");
					$scope.keys.splice(i,1);
				}
				if($scope.keys2[i]==id){
					//alert("key2");
					$scope.keys2.splice(i,1);
					break;
				}

			}

			delete $scope.connectionList[id];
			delete $scope.prequestList[id];

			//alert("rf step3");
			$scope.$apply();

	};




	$scope.numberOfItemsToDisplay = 10; // number of item to load each time
			   // alert(" I AM PM" + $scope.potentialMatches.length);
			    //alert(" I AM CONNECTIONS" + $scope.connections.length);
			$scope.noMoreItemsAvailable = false;

			$scope.addingMoreItem = function(done) {

			 //alert('Scrolling more');
			
				//alert("adding 10 more");
			  if (Object.keys($scope.matchesList).length > $scope.numberOfItemsToDisplay){
		        //  alert('next');
		          $scope.numberOfItemsToDisplay += 30; // load 10 more items
		      	$scope.$broadcast('scroll.infiniteScrollComplete');
		        done(); // need to call this when finish loading more data
		      }

		       if(Object.keys($scope.matchesList).length < $scope.numberOfItemsToDisplay){
		        $scope.noMoreItemsAvailable = true;

		        }
			};

			      $scope.$on('stateChangeSuccess', function() {
		    $scope.addMoreItem();
		  });

		// $scope.next = function(){
			
		// 	var cnt = $scope.j;
		// 	//alert("in next");
		// 	 for(var i=cnt; i<cnt+10; i++){

		// 	 	$scope.keys2[i - cnt] = $scope.keys[i];
		// 	 	//alert($scope.keys2[i]);

			 	
		// 	 }
		// 	 if($scope.keys[$scope.j]!=null){
		// 	 $scope.j= $scope.j +10;
		// 	 //alert($scope.j);
		// 	}
		// }

		// $scope.previous = function(){
			
		// 	var cnt = $scope.j-10;
		// 	//alert("in next");
		// 	 for(var i=cnt; i>cnt-10; i--){

		// 	 	$scope.keys2[cnt - i] = $scope.keys[i];
		// 	 	//alert($scope.keys2[i]);

			 	
		// 	 }
		// 	 if($scope.keys[$scope.j-10]!=null){
		// 	 $scope.j= $scope.j - 10;
		// 	 //alert($scope.j);
		// 	}
		// }
			


	$scope.Attendeelist=function(Attendee){
		$scope.attendeeCheck=document.getElementById("Attendee").checked;
		//alert($scope.attendeeCheck);
	};

	$scope.$on('searchText', function(){
		$scope.scrollTop();
	});

 $scope.scrollTop = function() {
    $timeout(function() {
      $ionicScrollDelegate.scrollTop(true);
    }, 1);
  };


  $scope.notification = function(){
  	      if($scope.count + $scope.pendingReq == 0){
  	      	 $ionicActionSheet.show({
         titleText: 'Notification Panel',
      buttons: [
        { text: ' No Notification'},
        
      ],

     
         });
      
         }


      if($scope.count + $scope.pendingReq != 0){
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
	}
	};

	


  $scope.animate = true;


});

