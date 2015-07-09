// noPromise.js
// promise.js
console.log("Before AJAX");
$.ajax("../slow.cfm", {success:function(){
	console.log("After success");
}});
console.log("After AJAX");
