var testler = (function($){

	var baseUrl = "http://testler.nodejitsu.com/";

	$(document).ready(function(){
		$(".testler").each( function(i, el){

			var testlerID = $(el).attr("class");
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