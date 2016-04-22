app.factory('userFactory', function($http, $location) {
	var factory = {};
	var thisUser = null;
 
	factory.readUsers = function(user, callback) {
		var newUser = true;
		$http.get('/user').success(function(data) {
			angular.forEach(data, function(regUser) {
				if(user.name == regUser.name) {
					console.log(user.name, "matches", regUser.name);
					newUser = false;
					thisUser = regUser
					$location.path('/dashboard');
				}	
			})          	
		// If user does not exist, create new user and redirect to dashboard
			if(newUser == true) {	
				console.log("User is new, Creating...");
				$http.post('/user', user).success(function(data) {
					console.log("New user has been created...")
					thisUser = data;
					console.log("Getting ready to redirect to dashboard")
					$location.path('/dashboard');
				})
			}
		})
		callback(thisUser);	
	}

	factory.readUser = function(callback) {
		callback(thisUser);
	}


	// factory.viewUser = function(id, callback) {
	// 	$http.get('/user/'+id).success(function(data) {
	// 		console.log("userFactory / viewUser / checking user???")
	// 		callback(data[0]);
	// 	})
	// }

	// factory.updateUserPolls = function(data, name, callback) {
	// 	var polls = [];
	// 	angular.forEach(data, function(poll) {
	// 		if(poll.user_id == name._id)
	// 			polls.push(poll);
	// 	})
	// 	$http.post('/user/polls/'+name._id, {polls: polls}).success(function(data) {})
	// }

	return factory;
})

app.factory('questionFactory', function($http, $location) {
	var factory = {};
	var currentUser = null;

	factory.createQuestion = function(newQuestion, callback) {
		newQuestion.answerCount = 0;
		$http.post('/questions', newQuestion).success(function(data) {
			console.log("****** create question / data:")
			callback(data);
			console.log('******* Data: ',data);
			$location.path('/dashboard');
		})
	}

	factory.readQuestions = function(callback) {
		$http.get('/questions').success(function(data) {
			callback(data);
		})
	}

	factory.getQuestion = function(id, callback) {
		console.log("questionFactory / getQuestion: ", id)
		$http.get('/question/'+id).success(function(data) {
			callback(data);
		})
	}

	factory.addAnswer = function(question_id, answer, callback) {
		console.log("questionFactory / addAnswer / question_id: ", question_id)
		console.log("questionFactory / addAnswer / answer: ", answer)
		$http.post('/question/addAnswer/'+ question_id, answer).success(function(data) {
			callback(data);
			console.log('******* Data: ',data);
			$location.path('/dashboard');			
		})
	}

	// factory.setUser = function(user, callback) {
	// 	this.currentUser = user;
	// 	callback(currentUser);
	// }

	// factory.getUser = function(data, callback) {
	// 	this.currentUser = data;
	// 	callback(currentUser);
	// }

	//  questionFactory.updateQuestion($scope.question, answer_id);

	factory.updateQuestion = function(question, answer_id, callback) {
		console.log('***** Got question in factory: ', question)
		$http.post('/question/updateLikes/'+ answer_id, question).success(function(data) {
			callback(data);
		})
	}

	return factory;
})
