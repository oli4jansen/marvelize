app.directive('listView', function() {

  var subMenuBar = 
    '<div class="sub-menu-bar" ng-if="items.length > 0">'+
      '<a class="image-button" ng-click="viewAsGrid()"><i class="ion-grid"></i></a>'+
      '<a class="image-button" ng-click="viewAsList()"><i class="ion-navicon"></i></a>'+
      '<span class="right">{{total}} items</span>'+
    '</div>';

  var footer = '<p ng-if="$parent.loading" class="center"><br><i class="ion-loading-d normal"></i><br><br>Asking Marvel for some data, please be patient..<br><br></p>';

  return {
    restrict: 'EAC',
    scope: {
      format: '=format',
      items: '=items',
      total: '=total'
    },
    template: subMenuBar+'<list-item format="format" ng-repeat="item in items" data="item"></list-item>'+footer,
    link: function(scope, element, attrs) {

      scope.viewAsGrid = function() {
        scope.format = 'grid';
      };

      scope.viewAsList = function() {
        scope.format = 'list';
      };

      scope.moreItemsRequests = [];
      scope.moreItemsRequests[0] = true; 

      scope.infiniteScrollTriggered = function() {
        if(!scope.moreItemsRequests[scope.items.length] && scope.items.length !== scope.total) {
          scope.moreItemsRequests[scope.items.length] = true;
          scope.$parent.getMoreItemsPlease();
        }
      };

      // DIRTY, YUK
      scope.$on("$destroy", function() {
        window.onscroll = function() {};
      });

      window.onscroll = function(event) {
        if(element && document.body.scrollHeight - (document.body.scrollTop + window.innerHeight) < 300) {
          scope.infiniteScrollTriggered();
        }
      }
    }
  }
});