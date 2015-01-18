angular.module('starter')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginCtrl"
    })


    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
      
    })

    .state('app.potential-matches', {
      url: "/potential-matches",
      views: {
        'menuContent' :{
          templateUrl: "templates/people.html",
          controller: 'PotentialMatchCtrl'
        }
      }
    })

    .state('app.my-profile', {
      url: "/my-profile",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html",
          controller: 'MyProfile'
        }
      }
    })


    .state('app.person', {
      url: "/person",
      views: {
        'menuContent' :{
          templateUrl: "templates/person.html",
          controller: "PotentialMatchCtrl"
        }
      }
    })


  .state('app.logout',{
      url: "/logout",
      views: {
          'menuContent' : {
            //templateUrl: "index.html",
            controller: "LogoutCtrl"
          }
      }
    })

     
    .state('app.messaging', {
      url: "/messaging",
      views: {
        'menuContent' :{      
            templateUrl: "templates/messaging.html",
            controller: 'MessagingCtrl'
        }
      }
    }

  );

   $urlRouterProvider.otherwise('/login');
  
});
