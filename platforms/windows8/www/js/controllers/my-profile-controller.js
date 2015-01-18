angular.module('starter.controllers').controller('MyProfile', function($scope, $http, socket, infoBank, $state, $q, $log) {
	

    $scope.edited= false;

    // $scope.change = function() {
    //   console.log('editclicked');
    //   $scope.edited=true;
    //   $scope.unregister();
    // };

   

/*    $scope.interestsString = '';
    for (var i=0; i<$scope.myProfile.interests.length; i++) { 
      if (i != $scope.myProfile.interests.length-1) {
        $scope.interestsString = $scope.interestsString + $scope.myProfile.interests[i] + ',';
      }
      else {
        $scope.interestsString = $scope.interestsString + $scope.myProfile.interests[i];
      }
    }    
*/
  $scope.newInterest = {one: ""};
  
  //$scope.interests = $scope.myProfile.interests;
  



 $scope.addInterests = function () {
  var duplicate = false;
       for(var i = 0; i< $scope.myProfile.interests.length; i++){
            if($scope.myProfile.interests[i] == $scope.newInterest.one){
                $scope.newInterest.one= "";
                duplicate = true;
            }
        }

    //alert($scope.newInterest.one);
    if ($scope.newInterest.one != "" && $scope.newInterest.one.replace(/\s/g, '').length && !duplicate) {
      $scope.myProfile.interests.push($scope.newInterest.one);
      $scope.newInterest.one = "";
      $scope.change();
    }

/*    for (var i=0; i<$scope.myProfile.interests.length; i++) { 
      if (i != $scope.myProfile.interests.length-1) {
        $scope.interestsString = $scope.interestsString + $scope.myProfile.interests[i] + ',';
      }
      else {
        $scope.interestsString = $scope.interestsString + $scope.myProfile.interests[i];
      }
    }
*/

  
  };



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