var typeAhead = angular.module('plunker', ["ngAnimate"]);

typeAhead.factory('dataFactory', function($http) {
  return {
    get: function(url) {
      return $http.get(url).then(function(resp) {
        return resp.data; // success callback returns this
      });
    }
  };
});

typeAhead.controller('TypeAheadController', function($scope, dataFactory) { // DI in action
  dataFactory.get('states.json').then(function(data) {
    $scope.items = data;
  });
  $scope.name = ''; // This will hold the selected item
  $scope.altName = '';
  $scope.onItemSelected = function() { // this gets executed when an item is selected
    console.log('selected=' + $scope.name);
  };
  $scope.onItemSelectedAlt = function() { // this gets executed when an item is selected
    console.log('selected=' + $scope.altName);
  };

    $scope.get_keys = function(object) {
        var keys_list = [];≥
        for (var key in object) {
            keys_list.push(key);
        }
        return keys_list;
    },
        $scope.selection_tree = {
            '': {
                'Select an Advertiser': ['Select an Order'],
                '':['Select an Order']
            },
            'HP': {
                '1': ['Recent Campaigns:', 'a', 'b', 'All Campaigns:', 'c', 'x', 'y', 'z', 'xyz'],
                '2': ['Recent Campaigns:', 'a', 'b', 'All Campaigns:', 'c', 'x', 'y', 'z', 'xyz']
            },
            'BOA': {
                '3': ['Recent Campaigns:', 'a', 'b', 'All Campaigns:', 'c', 'x', 'y', 'z', 'xyz'],
                '4': ['Recent Campaigns:', 'a', 'b', 'All Campaigns:', 'c', 'x', 'y', 'z', 'xyz']
            },
            'This is a really long string to show that the width adjusts itself': {
                '5': ['Recent Campaigns:', 'a', 'b', 'All Campaigns:', 'c', 'x', 'y', 'z', 'xyz'],
                '6': ['Recent Campaigns:', 'a', 'b', 'All Campaigns:', 'c', 'x', 'y', 'z', 'xyz']
            }
        };
    $scope.testObject = {
        'recentCampaigns': ['a', 'b'],
        'allCampaigns:': ['c', 'x', 'y', 'z']
    };
    $scope.order_object = {};

    $scope.selectedAdvertiser = '';
    $scope.advertisers = $scope.get_keys($scope.selection_tree);

    $scope.selectedOrder = '';
    $scope.$watch('selectedAdvertiser', function(value, oldValue) {
        $scope.order_object = $scope.selection_tree[value];
        $scope.order_options = $scope.get_keys($scope.selection_tree[value]);
        $scope.selectedOrder = '';
    });

    $scope.selectedCampaign = '';
    $scope.$watch('selectedOrder', function(value, oldValue) {
        $scope.campaigns = $scope.order_object[value];
        $scope.selectedCampaign = '';
    });

    $scope.selectedTestCampaign = '';
});

typeAhead.directive('typeahead', function($timeout) {
  return {
    restrict: 'AEC',
    replace: true,
    scope: {
      items: '=',
      prompt: '@',
      title: '@',
      subtitle: '@',
      model: '=',
      onSelect: '&'
    },
    link: function(scope, elem, attrs) {
     scope.handleSelection = function(selectedItem) {
        scope.model = selectedItem;
        scope.current = 0;
        scope.selected = true;
        $timeout(function() {
          scope.onSelect();
        }, 200);
      };
      scope.current = 0;
      scope.selected = true; // hides the list initially
      scope.boxHasFocus = false;
      scope.isCurrent = function(index) {
        return scope.current == index;
      };
      scope.handleFocus = function(){
        elem[0].children[0].value = '';
        scope.handleSelection('');
      };
      scope.setCurrent = function(index) {
        scope.current = index;
      };
    },
    templateUrl: 'templateurl.html'
  };
});