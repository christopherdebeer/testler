var testler = (function($){

	var baseUrl = "http://testler.no.de/";

	$(document).ready(function(){
		$("a[data-testler-id]").each( function(i, el){

			var testlerID = $(el).attr("data-testler-id").toString();

			// get options for this testler ID

			$.ajax({
			  url: testler.baseUrl + testlerID,
			  dataType: dataType,
			  success: function (data) {
			  	
			  	// select and option taking Bias into account

			  	// handle the href appropriately if http:// || /path || absolute.html
				var href = $(el).attr("href");
				if (href[0] === "/") {href = "http://" +  document.domain + href}
				else if (href.substring(0,4) === "http") {}
				else {
					currentLocation = document.location.href.toString();
					href = currentLocation.substring(0, currentLocation.lastIndexOf("/")) + "/" + href;
				}
				href = encodeURIComponent(href);

				// get the current text of the link
				var text = $(el).text();
				text = encodeURIComponent(text);

				// adjust the href to pas through the testler server
				$(el).attr("href",testler.baseUrl + testlerID + "?r=" + href + "&t=" + text);


			  }
			});
		});
	});
})(jQuery);