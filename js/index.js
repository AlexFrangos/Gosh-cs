var app = angular.module('StarterApp', ['ngMaterial']);
var mlwcApp = angular.module('mlwcApp', [])
 

 
 

app.controller('AppCtrl', ['$scope', '$mdBottomSheet',   '$mdSidenav', '$mdDialog',  function ($scope,  $mdBottomSheet, $mdSidenav, $mdDialog) {



  // Toolbar search toggle
  $scope.toggleSearch = function (element) {
    $scope.showSearch = !$scope.showSearch;
  };

  // Sidenav toggle
  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };
   // Menu items
  $scope.menu = [{
      link: '',
      title: 'Dashboard',
      icon: 'action:ic_dashboard_24px'  
    },
    {
      link: '',
      title: 'Data maps',
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
      title: 'Example doctor',
      desc: '',
      desc2: 'ppp',
      icon: 'social:ic_group_24px',
      image: 'tim1.png',
      image2: 'back.png'
    },
     
  ];

             
  
   
      
  
  
        function change() // no ';' here
        {
  
          if (coun === false) {
            document.getElementById('myimage').src = 'tim3.png'
            coun = true;
          } else {
            document.getElementById('myimage').src = 'tim1.png'
            coun = false;
          }
        }
  
        function change2() {}
  
       



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
  

  $scope.showAdd = function (ev) {
    $mdDialog.show({
        controller: DialogController,
        template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>GOSH Hospital</label> <input ng-model="user.firstName"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="user.lastName"> </md-input-container> </div> <md-input-container flex> <label>Message</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
        targetEvent: ev,
      })
      .then(function (answer) {
        $scope.alert = 'You said the information was "' + answer + '".';
      }, function () {
        $scope.alert = 'You cancelled the dialog.';
      });
  };
}]);

 

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
   
};



app.config(function ($mdIconProvider) {
  $mdIconProvider
    // linking to https://github.com/google/material-design-icons/tree/master/sprites/svg-sprite
    // 
    .iconSet('action', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24)
    .iconSet('alert', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-alert.svg', 24)
    .iconSet('av', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-av.svg', 24)
    .iconSet('communication', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-communication.svg', 24)
    .iconSet('content', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-content.svg', 24)
        .iconSet('image', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-image.svg', 24)
      .iconSet('notification', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-notification.svg', 24)
    .iconSet('social', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-social.svg', 24)
    .iconSet('toggle', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-toggle.svg', 24)

    // Illustrated user icons used in the docs https://material.angularjs.org/latest/#/demo/material.components.gridList
    .iconSet('avatars', 'https://raw.githubusercontent.com/angular/material/master/docs/app/icons/avatar-icons.svg', 24)
    .defaultIconSet('https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24);
});

 function change3() {
          
          if (document.getElementById("toggle2").checked == true) {
            document.getElementById('myimage').src = 'tim3.png';
  
          } else
            document.getElementById('myimage').src = 'tim1.png'
         }


         function change4() {
          
          if (document.getElementById("toggle3").checked == true) {
            document.getElementById('myimage').src = 'hm.jpg';
  
          } else
            document.getElementById('myimage').src = 'hm2.png'
         }         
         function change5() {
          var x = document.getElementById("toggle2");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
          
           
            document.getElementById('myimage').src = 'tim1.jpg';
  
  
         }         
         function change6() {
          
           
            document.getElementById('myimage').src = 'hm.jpg';
  
          
         }         