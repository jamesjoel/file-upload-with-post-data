var upload=angular.module("upload", []);
upload.directive("myDir", function($parse){
	return {
		restirct : "A",
		link : function(scope, element, attrs){
			element.bind('change', function(){
				scope.$apply(function(){
					$parse(attrs.myDir).assign(scope, element[0].files);
					console.log("dir calling");
				});
			});
		}
	}
});
upload.controller("upCtrl", function($scope, $http){
	// $http.defaults.headers.post['Content-Type']="application/x-www-form-urlencoded; charset=utf-8";
	$scope.demo="";
	$scope.name="";
	$scope.path="";

	
	$scope.up=function(){
		console.log($scope.demo);
		$scope.obj={ name : "rohit", city : "ujjain" };

		

		
		var arr=Object.keys($scope.obj);
		/* convertint object propert to array values*/
		var values=Object.keys($scope.obj).map(function (key) { return $scope.obj[key]; });
		/* convertint object values to array values*/


		var form=new FormData();
		for(var i=0; i<arr.length; i++)
		{
			form.append(arr[i], values[i]);
		}
		form.append('image', $scope.demo[0]);
		//var obj={ file : form, name : $scope.name };
		console.log(form);
		$http({
			method : "POST",
			url : "web_services/my.php",
			data : form,
			headers : { 'Content-Type':undefined }
		}).then(function(res){
			console.log(res.data);
			//console.log("response comming", res.data.name);
			//$scope.path="web_services/"+res.data.name;
		});
		// console.log(form);
	}
});