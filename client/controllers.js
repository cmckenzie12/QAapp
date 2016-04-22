app.controller('userController', function($scope, $routeParams, userFactory) {
	// var id = $routeParams.id;
	
	$scope.checkUser = function(user) {
		userFactory.readUsers(user, function(data) {
			console.log("**** userController / checkUser / Data: ", data)
		})
	} 

	// userFactory.viewUser(id, function(data) {
	// 	$scope.user = data;
	// 	console.log('********** id: ',id)
	// })

})

app.controller('questionController', function($scope, $routeParams, questionFactory, userFactory) {
	var id = $routeParams.id;
	var question_id = null;

	$scope.newQuestion = {};
	console.log("***** Inside question Controller getting routeParams: ", $routeParams.id)

	questionFactory.getQuestion(id, function(data) {
		console.log("***** routeParams id: ", id)
		question_id = data._id;
		$scope.question = data;
		console.log("***** $scope.question: ", $scope.question)				
	})

	userFactory.readUser(function(data) {
		$scope.user = data;
	})

	$scope.createQuestion = function(newQuestion, user) {
		console.log("**** Controllers.js / questionController / createQuestion ***")
		console.log("**** newquestion ***", newQuestion)
		questionFactory.createQuestion(newQuestion, function(data, info) {
			$scope.questions = data.data;
			$scope.newQuestion = {};
		})
	}

	// createAnswer
	$scope.createAnswer = function(question, newAnswer, user) {
		console.log("**** Controllers.js / questionController / createAnswer ***")
		console.log("**** createAnswer - question: ", question)
		console.log("**** createAnswer - newAnswer: ", newAnswer)
		newAnswer.likes = 0;
		newAnswer.name = user.name;
		// question.answers.push(newAnswer);
		console.log("**** createAnswer - question (with answer added): ", question)
		questionFactory.addAnswer(question._id, newAnswer, function(data, info) {
			$scope.questions = data.data;
			$scope.newAnswer = {};
		})
	}


	$scope.like = function(answer_id){
		console.log('******** answer_id: ', answer_id)
		console.log('***** Current question: ', $scope.question)
		questionFactory.updateQuestion($scope.question, answer_id, function(data, info) {
			console.log('data: ', data)
			$scope.question = data;
		});
	}	

})

app.controller('dashboardController', function($scope, $routeParams, questionFactory, userFactory) {

	userFactory.readUser(function(data) {
		$scope.user = data;
		console.log("$$$User date: ", data)
	})

	questionFactory.readQuestions(function(data) {
		console.log("******** readQuestions ******")
		console.log("******** data ****** :", data)
		$scope.questions = data;
	})	

})


