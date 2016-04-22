var question = require('./../server/controllers/question.js');
var user = require('./../server/controllers/user.js');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index');
	});

	app.get('/user', function(req, res) {
		user.read(req, res);
	});

	app.post('/user', function(req, res) {
		user.create(req, res);
	})

	app.get('/questions', function(req, res) {
		question.read(req, res);
	})

	app.post('/questions', function(req, res) {
		question.create(req, res);
	})

	app.post('/question/updateLikes/:answer_id', function(req, res) {
		console.log('********** Updating likes ********')
		console.log('id: ', req.params.answer_id)
		// console.log('question: ', req.body)
		question.update(req, res);
	})

	app.post('/question/addAnswer/:id', function(req, res){
		console.log('question_id: ', req.params.id)
		console.log('answer: ', req.body)
		question.addAnswer(req, res);
	})

	app.get('/question/:id', function( req, res) {
		question.getOne(req, res);
	})
}
