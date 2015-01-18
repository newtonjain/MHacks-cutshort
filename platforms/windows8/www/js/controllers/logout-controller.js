angular.module('starter.controllers').controller('LogoutCtrl', function($scope, $state, socket, $timeout) {
	socket.emit('konect:logout', {
		from_id : 'hello',
		to_id : 'why',
		value : false
	});


	localStorage.setItem('logged', 'false');
	// TODO: I don't think we need to send that data for logout

	
		/*socket.on('logout:ack',{
				
				localStorage.removeItem('logged');
				window.location = 'index.html';    

			});*/
	
		$timeout(function() {
				localStorage.removeItem('logged');
		
				window.location = 'index.html';   

			},2000);	


});
