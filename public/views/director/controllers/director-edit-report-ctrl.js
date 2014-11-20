var app = angular.module('lds-report');

app.controller('directorEditReportCtrl', function($scope, reportService, centerService){

		$scope.getSingleReportEdit = function(){
			$scope.$parent.report = $scope.report;
		}

		$scope.editReport = function(){
			reportService.edit($scope.report['Reports.id'], { 
				visitor_total: $scope.report['Reports.visitor_total'],
				visitor_tour: $scope.report['Reports.visitor_tour'],
				visitor_tournonmember: $scope.report['Reports.visitor_tournonmember'],
				referral_cards: $scope.report['Reports.referral_cards'],
				referral_called: $scope.report['Reports.referral_called'],
				referral_inbound: $scope.report['Reports.referral_inbound'],
				referral_member: $scope.report['Reports.referral_member'],
				comments: $scope.report['Reports.comments']
			})
			.then(function(response){
				$scope.report['Reports.visitor_total'] = "";
				$scope.report['Reports.visitor_tour'] = "";
				$scope.report['Reports.visitor_tournonmember'] = "";
				$scope.report['Reports.referral_cards'] = "";
				$scope.report['Reports.referral_called'] = "";
				$scope.report['Reports.referral_inbound'] = "";
				$scope.report['Reports.referral_member'] = "";
				$scope.report['Reports.comments'] = "";
			});
		}		

});