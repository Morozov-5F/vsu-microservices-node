var housingApp = angular.module("housingApp", []);
housingApp.controller("housingAppController", ['$scope', '$http', function($scope, $http) {
$scope.billsCanBeShown = false;
$scope.pollsCanBeShown = false;
$scope.email = '';
$scope.pswd = '';
$scope.currentUser = {
		_id: '',
        email: '',
		name: '',
		surname: '',
        password: ''
      };
$scope.bills = [{ 'type':'Water', 'value': 1250, 'date': '11.12.17'},
                { 'type':'Gas', 'value': 1000, 'date': '22.05.17'},
	            { 'type':'Electricity', 'value': 1150, 'date': '23.07.17'},
		        { 'type':'Phone', 'value': 1500, 'date': '06.02.17'},
			    { 'type':'Internet', 'value': 900, 'date': '05.10.17'},  ];
		
		
		
$scope.logIn = function() {
		$http({
			method : 'GET',
			url : '/auth/users/:' + $scope.email
		}).success(function(data, status, headers, config) {
			$scope.currentUser = data;
		}).error(function(data, status, headers, config) {
			alert( "failure");
		});
	console.log($scope.currentUser);
	console.log($scope.pswd);
	//if password is correct, show bills and polls
	if($scope.currentUser.password == $scope.pswd)
	{
		$scope.billsCanBeShown = true;
		$scope.pollsCanBeShown = true;
	}	
};
					
$scope.addRow = function(){		
	$scope.bills.push({ 'type':$scope.type, 'value': $scope.value, 'date':$scope.date });
	$scope.type='';
	$scope.value='';
	$scope.date='';
};

$scope.removeRow = function(type, value, date){				
		var index = -1;		
		var comArr = eval( $scope.bills );
		for( var i = 0; i < comArr.length; i++ ) {
			if( comArr[i].type === type && comArr[i].value === value && comArr[i].date === date) {
				index = i;
				break;
			}
		}
		if( index === -1 ) {
			alert( "Something went wrong" );
		}
		$scope.bills.splice( index, 1 );		
	};
	
$scope.getBills = function() {
	if($scope.billsCanBeShown)
	{
		$http({
			method : 'GET',
			url : '/measurements/:' + $scope.currentUser.email
		}).success(function(data, status, headers, config) {
			$scope.bills = data;
		}).error(function(data, status, headers, config) {
			alert( "failure");
		});
	}
	
};

}]);

