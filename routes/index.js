
var url = require("url"),
	brain = require("brain");

module.exports = function (app) {
	var testObj = {
			"test-123456": {
				id: "test-123456",
				type: "content",
				value: "This is the right copy. ",
				time: 0,
				conversions: {
					passive: false,
					active: false
				}
			},
			"test-123457": {
				id: "test-123457",
				type: "class",
				value: "variantB",
				time: 0,
				conversions: {
					passive: false,
					active: false
				}
			}
		};
	
	app.get("/", function (req,res) {
		res.render('index', { title: 'Testler' });
	});

	app.get("/tests", function (req,res) {
		app.db.Test.find({}, function(err,tests) {
			if (!err) res.json({tests: tests});
			else res.json({error: err});
		})
	});

	app.get("/purge", function(req,res){
		if (req.url === '/purge?doit=now') {
			app.db.Test.find({}, function(err,docs){
				for (i in docs) {
					docs[i].remove({});
				}
			});
			app.db.Variant.find({}, function(err,docs){
				for (i in docs) {
					docs[i].remove({});
				}
			});
			res.json({status: "purged tests and variants"})
		} else {
			res.json({error: "restricted page. Do it now."})
		}
	})

	app.get("/create", function(req,res){
		res.render('create',{title: 'Testler'});
	})

	app.post("/new", function(req,res) {

		var newTest = new app.db.Test();
		newTest.ideal.conversion.passive = typeof req.body.options.passive !== 'undefined' ? req.body.options.passive : false;
		newTest.ideal.adaptive = typeof req.body.options.adaptive !== 'undefined' ? req.body.options.adaptive : false;
		newTest.type = req.body.type || "content";

		for (variant in req.body.values) {
			var newVariant = new app.db.Variant();
			
			newVariant.type = req.body.type || "content";
			newVariant.value = req.body.values[variant];
			newTest.variants.push(newVariant);
		}

		// create Nuralnetwork
		var net = new brain.NeuralNetwork();

		net.train(newTest.variants.map( function (variant) {
			return {input: newTest.ideal, ouput: variant.value}
		}), 500);

		newTest.network = net.toJSON();

		newTest.save(function(err){
			if (!err) res.json({created: newTest});
			else res.json({error: err});
		})
		
	})

	app.get("/testler.json*", function (req,res) {

		var query = url.parse( req.url, true).query,
			callback = query.callback,
			tests = JSON.parse(query.tests).map(function(x){return x.substring(4);});

		app.db.Test.where('_id').in(tests).run( function (err,testDocs) {

			if (!err) {

				var response = [];

				testDocs.forEach(function(test, i) {

					// if Adaptive
					// get network and query it for "ideal" variant
					var output;
					if (test.ideal.adaptive) {

						if (test.views.length > 5) {
							
							var net = (new brain.NeuralNetwork()).fromJSON(test.network);
							output = net.run(test.ideal);
						} else {
							output = test.variants[Math.floor(Math.random() * (test.variants.length - 0 + 1)) + 0].value;
						}
					} 
					// else
					// return a random variant
					else {
						output = test.variants[Math.floor(Math.random() * (test.variants.length - 0 + 1)) + 0].value;
					}
					
					test.network = [];
					test.variants = [];
					test.views = [];
					response.push({test: test, output: output});
				})
				


				if (callback !== "" && typeof callback !== 'undefined') {
					res.end(";" + callback + "(" + JSON.stringify(response) + ");");
				} else {
					res.json(response);
				}
			} else {
				res.json({error: err, req: tests});
			}
			
		});
	});



	app.get("/updateTests", function (req,res) {

		var info = JSON.parse(url.parse(req.url, true).query.testler);

		console.log("UpdateTests REQ: ", info);
		res.json({status: "OK", code: "200", query: info});
	});
  
};