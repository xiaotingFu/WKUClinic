var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'Home',
      templateUrl: 'partials/patients.html',
      controller: 'patientsCtrl'
    })
    .
    when('/diagnosis', {
      title: 'Diagnosis',
      templateUrl: 'partials/Diagnose.html',
      controller: 'diagnosisCtrl'
    })
    .
    when('/prescription', {
      title: 'Prescription',
      templateUrl: 'partials/prescription.html',
      controller: 'prescriptionCtrl'
    })
    .
    when('/prescriptionEdit', {
      title: 'Prescription Edit',
      templateUrl: 'partials/prescriptionEdit.html',
      controller: 'prescriptionEditCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
    