angular.module('starter.controllers').controller('DialogueCtrl', function($scope, socket, $timeout, $ionicFrostedDelegate, $ionicScrollDelegate, $rootScope, $stateParams, $http) {
	// var theConns = $scope.connectionList;
	var tempId = $stateParams.userId;
		

	if($scope.connectionList[tempId])
	{

		$scope.talkerFullName = $scope.connectionList[tempId].firstName + " " + $scope.connectionList[tempId].lastName;
	}

		// for (var i = 0; i < theConns.length; i++) {
		// 	var match = theConns[i];
		// 	if (match.id === tempId) {
		// 		$scope.talkerFullName = match.firstName + " " + match.lastName;
		// 		//$scope.talkerLastN = match.lastName;
		// 	}
		// }
	


	var init = function() {
		$scope.dialogInfo.id = $stateParams.userId;
		clearExistingMessages();
		loadMessageLogs();
		$scope.message_handler = sendMessage;
		unflagNewMessagesForPeopleInAllViews();
		updateScrollAreaAndRedrawFrostedGlass();
		removeMessageId();
	};

	var removeMessageId = function(){
		socket.emit('ack:msg',
			{
				to_id : $stateParams.userId,
				from_id : $scope.myspecificId
			}
		)
	};


	var unflagNewMessagesForPeopleInAllViews = function() {
		unflagNewMessagesForPeople($scope.matchesList);
		unflagNewMessagesForPeople($scope.connectionList);
	};

	var unflagNewMessagesForPeople = function(matches) {
		var id = $stateParams.userId;



		if(matches[id])
			{
				//alert("I am deleting PM" );
				
				delete matches[id].hasNewMessages;
				matches[id].newMessageCount = 0;
				$scope.getPeopleWithNewMessageCount();
			}
		// for (var i = 0; i < matches.length; i++) {
		// 	var match = matches[i];
		// 	if (match.id === id) {
		// 		delete match.hasNewMessages;
		// 		match.newMessageCount = 0;
		// 	}
		// }
	};

	var clearExistingMessages = function() {
		$scope.messages.splice(0, $scope.messages.length);
	};

	var loadMessageLogs = function() {
		$http({
			method : 'GET',
			url : 'http://54.88.187.36:3000/queryMsgLogs',
			params : {
				to_id : $stateParams.userId,
				from_id : $scope.myspecificId
			}
		}).success(function(data, status, headers, config) {
			
			console.log('[DialogueCtrl] Got message logs');
			addMessageLogsToScope(data);
			updateScrollAreaAndRedrawFrostedGlass();
			$scope.$apply();
		}).error(function(data, status, headers, config) {
			console.log('[DialogueCtrl] Could not get message logs');
		});
	};

	var addMessageLogsToScope = function(data) {
		for (var i = 0; i < data.length; i++) {
			var messageData = data[data.length - 1 - i];
			var date=new Date(messageData.created);
			var stringdate = date.toString();
			//alert(messageData.created);
			$scope.messages.push({
				content : messageData.message,
				isSelf : messageData.from_id === $scope.myspecificId,
				time : stringdate
			});
		}
	};


	$scope.receivedMessageHandler.onReceiveMessage = function(data) {    
		$scope.messages.push({
			content : data.message,
			isSelf : false,
			time : "now"
		});
		updateScrollAreaAndRedrawFrostedGlass();		
	};

	var sendMessage = function(message) {
		if (!message) {
			return;
		}
		socket.emit('send:message', {
			message : message,
			to_id : $stateParams.userId,
			from_id : $scope.myspecificId
		});
		var sendtime=new Date();
		var stringsendtime = sendtime.toString();
		$scope.messages.push({
			content : message,
			isSelf : true,
			time: stringsendtime
		});
		updateScrollAreaAndRedrawFrostedGlass();
		$scope.send_message = '';
	};

	var updateScrollAreaAndRedrawFrostedGlass = function() {
		$ionicScrollDelegate.resize();
		$ionicFrostedDelegate.update();
		scrollToBottom()
	};

	var scrollToBottom = function() {
		$timeout(function() {
			$ionicScrollDelegate.scrollBottom(true);
		}, 1);
	};

	init();
});