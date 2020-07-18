
logout=()=>{
  sessionStorage.clear();
   window.location.href = "login.html";

}


var app = angular.module('query', []);
//query list 
app.controller('list', function($scope, $http) {





 	 $http({
			 method : "GET",
			url : "http://d191f9defd49.ngrok.io/query/query-list/"
  			}).then(function mySuccess(response) {

     		 $scope.queries=response.data;
         $scope.query_num=$scope.queries.length;

      		console.table(response.data);
      		 			
     		}, function myError(response) {
      		alert(response.statusText);
  		});
});

//insert query
app.controller('add_query', function($scope, $http) {

id = sessionStorage.getItem('id');

data = JSON.stringfy({ "student-id" : id , "query-subect" : $scope.subject, "query-text" : $scope.body })




   $http({

       method : "POST",
       data : data,
      url : "http://d191f9defd49.ngrok.io/query/query-insert/"
        }).then(function mySuccess(response) {

         $scope.queries=response.data;

          console.table(response.data);
                
        }, function myError(response) {
          alert(response.statusText);
      });
});


//response query
app.controller('answer_query', function($scope, $http) {

id = sessionStorage.getItem('query_id');

data = JSON.stringfy({ "student-id" : id , "status" : $scope.status});




   $http({

       method : "POST",
       data : data,
      url : "http://d191f9defd49.ngrok.io/query/query-response/"
        }).then(function mySuccess(response) {

         $scope.queries=response.data;

          console.table(response.data);
                
        }, function myError(response) {
          alert(response.statusText);
      });
});




