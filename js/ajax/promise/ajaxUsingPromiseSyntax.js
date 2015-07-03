$(document).ready(function(){
	var firstDiv = $("#loadFirst");
	var secondDiv = $("#loadSecond");
	var button = $("#run");

	displayresultsInDiv1 = function(data){
		console.log(data);
		data.forEach(function(number){
			$("<p>"+number+"</p>").appendTo(firstDiv);
		});
	};
	displayresultsInDiv2 = function(data){
		setTimeout(function(){
			data.forEach(function(number){
				$("<p>"+number+"</p>").appendTo(secondDiv);
			});
		}, 5000);
	};

	$(run).on("click", function(){
		$.getJSON("./slow.cfm", displayresultsInDiv1).then(displayresultsInDiv2);
	});
});


