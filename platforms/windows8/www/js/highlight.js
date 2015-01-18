'use strict';

/**
 * Wraps the
 * @param text {string} haystack to search through
 * @param search {string} needle to search for
 * @param [caseSensitive] {boolean} optional boolean to use case-sensitive searching
 */
angular.module('ui.highlight',[]).filter('highlight', function () {
  return function (text, search) {
    if (text && (search || angular.isNumber(search))) {
      text = text.toString();
      search = search.toString();
    
        return text.replace(new RegExp(search, 'gi'), '<span class="ui-match">$&</span>');
      
    } else {
      return text;
    }
  };
});
