var app = angular.module("app", ['ngRoute', 'ngMessages']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: '/login.html',
		controller: 'userController'
	})
	.when('/dashboard', {
		templateUrl: '/dashboard.html',
		controller: 'dashboardController'
	})
	.when('/new_question', {
		templateUrl: '/new_question.html',
		controller: 'questionController'
	})
	.when('/show_question/:id', {
		templateUrl: '/show_question.html',
		controller: 'questionController'
	})
	.when('/question/:id/new_answer', {
		templateUrl: '/new_answer.html',
		controller: 'questionController'
	})
	.otherwise({
		redirectTo: '/'
	})
})
