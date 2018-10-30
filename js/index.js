var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog) {

  // Toolbar search toggle
  $scope.toggleSearch = function (element) {
    $scope.showSearch = !$scope.showSearch;
  };

  // Sidenav toggle
  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };
  $scope.speaker = {};
  $scope.speaker.img = "https://cdn.shopify.com/s/files/1/0303/7725/t/2/assets/clio-emt-speaker.png?245932330282961812";
  // Menu items
  $scope.menu = [{
      link: '',
      title: 'Dashboard',
      icon: 'action:ic_dashboard_24px' // we have to use Google's naming convention for the IDs of the SVGs in the spritesheet
    },
    {
      link: '',
      title: 'heatmaps',
      icon: 'social:ic_group_24px'
    },
    {
      link: '',
      title: 'Messages',
      icon: 'communication:ic_message_24px'
    }
  ];
  $scope.admin = [{
      link: '',
      title: 'Trash',
      icon: 'action:ic_delete_24px'
    },
    {
      link: 'showListBottomSheet($event)',
      title: 'Settings',
      icon: 'action:ic_settings_24px'
    }
  ];

  // App items
  $scope.apps = [{
      link: '',
      title: 'Aaaaa',
      desc: '',
      icon: 'social:ic_group_24px',
      image: 'timetable.png'
    },
    {
      link: '',
      title: 'Bbbbb',
      desc: '',
      icon: 'social:ic_group_24px',      image: 'tim2.png'
    },
    {
      link: '',
      title: 'Ccccc',
      desc: '',
      icon: 'social:ic_group_24px',    },
    {
      link: '',
      title: 'Ddddd',
      desc: ' ',
      icon: 'social:ic_group_24px',    },
    {
      link: '',
      title: 'Eeeee',
      desc: ' ',
      icon: 'social:ic_group_24px',    },
    {
      link: '',
      title: 'Fffff',
      desc: ' ',
      icon: 'social:ic_group_24px',    },
    {
      link: '',
      title: 'Ggggg',
      desc: ' ',
      icon: 'social:ic_group_24px',    },
    {
      link: '',
      title: 'Hhhhh',
      desc: ' ',
      icon: 'social:ic_group_24px',    },
    {
      link: '',
      title: 'Iiiii',
      desc: ' ',
      icon: 'social:ic_group_24px',    },
    {
      link: '',
      title: 'Kkkk',
      desc: ' ',
      icon: 'social:ic_group_24px',    }
  ];

  // Mock attributes
  $scope.attributes = [{
      title: 'Owner',
      value: 'Scott Alexander',
      icon: 'action:ic_assignment_ind_24px'
    },
    {
      title: 'Last updated',
      value: 'Dec 12, 2015',
      icon: 'action:ic_today_24px'
    },
    {
      title: 'DNS',
      value: 'https://appname-environment.company.com:8080',
      icon: 'action:ic_dns_24px'
    },
    {
      title: 'Version',
      value: '02.08.10.02',
      icon: 'action:ic_fingerprint_24px'
    },
  ];

  // Bottomsheet & Modal Dialogs
  $scope.alert = '';
  $scope.showListBottomSheet = function ($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: '<md-bottom-sheet class="md-list md-has-header"><md-list><md-list-item class="md-2-line" ng-repeat="item in items" role="link" md-ink-ripple><md-icon md-svg-icon="{{item.icon}}" aria-label="{{item.name}}"></md-icon><div class="md-list-item-text"><h3>{{item.name}}</h3></div></md-list-item> </md-list></md-bottom-sheet>',
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function (clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };

  $scope.showAdd = function (ev) {
    $mdDialog.show({
        controller: DialogController,
        template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="user.lastName"> </md-input-container> </div> <md-input-container flex> <label>Message</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
        targetEvent: ev,
      })
      .then(function (answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.alert = 'You cancelled the dialog.';
      });
  };
}]);

app.controller('ListBottomSheetCtrl', function ($scope, $mdBottomSheet) {
  $scope.items = [{
      name: 'Share',
      icon: 'social:ic_share_24px'
    },
    {
      name: 'Upload',
      icon: 'file:ic_cloud_upload_24px'
    },
    {
      name: 'Copy',
      icon: 'content:ic_content_copy_24px'
    },
    {
      name: 'Print this page',
      icon: 'action:ic_print_24px'
    },
  ];

  $scope.listItemClick = function ($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
});

function DialogController($scope, $mdDialog) {
  $scope.hide = function () {
    $mdDialog.hide();
  };
  $scope.cancel = function () {
    $mdDialog.cancel();
  };
  $scope.answer = function (answer) {
    $mdDialog.hide(answer);
  };
};

app.controller('DemoCtrl', DemoCtrl);

function DemoCtrl($timeout, $q) {
  var self = this;
  // list of `state` value/display objects
  self.states = loadAll();
  self.selectedItem = null;
  self.searchText = null;
  self.querySearch = querySearch;
  // ******************************
  // Internal methods
  // ******************************
  /**
   * Search for states... use $timeout to simulate
   * remote dataservice call.
   */
  function querySearch(query) {
    var results = query ? self.states.filter(createFilterFor(query)) : [];
    return results;
  }
  /**
   * Build `states` list of key/value pairs
   */
  function loadAll() {
    var allStates = 'Ali Conners, Alex, Scott, Jennifer, \
              Sandra Adams, Brian Holt, \
              Trevor Hansen';
    return allStates.split(/, +/g).map(function (state) {
      return {
        value: state.toLowerCase(),
        display: state
      };
    });
  }
  /**
   * Create filter function for a query string
   */
  function createFilterFor(query) {
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return (state.value.indexOf(lowercaseQuery) === 0);
    };
  }
};

app.config(function ($mdThemingProvider) {
  var customBlueMap = $mdThemingProvider.extendPalette('indigo', {
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['50'],
    '50': 'rgb(79, 113, 187);'
  });
  $mdThemingProvider.definePalette('customBlue', customBlueMap);
  $mdThemingProvider.theme('default')
    .primaryPalette('customBlue', {
      'default': '500',
      'hue-1': '50'
    })
    .accentPalette('pink');
  $mdThemingProvider.theme('input', 'default')
    .primaryPalette('grey')
});

app.config(function ($mdIconProvider) {
  $mdIconProvider
    // linking to https://github.com/google/material-design-icons/tree/master/sprites/svg-sprite
    // 
    .iconSet('action', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24)
    .iconSet('alert', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-alert.svg', 24)
    .iconSet('av', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-av.svg', 24)
    .iconSet('communication', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-communication.svg', 24)
    .iconSet('content', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-content.svg', 24)
    .iconSet('device', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-device.svg', 24)
    .iconSet('editor', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-editor.svg', 24)
    .iconSet('file', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-file.svg', 24)
    .iconSet('hardware', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-hardware.svg', 24)
    .iconSet('image', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-image.svg', 24)
    .iconSet('maps', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-maps.svg', 24)
    .iconSet('navigation', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-navigation.svg', 24)
    .iconSet('notification', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-notification.svg', 24)
    .iconSet('social', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-social.svg', 24)
    .iconSet('toggle', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-toggle.svg', 24)

    // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
    .iconSet('avatars', 'https://raw.githubusercontent.com/angular/material/master/docs/app/icons/avatar-icons.svg', 24)
    .defaultIconSet('https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24);
});