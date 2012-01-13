
/*
 * GET home page.
 */

 var testObj = {
			"test-123456": {
				content: "This is the right copy"
			},
			"test-123457": {
				class: "variantB"
			}
		});
	};

module.exports = function (app) {

	app.get("/", function (req,res) {
		res.render('index', { title: 'Testler' })
	});

	app.get("/testler.json", function (req,res) {
		res.json(testObj);
	)};

	app.post("/testler.json", function (req,res) {
		res.json(testObj)
	});
  
};