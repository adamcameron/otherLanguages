$(document).ready(function(){
	var result = new Result("#result");

	$(".worker").each(function(i, worker){
		new Worker(worker, result.element);
	});
});