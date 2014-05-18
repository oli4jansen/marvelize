app.directive('listItem', function() {
  return {
    restrict: 'EAC',
    scope: {
      format: '=format',
      data: '=data'
    },
    template: '<div ng-click="navigate()" class="list-item-inner list-item-{{format}}">'+
        '<img ng-src="{{data.image}}">'+
        '<h3>{{data.title}}</h3>'+
        '<p>{{data.description}}</p>'+
      '</div>',
    link: function(scope, element, attrs) {
      scope.navigate = function() {
        if(typeof scope.$parent.$parent.$parent.navigateToItem == 'function') scope.$parent.$parent.$parent.navigateToItem(scope.data.id);
      }
    }
  }
});