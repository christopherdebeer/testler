var testler = (function($){

	var baseUrl = "http://testler.nodejitsu.com/";

	$(document).ready(function(){
		$(".testler").each( function(i, el){

			var classes = $(el).attr("class").split(" "),
				testlerID = classes.map(function(cls){if (cls.substring(5,0) === 'test-') return cls});
			console.log(testlerID);

		});

		// get options for this testler ID

		// $.ajax({
		//   url: testler.baseUrl + "testlter.json",
		//   dataType: "jsonp",

		//   success: function (data) {
		//   }
		// });
		
	});
})(jQuery);