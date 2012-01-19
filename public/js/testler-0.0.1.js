var testler = (function($){

	var baseUrl = "http://testler.nodejitsu.com",
	getTestDetails = function (classes, callback) {

		console.log("testler tests: ", classes);
		$.ajax({

		  	url: baseUrl + "/testler.jsonp",
		  	dataType: "jsonp",
		  	type: "GET",
		  	data: {
		  		tests: JSON.stringify(classes)	
		  	},
		  	success: function (data) {
		  		//console.log("preCallback: ", data);
		  		callback(null, data);
		  	},
		  	error: function (err) {
		  		if (window.console){console.log("ERROR: ", err);};
		  		callback(err, null);
		  	}
		});
	},
	applyTestCases = function(tests) {

		$.each(tests, function (testClass, resp) {

			// content test
			if (resp.test.type === 'content' ) {
			
				//console.log("apply test[tsl-" + resp.test['_id'] + "] type: [content] :  ", resp);
				$(".tsl-" + resp.test['_id']).html(resp.output);

			} else {
			// class test
				
				//console.log("apply test[tsl-" + resp.test['_id'] + "] type: [class] :  ", resp);
				$(".tsl-" + resp.test['_id']).addClass(resp.output);
			}
		});


		// bind test checking to all links on the page // TODO: what is they arent proper links?
		$(document).on("click", "a", function(ev) {
			
			var $this = $(this);
			// e.preventDefault();
			// if it has classes check if its a testlr link
			if ($this.attr("class")){
				// get its testler id
				var testID = $this.attr("class").split(" ").filter(function(cls){return cls.substring(0,4) === "tsl-" ? true: false;})[0]
				$.each(testler, function(index, item){

					//console.log("TRUTH TEST: ","tsl-" + item.id === testID, testID, item._id)
					item.view.active = ("tsl-" + item._id === testID) ? true : false;
					item.view.passive = true;
					item.view.time = (new Date()) - testler[0].time;
				})
				//console.log("updated views [active]")
			}
			// if not then update all testler links to show passive conversion
			else {

				$.each(testler, function(index, item){
					item.view.passive = true;
					item.view.time = (new Date()) - testler[0].time;
				})
				//console.log("updated views [passive]")
			}

			return true;
		});

		// before the user leaves the page submit the test data to testler server
		$(window).bind('beforeunload', function (ev) {

			//console.log("before leaving the page send info to testler:")
			// ajax send window.testler to server
			$.ajax({
				url: baseUrl + "/updateTests",
				data: {testler: JSON.stringify(testler)},
				type: "GET",
				async: false
			})
		})

	}

	$(document).ready(function(){
		
		var tests 		= $(".testler"),
			numTests 	= tests.length,
			classes 	= [],
			countTests 	= 0;

		$(tests).each( function(i, el){

			countTests++;
			var theseCls 	= $(el).attr("class").split(" "),
				testlerID 	= theseCls.map(function(cls){ if (cls.substring(4,0) === 'tsl-') return cls;});
			
			//console.log(testlerID);
			classes.push(testlerID[testlerID.length-1]);

			if (countTests >= numTests) getTestDetails(classes, function(err, data){
				if (!err) {
					window.testler = data.map(function(item){
						item.test.time = new Date();
						item.test.view = {
							active: false,
							passive: false,
							time: 0,
							value: item.output
						}
						return item.test
					});
					// make changes
					applyTestCases(data);

				}
			});

		});
		
	});
})(jQuery);