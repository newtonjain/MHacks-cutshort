angular.module('starter.controllers').controller('ContactCtrl', function($scope, socket, $timeout, $ionicFrostedDelegate, $ionicScrollDelegate, $rootScope, $stateParams, $http, $ionicActionSheet) {
$scope.sendMessages = function(message) {
	var messages=document.getElementById("message").value;
	//alert(messages);

	var toId="XHDiDUdIy6";
	//alert(messages);
	//alert($scope.myspecificId);
		if (!messages) {
			return;
		};
		socket.emit('send:message', {
			message : messages,
			to_id : toId,
			from_id : $scope.myspecificId
		});
		$scope.messages.push({
			content : messages,
			isSelf : true
		});

		 $ionicActionSheet.show({
         titleText: 'Message Sent',
         cancelText: 'Thank you for your feedback!',
         });
	
}
});
