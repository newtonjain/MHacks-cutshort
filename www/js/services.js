angular.module('starter.services',[])

.factory('socket', function ($rootScope, infoBank) {
  console.log('In the factory');
  var socket = io.connect('http://54.88.187.36:5000/');

  socket.on('disconnect', function (socket) {
  socket = io.connect('http://54.88.187.36:5000/');
    //socket.socket.connect();
    //window.getInfoAndEmitNewUser();
  });
  
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
       // alert("Event name is: " + eventName + "//// Argument is: " + JSON.stringify(args ));
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
})

.factory('infoBank', function($http,$q){
     
  /*  console.log('in infobank');
    var infoBank = {
      populatedinfo: null,
      populatedlist: null,
      myInfo: {},
      matchesList: []
    };
*/

return {
      myInfo: function() {
          var deferred = $q.defer(); 

         $http({method: 'GET', url: 'http://54.88.187.36:3000/myProfile'}).
                success(function(data, status, headers, config) {
                  console.log('got my information' +JSON.stringify(data));
                  //alert('Welcome');
                  deferred.resolve(data);
                  //alert(JSON.stringify(data));
                }).
                error(function(data, status, headers, config) {
                  console.log('There was a problem retrieving your information');
                  deferred.reject();
                });

          return deferred.promise;
      },


      matchList: function() {

         var deferred = $q.defer(); 

         $http({method: 'GET', url: 'http://54.88.187.36:3000/everyone'}).
                success(function(data, status, headers, config) {
                  console.log('got my information ' +JSON.stringify(data));
                  deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                  console.log('There was a problem retrieving your information');
                  deferred.reject();
                });

          return deferred.promise;

      },

      konectList: function() {

         var deferred = $q.defer(); 
         console.log('sending a get for konnections list');
         $http({method: 'GET', url: 'http://54.88.187.36:3000/konections'}).
                success(function(data, status, headers, config) {
                  console.log('got my konections list ' +JSON.stringify(data));
                  deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                  console.log('There was a problem retrieving your konnections list');
                  deferred.reject();
                });

          return deferred.promise;

      },

      everyoneList: function() {

         var deferred = $q.defer(); 
         console.log('sending a get for konnections list');
         $http({method: 'GET', url: 'http://54.88.187.36:3000/everyone'}).
                success(function(data, status, headers, config) {
                  console.log('got my konections list ' +JSON.stringify(data));
                  deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                  console.log('There was a problem retrieving your everyoneList list');
                  deferred.reject();
                });

          return deferred.promise;
        },

      attendeeList: function() {
        var deferred = $q.defer(); 
         console.log('sending a get for konnections list');
         $http({method: 'GET', url: 'http://54.88.187.36:3000/atendee'}).
                success(function(data, status, headers, config) {
                  console.log('got my konections list ' +JSON.stringify(data));
                  deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                  console.log('There was a problem retrieving your everyoneList list');
                  deferred.reject();
                });

          return deferred.promise;
        },
        
      messageList: function() {

         var deferred = $q.defer(); 
         console.log('sending a get for konnections list');
         $http({method: 'GET', url: 'http://54.88.187.36:3000/konections'}).
                success(function(data, status, headers, config) {
                  console.log('got my konections list ' +JSON.stringify(data));
                  deferred.resolve(data);
                }).
                error(function(data, status, headers, config) {
                  console.log('There was a problem retrieving your konnections list');
                  deferred.reject();
                });

          return deferred.promise;

      }      

}

})

.factory('mySocket', function (socketFactory) {
  return socketFactory();
})

// .factory('mySocket', function (socketFactory) {
//   var mySocket = socketFactory();
//   mySocket.forward('error');
//   return mySocket;
// });