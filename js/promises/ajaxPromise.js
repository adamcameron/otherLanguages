// promise.js

console.log("Before promise");
new Promise(
	function(resolve, reject) {
		console.log("Before AJAX");
		$.ajax("../slow.cfm", {success:function(){
			console.log("After success");
		}});
		console.log("After AJAX");	}
);
console.log("After promise");
