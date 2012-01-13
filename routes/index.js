
/*
 * GET home page.
 */

module.exports = function (app) {

	app.get("/", function (req,res) {
		res.render('index', { title: 'Testler' })
	})


	app.get("/testler.json", function (req,res) {
		res.json({
			"test-123456": {
				content: "This is the right copy"
			},
			"test-123457": {
				content: "This is test2 copy"
			}
		});
	})
  
};