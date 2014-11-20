var app = angular.module('lds-report');

app.controller('directorViewReportCtrl', function($scope, reportService, centerService){

	$scope.deleteReportWarningAlert = false; 

	$scope.deleteReportAlert = function(){
		$scope.deleteReportWarning = !$scope.deleteReportWarning;
	}

	// Refreshes page when modal closes

	$scope.refreshModalClose = function(){
		$scope.deleteReportWarningAlert = false;
		$scope.visitor_total = "";
		$scope.visitor_tour = "",
		$scope.visitor_tournonmember = "",
		$scope.referral_cards = "",
		$scope.referral_called = "",
		$scope.referral_inbound = "",
		$scope.referral_member = "",
		$scope.comments = ""
		$scope.selectedYear = "";
		$scope.selectedMonth = "";	
	}
	
	$scope.deleteReportWarning = function(){
		$scope.deleteReportWarningAlert = true;
	}

	$scope.deleteSingleReport = function(id){
		reportService.delete(id)	
		.then(function(response){
			$scope.deleteReportWarningAlert = false;
			for(var i = 0; i < $scope.months.length; i++){
				if($scope.months[i] === $scope.selectedMonth){
					var newMonth = i + 1;
					var modifiedDate = $scope.selectedYear + "-" + newMonth + "-01";
					reportService.getAllBy(modifiedDate)
					.then(function(response){
						$scope.$parent.reportsByMonth = response.data;
						console.log($scope.$parent.reportsByMonth);
					})			
				}
			}
		})
	}
});