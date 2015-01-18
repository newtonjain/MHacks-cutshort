angular.module('starter')
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider


    .state('tut', {
      url: "/tut",
      templateUrl: "templates/tut.html",
      controller: "TutCtrl"
    })

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginCtrl"
    })


   .state('signup', {
      url: "/signup",
      templateUrl: "templates/signup.html",
      controller: "SignupCtrl" 
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

    .state('app.connections', {
      url: "/connections",
      views: {
        'menuContent' :{
          templateUrl: "templates/peopleConnections.html",
          controller: "ConnCtrl"
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

    .state('app.searchMatches', {
      url: "/searchMatches",
      views: {
        'menuContent' :{
          templateUrl: "templates/searchMatches.html",
          controller: "AppCtrl"
        }
      }
    })

    .state('app.dialogue', {
      url: "/dialogue/:userId",
      views: {
        'menuContent' :{
          templateUrl: "templates/dialogue.html",
          controller: 'DialogueCtrl'
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

     .state('app.eventsearch', {
      url: "/eventsearch",
      views: {
        'menuContent' :{
          templateUrl: "templates/eventsearch.html",
          controller: "EventSrcCtrl"
        }
      }
    })

    .state('app.eventprofile', {
      url: "/eventprofile",
      views: {
        'menuContent' :{
          templateUrl: "templates/eventprofile.html",
          controller: "EventProCtrl"
        }
      }
    })

    .state('app.attendeelist', {
      url: "/attendeelist",
      views: {
        'menuContent' :{
          templateUrl: "templates/attendeelist.html",
          controller: "AppCtrl"
        }
      }
    })

    .state('app.eventprofilePWC', {
      url: "/eventprofilePWC",
      views: {
        'menuContent' :{
          templateUrl: "templates/eventprofilePWC.html",
          controller: "EventProCtrl"
        }
      }
    })

    
     .state('app.contactus', {
      url: "/ContactUs",
      views: {
        'menuContent' :{
          templateUrl: "templates/contactus.html",
          controller: "ContactCtrl"
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

  // if none of the above states are matched, use this as the fallback
  // if(localStorage.getItem("tutorialdone")==null){
  // //alert("in loggin tur");
  // $state.go('tut');

  // }
  if(!localStorage.getItem("tutorialdone")){
  $urlRouterProvider.otherwise('/tut');
  }
  if(localStorage.getItem("tutorialdone")){
  $urlRouterProvider.otherwise('/login');
  }
  
});
