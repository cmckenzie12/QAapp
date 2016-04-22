var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	name        :String,
	created_at  :{ type: Date, default: Date.now }
})


var questionSchema = mongoose.Schema({
	question    :String,
	description :String,
	answerCount :Number,
	answers 	:[ { name: String, 
					 user_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, 
					 answer: String, 
					 detail: String, 
					 likes: Number
					}],
	created_at  :{ type: Date, default: Date.now }
}) 

mongoose.model("Users", userSchema);
mongoose.model("Questions", questionSchema);
