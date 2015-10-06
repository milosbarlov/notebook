/* *********************************************************************************************** *
 * APPLICATION
 * =============================================================================================== *
 * Just bound all modules together
 * *********************************************************************************************** */

(function() {
'use strict';


angular
.module('App', [
		'ui.router',
		'notes',
		'Birthday'

	])
.config( config )
.controller('mainCtrl',mainCtrl)
.controller('homeCtrl', homeCtrl);


//--------------------------------------------------------------------------------------------------

function config( $stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'app/home.tpl.html',
			controller: 'homeCtrl'
		})
		.state('notes',{
			url:'/notes',
			templateUrl:'app/notes/notes.tpl.html',
			controller:'notesCtrl'
		})
		.state('birthday',{
			url:'/birthday',
			templateUrl:'app/birthday/birthday.tpl.html',
			controller:'birthdayCtrl'
		})
};

function homeCtrl($scope){

}

mainCtrl.$inject = ['$scope'];
function mainCtrl($scope){

}

})();