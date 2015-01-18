angular.module('starter.controllers').controller('LoginCtrl', function($scope, $state, $http, $window, $ionicActionSheet, $cordovaGeolocation, $cordovaOauth, $cordovaInAppBrowser) {

	localStorage.setItem("tutorialdone","1");
	var imageUrl = 'http:\/\/54.88.187.36:3000\/myProfile';

	var linkedInWindow;

	var init = function() {
		setupDebugTools();
		document.addEventListener("deviceready", onDeviceReady, false);
		$scope.signIn = signIn;
	
	};

	var setupDebugTools = function() {
		debugTools.skipLogin = completeLogin;
		if (localStorage.debugSkipLogin === 'true') {
			debugTools.skipLogin();
		}
	};

	var onDeviceReady = function() {	
		if (isLoggedIn()) {
			completeLogin();
		}

	};





	var signIn = function() {

		 linkedInWindow = window.open('http://54.88.187.36:3000/auth/linkedin/', '_blank', 'location=no');
		 linkedInWindow.addEventListener('loadstop', checkForAuthSignal);
		 linkedInWindow.addEventListener('exit', onLinkedInLoginDone);

		linkedInWindow.addEventListener("load", function() {
		setInterval(function(){ 		
			
			var ref = linkedInWindow.window.location;
			//alert(ref);
			if (ref == imageUrl) {
			//alert("just cleared linked in");
			//alert("just cleared linked in"+ JSON.stringify(event));
			setAppToLoggedIn();
			linkedInWindow.close();
			removeEventListeners();
			if (isLoggedIn()) {
			completeLogin();
		}
		}

		},500)
	});

	};


	var checkForAuthSignal = function(event) {
		//alert("checking for Auth signal" + event);
		//alert("checking for Auth signal" + JSON.stringify(event));

		if (isSuccessfulLogIn(event)) {
			//alert("just cleared linked in");
			//alert("just cleared linked in"+ JSON.stringify(event));
			linkedInWindow.close();
			setAppToLoggedIn();
			
		}
	};

	
	//alert(JSON.stringify(imageUrl));
	//alert(imageUrl);


	var isSuccessfulLogIn = function(event) {

		// TODO: Need to make a route for success and one for failure
		return event.url.search('http:\/\/54.88.187.36:3000\/myProfile') === 0;
	};

	var setAppToLoggedIn = function() {
		localStorage.setItem('logged', 'true');
	};

	var onLinkedInLoginDone = function(event) {
		removeEventListeners();
		if (isLoggedIn()) {
			completeLogin();
		}
	};


	var isLoggedIn = function() {
		return localStorage['logged'] === 'true';
	};

	var removeEventListeners = function() {
		linkedInWindow.removeEventListener('loadstop', checkForAuthSignal);
		linkedInWindow.removeEventListener('exit', onLinkedInLoginDone);

	};

	var completeLogin = function() {
		$state.go('app.potential-matches');
	};

	
	init();
});
