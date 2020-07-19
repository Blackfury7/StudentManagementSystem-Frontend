
logout=()=>{
  sessionStorage.clear();
   window.location.href = "login.html";

}


var app = angular.module('query', []);
//query list 
app.controller('list', function($scope, $http) {





 	 $http({
			 method : "GET",
			url : backend_url+"query/query-list/"
  			}).then(function mySuccess(response) {

     		 $scope.queries=response.data;
         $scope.query_num=$scope.queries.length;

      		console.table(response.data);
      		 			
     		}, function myError(response) {
      		alert(response.statusText);
  		});


  $scope.redirect_to_query = function(query_id){


        sessionStorage.removeItem("query_id");
        sessionStorage.setItem("query_id", query_id);
      window.location.href = "answerQuery.html";
       };


       
});

//insert query
app.controller('add_query', function($scope, $http) {

let id = sessionStorage.getItem('id');
console.log($scope.subject);
console.log("$scope.subject");




$scope.addQuery = function(){
  data = JSON.stringify({ "STUDENT" : id , "QUERY_SUBJECT" : $scope.subject, "QUERY_TEXT" : $scope.body });
console.log(data);

   $http({

       method : "POST",
       data : data,
      url : backend_url+"query/insert-query/"
        }).then(function mySuccess(response) {

         $scope.queries=response.data;

          console.table(response.data);
          alert(response.data);
          window.location.href = "student.html";
                
        }, function myError(response) {
          alert(response.statusText);
      });
      };
});


//response query
app.controller('answer_query', function($scope, $http) {

let query_id = sessionStorage.getItem('query_id');
console.log("pre "+ query_id);
 $http({
       method : "POST",
       data : JSON.stringify({"id": query_id}),

      url : backend_url+"query/query-view/"
        }).then(function mySuccess(response) {

         $scope.querry=response.data;

          console.table(response.data);
                
        }, function myError(response) {
          alert(response.statusText);
      });


$scope.status="status";
$scope.answerQuery = function(value){
console.log("value"+value);
$scope.status=value;
  console.log("status"+$scope.status);

let data = JSON.stringify({ "id" : query_id , "STATUS" : $scope.status, "REPLY" : $scope.reply});
console.log(data);
      
      $http({
       method : "POST",
       data : data,
      url : backend_url+"query/query-response/"
        }).then(function mySuccess(response) {


          sessionStorage.removeItem("query_id");
          console.table(response.data);
          alert(response.data);

          window.location.href = "queryList.html";

                
        }, function myError(response) {
          alert(response.statusText);
      });
      };
});

 




