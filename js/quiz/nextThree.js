// nextThree.js

function nextIdsViaFilter(ids, id, count){
	var thisIdIdx = ids.indexOf(id);
	if (thisIdIdx == -1) return [];
	var nextIdsLen = 0;
	return ids.filter(function(v,i){
		return (nextIdsLen++ <= count) && (i > thisIdIdx);
	});
}

count = 3;

tests = [
	{ids:[7141,6881,5821,8001,7904,6601,7961,6021,4721], id:7141, result:[6881,5821,8001]},
	{ids:[7141,6881,5821], id:7141, result:[6881,5821]},
	{ids:[7141], id:7141, result:[]},
	{ids:[1111], id:9999, result:[]}
];

tests.forEach(function(test){
	nextIds = nextIdsViaFilter(test.ids, test.id, count);
	console.log(JSON.stringify(nextIds) + "; Pass:" + (nextIds.toString() == test.result.toString()));
});

