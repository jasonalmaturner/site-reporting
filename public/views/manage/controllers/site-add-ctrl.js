var app = angular.module('lds-report');

app.controller('siteAddCtrl', submitReportCtrl)

function submitReportCtrl($scope, centerService, userService){
	$scope.yes = 'YES';
	$scope.no = 'NO';
	$scope.center = {};
	$scope.center.active = 'YES';
	$scope.test = 'Thisis a test.....'
	


$scope.submitCenter = function(){
	centerService.create($scope.center).
	then(function(res){
		console.log(res);

	})

	
}




}




