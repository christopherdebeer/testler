////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// DB Mongo stuff ////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////


var mongoose = require('mongoose');

mongoose.connect('mongodb://nodejitsu:d6d5965249cbaf392216b5ab0b67e15e@staff.mongohq.com:10042/nodejitsudb5112396867', function(err) {
    if (err) throw err;
});

var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    id          : { type: String, unique: true }
  , source      : String
  , sourceInfo 	: {
  	  id          : String
    , name        : String
    , avatarUrl   : String
    , screenName  : String
  }
  , created     : { type: Date, default: Date.now}
  , tests      : [TestSchema]
  , type        : {type: String, default: 'alpha'}
});

var TestSchema = new Schema({
    id          : ObjectId
  , description : String
  , created     : { type: Date, default: Date.now }
  , type        : { type: String, default: 'temp' }
});


module.exports.Test	= mongoose.model('Test', TestSchema);
module.exports.User = mongoose.model('User', UserSchema);

