var mongoose = require('mongoose');
var User = mongoose.model('Users');

module.exports = (function() {
	return {
		create: function(req, res) {
			var newUser = new User(req.body);
			newUser.save(function(err, data) {
				if(err)
					console.log("***** User Controller / create: ", err)
				else
					res.json(data)
			})
		},

		read: function(req, res) {
			User.find({}, function(err, data) {
				if(err)
					console.log("***** User Controller / read: ", err)
				else
					res.json(data)
			})
		},

		readOne: function(req, res) {
			User.find({ _id: req.params.id }, function(err, data) {
				if(err)
					console.log("***** User Controller / readOne: ", err);
				else
					res.json(data);
			})
		}
	}
})();