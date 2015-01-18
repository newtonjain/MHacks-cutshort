angular.module('starter.controllers')

.filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
})

angular.module('starter.controllers')

.filter('orderObjectBy', function() {
  // alert("In filter1");
  return function(items, field, reverse) {
    //alert("In filter2 "+JSON.stringify(items)+" and "+field);
    //alert("then " +reverse);
    var filtered = [];
    angular.forEach(items, function(item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      //alert("In filter3");
      return (a[field] > b[field] ? 1 : -1);
      
    });
    if(reverse) filtered.reverse();
    //alert("In filter4 " +filtered);
    return filtered;
  };
})

