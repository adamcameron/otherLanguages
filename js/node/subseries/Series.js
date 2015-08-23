// Series.js

var Series = function(value) {
	this.value = value;
};

Series.prototype.getSubseries = function(threshold){
	var workingSeries = this.value.slice();
	var sorted = this.value.map(function(element, index, series){

		var thisSubseries = workingSeries.reduce(function(best, current){
			var potential = best.run.slice();
			potential.push(current);
			best.running = best.running && Series.sum(potential) <= threshold;
			best.run = best.running ? potential : best.run;
			return best;
		},{run:[], running:true});

		workingSeries.shift();

		return thisSubseries;
	}).sort(function(e1,e2){
		return (e2.run.length - e1.run.length) || (Series.sum(e2.run) - Series.sum(e1.run));
	});
	return sorted.length ? sorted.shift().run : [];
};

Series.sum = function(array){
	return array.reduce(function(sum,addend){return sum+addend;},0);
};

module.exports = Series;