var mongoose = require('mongoose');
var Question = mongoose.model('Questions');

module.exports = (function() {
	return {
		create: function(req, res) {
			var newQuestion = new Question(req.body);
			newQuestion.save(function(err, info) {
				if(err)
					console.log("***** Questions Controller / create / save: ", err);
				else {
					Question.find({}, function(err, data) {
						if(err)
							console.log("***** Questions Controller / create / find Questions: ", err);
						else
							var data = {data: data, info: info}
							res.json(data);
					})
				}
			})
		},

		read: function(req, res) {
			Question.find({}, function(err, data) {
				if(err)
					console.log("***** Questions Controller / read: ", err)
				else
					res.json(data)
			})
		},

		getOne: function(req, res) {
			console.log("******* Questions Controller / getOne")
			Question.findOne({_id: req.params.id}, function(err, data) {
				if(err)
					console.log("***** Question Controller / getOne: ", err)
				else
					res.json(data);
			})
		},

		getQuestionById: function(req, res) {
			console.log("******* Questions Controller / getQuestionById")
			Question.findOne({_id: req.body._id}, function(err, data) {
				if(err)
					console.log("***** Question Controller / getQuestionById: ", err)
				else
					res.json(data);
			})
		},


		update: function(req, res) {
			var question_id = req.body._id;
			var answer_id = req.params.answer_id;

			// console.log('****** question_id: ', question_id)
			// console.log('****** answer_id: ', answer_id)

			var update = {$inc: {}}; 
			update.$inc['answers.' + answer_id + '.likes'] = 1;

			Question.update({_id: question_id}, update, function(err){
				if(err){
					console.log("***** Questions Controller / update: ", err)
				}
				else{
					
					module.exports.getQuestionById(req, res);
				}
			});
		},

		addAnswer: function(req, res) {
			var question_id = req.params.id;
			var answer = req.body;


			Question.findById(question_id, function (err, question) {
				if(err){
					console.log("******* err: ", err)
				} else	{
					question.answers.push(answer);
		  			question.save(function(err, info) {
						if(err)
							console.log("***** Questions Controller / create / save: ", err);
						else {
														
							var update = {$inc: {}};
							update.$inc.answerCount = 1

							question.update({_id: question_id}, update, function(err,info){
								if(err)
									console.log('something went wrong');
								else{
									console.log("******* The Question / answerCount: ", question.answerCount)
									module.exports.read(req, res);
								}
							})
									
						}
					})
				}
			})
		},


	}
})();