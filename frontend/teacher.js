
logout=()=>{
  sessionStorage.clear();
   window.location.href = "addStudent.html";

}


var app = angular.module('teacher', []);

app.controller('list', function($scope, $http) {

  	console.log(sessionStorage.getItem("id"));


//student list 
 	 $http({
			 method : "GET",
			url : "http://d191f9defd49.ngrok.io/teacher/student-list/"
  			}).then(function mySuccess(response) {

     		 $scope.students=response.data;

      		console.table(response.data);
      		 			alert("Wellcome ");
     		}, function myError(response) {
      		alert(response.statusText);
  		});




//delete student
 	 $scope.delete=function(id){
  	 	$http({
   		 method : "POST",
    	data : JSON.stringify({"id" : id}),
    	url :  "http://d191f9defd49.ngrok.io/teacher/delete-student/"

       
  		}).then(function mySuccess(response) {
		alert(response.data);
    location.reload();
  
        console.log(response.data);
      
 	
     	}, function myError(response) {
      	alert(response.statusText);
 		 	});
 	  };
  		
      //redirect to update student page
     $scope.redirect_to_update=function(id){

        sessionStorage.setItem("update_id", id);
      window.location.href = "updateStudent.html";
       };

    
      

  });
		



app.controller('add_student', function($scope, $http) {
  //add student
       $scope.addStudent=function(){
      
       let data=JSON.stringify({"USERNAME" : $scope.username, "FIRST_NAME": $scope.first_name, "LAST_NAME" : $scope.last_name,
        "BRANCH" : $scope.branch, "EMAIL" : $scope.email, "YEAR" : $scope.year, "CONTACT" : $scope.contact});




       $http({
         method : "POST",
         data : data,
         url : "http://d191f9defd49.ngrok.io/teacher/insert-student/"
     }).then(function mySuccess(response) {
    alert(response.data);
   
    window.location.href = "teacher.html";
  
        console.log(response.data);

        
        }, function myError(response) {
       alert(response.statusText);
        });
      };
    });



app.controller('update_student', function($scope, $http) {
   //update student details
   console.log('pre update');
   $scope.updateStudent=function(){
    console.log("update");
      id=sessionStorage.getItem('update_id')
       let data=JSON.stringify({"id" : id, "FIRST_NAME": $scope.first_name, "LAST_NAME" : $scope.last_name, "USERNAME" : $scope.username,
        "BRANCH" : $scope.branch, "EMAIL" : $scope.email, "YEAR" : $scope.year, "CONTACT" : $scope.contact});

       console.log(data);



       $http({
         method : "POST",
         data : data,
         url : "http://d191f9defd49.ngrok.io/teacher/update-student/"
     }).then(function mySuccess(response) {
    alert(response.data);
           sessionStorage.removeItem('update_id');
    window.location.href = "teacher.html";
  
        console.log(response.data);

        
        }, function myError(response) {
       alert(response.statusText);
        });
      };


      
});
  