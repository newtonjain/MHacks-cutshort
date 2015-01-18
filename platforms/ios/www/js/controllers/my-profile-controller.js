angular.module('starter.controllers').controller('MyProfile', function($scope, $http, socket, infoBank, $state, $q, $log, ngDialog) {
	

    $scope.edited= false;  


 



 /*  	$scope.$watch('myProfile.headline', function() {
   	   // alert('hey, headline or something has changed!');
   	    //socket.emit('updateProfile', $scope.myProfile);
          if($scope.edited){
       
 		$http({method: 'POST', url: 'http://54.88.187.36:3000/updateProfile', data: $scope.myProfile});
   }
      });

   	$scope.$watch('myProfile.industry', function() {
         if($scope.edited){
 		$http({method: 'POST', url: 'http://54.88.187.36:3000/updateProfile', data: $scope.myProfile});
   }
	});

   	$scope.$watch('myProfile.mySummary', function() {
         if($scope.edited){
 		$http({method: 'POST', url: 'http://54.88.187.36:3000/updateProfile', data: $scope.myProfile});
	 }
   });

   	$scope.$watch('myProfile.interests', function() {
         if($scope.edited){
 		$http({method: 'POST', url: 'http://54.88.187.36:3000/updateProfile', data: $scope.myProfile});

		    }
          });

*/
   /* $scope.getImage=function(files){
  

      

            $http({method: 'POST', 

          url: 'http://54.88.187.36:3000/uploadImage',
          params: {
          files: files
          }})
        .success(function(data, status, headers, config) {
                  console.log(''+JSON.stringify(data));

           
                  //alert(JSON.stringify(data));
                 
                  //alert(JSON.stringify(data+"\n"));                
                  
                  //$scope.myProfile.pictureUrl=data.ImageURL ;

                  
                  //alert($scope.eventattend);
                  //alert(data.events_attending);
                  //deferred.resolve(data); 
                  
                 }).
                  
        error(function(data, status, headers, config) {
                  console.log('There was a problem retrieving your information');

       //         deferred.reject();
                });   
        
      //$scope.myProfile.pictureUrl.src=$flow.files[0];
    };*/
});