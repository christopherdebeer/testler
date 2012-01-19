
// Testler config and auth settings

var url 		= require("url"),
	redisUrl 	= url.parse("redis://nodejitsu:1458ba2a4f41360dd97fe50bac4f5c75@chubb.redistogo.com:9094/"),
	redisAuth 	= redisUrl.auth.split(':');


var config = {
	port 		: 80,
	domain 		: "http://testler.jit.su",
    localRedis 	: false,
    redis 		: {
    	host	: redisUrl.hostname,
	    port	: redisUrl.port,
	    db		: redisAuth[0],
	    pass	: redisAuth[1],	
    },
	twitter		: {
		id 			: "dyFJ8Lg8I8FelsLGPM2SA",
		secret 		: "QABSSLtlZp9OMjWfA3Ohi4cJCSrPSc0VoqzwKV8z8"
	},
	google 		: {
		id 			: "218763991646.apps.googleusercontent.com",
		secret 		: "adi2cbhkG44tbUFhMuT3bmym"
	},
	facebook 	: {
		id 			: "154522601327060",
		secret 		: "bfbac811988954a1b3566951ad116ffd"
	}
}

module.exports = config;