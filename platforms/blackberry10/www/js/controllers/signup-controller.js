angular.module('starter.controllers').controller('SignupCtrl', function($scope, $rootScope, $state, $http, $window, $ionicActionSheet, $ionicTabsDelegate, $timeout, $ionicScrollDelegate) {



 $scope.tab=11;

  $scope.isSet = function(checkTab) {
      return $scope.tab === checkTab;
    };

    $scope.setTab = function(setTab) {
      $scope.tab = setTab;
    };

      $scope.selectTabWithIndex = function(index) {
    $ionicTabsDelegate.select(index);
     if(index == 0){
            $scope.signingTitle = "Sign In";
            //scrollToTop();
        }
         if(index == 1){
            $scope.signingTitle = "Sign Up";
            //scrollToTop();
        }
  }
 
  $scope.interestFld = "";
  
  $scope.interests = [];

         $scope.addInterest = function (interestFld) {
            $scope.interestFld = interestFld;
           // alert("the interestfld is:" + $scope.interestFld);
           for(var i = 0; i< $scope.interests.length; i++){
            if($scope.interests[i] == $scope.interestFld){
                $scope.interestFld = "";
            }
        }
    
    if ($scope.interestFld != "" && $scope.interestFld.replace(/\s/g, '').length) {

       
      $scope.interests.push($scope.interestFld);
      $scope.interestFld = "";
    }
    if( Object.prototype.toString.call( $scope.interests ) === '[object Array]' ) {
    //alert( $scope.interests );
    }
//alert($scope.interests[0] + "  " + $scope.interests[1] + "  " + $scope.interests[2] + "  " + $scope.interests[3] + "  ");
  };

  var init = function() {
        setupDebugTools();
        document.addEventListener("deviceready", onDeviceReady, false);
        $scope.noLinkedinSignIn = noLinkedin;
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

    var noLinkedin = function(email,Pword) {
            //alert("Name is: " + name + "    Email is: " + email + "      Password is: " + Pword);
            var loginInfo = {
            //loginName: name,
            username: email.toLowerCase(),
            password: Pword
            };
            //alert(JSON.stringify(loginInfo));
            //$http({method: 'POST', url: 'http://54.88.187.36:3000/login', data: loginInfo});
           $http({method: 'POST', url: 'http://54.88.187.36:3000/login',data: loginInfo}).
                success(function(data, status, headers, config) {
                  //alert('got my information' +JSON.stringify(data));
                  //alert('Welcome');

                  $state.go('app.potential-matches');
                 // alert("I am setting it to be true");
                  localStorage.setItem('logged', 'true');
                  
                }).
                error(function(data, status, headers, config) {
                        

                        $ionicActionSheet.show({
                        titleText: 'Login Failed',
                        cancelText: 'Please check your email or password.',
                        cancel: function() {
                        console.log('CANCELLED');
                        },
                        buttonClicked: function(index) {
                        console.log('BUTTON CLICKED', index);
                        return true;
                      },
                      
                    });
                 
                });
            //alert(loginInfo.loginName);

            //if (authenfication is success, then) {
                //$state.go('app.potential-matches');
            //}
        };


        var isLoggedIn = function() {
        return localStorage['logged'] === 'true';
    };
 


    var completeLogin = function() {
        $state.go('app.potential-matches');
    };

   


            $scope.verified = false;
            $scope.sname = false;
            $scope.sprofession = false;
            $scope.semail = false;
            $scope.spassword = false;

/*        $scope.signupInfo = {
        signupFirstName: 'fname',
        signupLastName: 'lname',
        signupProf: 'prof',
        signupEmail: 'email',
        signupPassword: 'passwd',
        signupKeyword: '222',
        signupDesc: desc
        };
*/



	//var init = function() {	
		//$scope.signupHandler = handleAllInfo;
		//alert($scope.signupHandler);
	//};


	 $scope.signupHandler = function(fname,lname,prof,email,passwd,desc,keyWords) {

        $scope.signupInfo = {
            signupFirstName: fname,
            signupLastName: lname,
            signupProf: prof,
            signupEmail: email.toLowerCase(),
            signupPassword: passwd,
            signupKeyword: [],
            signupDesc: desc
            };   
/*       	$scope.signupInfo.signupFirstName = fname;
        $scope.signupInfo.signupLastName = lname;
        $scope.signupInfo.signupProf = prof;
        $scope.signupInfo.signupEmail = email;
        $scope.signupInfo.signupPassword =passwd;
        //$scope.signupInfo.signupKeyword = keyWords;
        $scope.signupInfo.signupDesc =desc;
*/
        $scope.signupInfo.signupKeyword = $scope.interests;
   // alert($scope.signupInfo.signupKeyword[0] + '  ' + $scope.signupInfo.signupKeyword[1] + '  ' + $scope.signupInfo.signupKeyword[2]);
        
        $scope.sname = ($scope.signupInfo.signupFirstName.length >= '2' && $scope.signupInfo.signupLastName.length >= '2') ? true : false;
        $scope.sprofession = $scope.signupInfo.signupProf.length >= '2' ? true : false;
        $scope.spassword = $scope.signupInfo.signupPassword.length >= '2' ? true : false;
        $scope.semail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($scope.signupInfo.signupEmail);

        $scope.verified = ($scope.sname && $scope.sprofession && $scope.spassword && $scope.semail);

    if ($scope.verified) {

            
            $http({method: 'POST', url: 'http://54.88.187.36:3000/signupProfile',data: $scope.signupInfo}).
            success(function(data, status, headers, config) {
              
              //alert('Welcome');
              //$state.go('app.potential-matches');
              
                
                var loginInfo = {
                //loginName: name,
                username: email.toLowerCase(),
                password: passwd
                };
                  $http({method: 'POST', url: 'http://54.88.187.36:3000/login',data: loginInfo}).
                    success(function(data, status, headers, config) {
                      //alert('got my information' +JSON.stringify(data));
                      $ionicActionSheet.show({
                            titleText: 'Welcome',
                            cancelText: 'Enjoy Konecting!',
                        
                        });
                    localStorage['logged'] === 'true';
                      $state.go('app.potential-matches');
                      localStorage.setItem('logged', 'true');
                    }).
                    error(function(data, status, headers, config) {
                      $ionicActionSheet.show({
                    titleText: 'Login Failed',
                    cancelText: 'Please check your email or password.',
                    cancel: function() {
                    console.log('CANCELLED');
                    },
                    buttonClicked: function(index) {
                    console.log('BUTTON CLICKED', index);
                    return true;
                  },
                  
                });
                     
                 });
              

            }).
            error(function(data, status, headers, config) {
             // alert('There was a problem creating your profile, it could be that the email address is already used by someone else '+data);
                         
            $ionicActionSheet.show({
                     titleText: 'Sign-up Error',
                     cancelText: 'There was a problem creating your profile, it could be that the email address is already used by someone else '+ data,
                     });

            });
    
        }
        else {

            var notCorrect = '';
            if (!$scope.sname) {notCorrect = notCorrect + '-Name  ' + "\n";}
            if (!$scope.sprofession) {notCorrect = notCorrect + '-Profession  ' + "\n";}
            if (!$scope.spassword) {notCorrect = notCorrect + '-Password  ' + "\n";}
            if (!$scope.semail) {notCorrect = notCorrect +  '-Email  ' + "\n";}
            //alert('Information you entered is not in correct forms, please try again. These fields need to be changed or filled: ' + "\n" + notCorrect);
            

            $ionicActionSheet.show({

        titleText: 'Sign-up Incomplete',
        cancelText: 'Change or fill in with correct format:   ' + "\n" + notCorrect,
        cancel: function() {
        console.log('CANCELLED');
        },
        buttonClicked: function(index) {
        console.log('BUTTON CLICKED', index);
        return true;
      },
  
    });


        }
         
    };

    var scrollToTop = function() {
    $timeout(function() {
      //$ionicSlideBoxDelegate.update();
      $ionicScrollDelegate.scrollTop(true);
    }, 1);
  };

    $scope.terms = function() {
        
        $window.open('http://www.konectivity.com/termsofuse.html', '_blank', 'location=no');

    };

    init();

});
