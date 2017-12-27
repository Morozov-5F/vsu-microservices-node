var housingApp = angular.module("housingApp", []);
housingApp.controller("billsControl", function($scope) {
$scope.bills = [
                    { 'type':'Water',
                    	'value': 1250,
                    	'date': 'Bangalore'},
                    	{ 'type':'Gas',
	                    	'value': 1000,
	                    	'date': 'Bangalore'},
	                    	{ 'type':'Electricity',
		                    	'value': 1150,
		                    	'date': 'Bangalore'},
		                    	{ 'type':'Phone',
			                    	'value': 1500,
			                    	'date': 'Bangalore'},
			                    	{ 'type':'Internet',
				                    	'value': 900,
				                    	'date': 'Noida'},
                    ];
$scope.addRow = function(){		
	$scope.bills.push({ 'type':$scope.type, 'value': $scope.value, 'Date':$scope.date });
	$scope.type='';
	$scope.value='';
	$scope.date='';
};

$scope.removeRow = function(type){				
		var index = -1;		
		var comArr = eval( $scope.bills );
		for( var i = 0; i < comArr.length; i++ ) {
			if( comArr[i].type === type ) {
				index = i;
				break;
			}
		}
		if( index === -1 ) {
			alert( "Something went wrong" );
		}
		$scope.bills.splice( index, 1 );		
	};
});
//FINISH OFF
housingApp.controller("HttpController", [ '$scope', '$http',
	function($scope, $http) {
		$http({
			method : 'GET',
			url : '/measurements/:userId'
		}).success(function(data, status, headers, config) {
			$scope.bills = data;
		}).error(function(data, status, headers, config) {
			alert( "failure");
		});
} ])