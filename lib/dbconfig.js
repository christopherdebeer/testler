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
    id          : OnjectId
  , source     	: {
      service     : String
  	, id          : String
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
  , variants    : [VariantSchema]
  , created     : { type: Date, default: Date.now }
  , type        : { type: String, default: 'temp' }
  , views       : [ViewSchema]
  , network     : {}
  , ideal       : {
      time        : Number
    , conversion  : {
            active      : Boolean
          , passive     : Boolean
      } 
  }
});

var ViewSchema = new Schema({
    id          : ObjectId
  , created     : { type: Date, default: Date.now }
  , stats       : {
        time        : Number
      , conversion  : {
            active      : Boolean
          , passive     : Boolean
      }
  }
});

var VariantSchema = new Schema({
    id          : ObjectId
  , type        : String // "class" or "content" 
  , value       : String // value of type ^^^

});

module.exports.Variant = mongoose.model('Variant', VariantSchema);
module.exports.View = mongoose.model('View', ViewSchema);
module.exports.Test	= mongoose.model('Test', TestSchema);
module.exports.User = mongoose.model('User', UserSchema);

