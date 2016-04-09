me.adamcameron.refactoring.service = me.adamcameron.refactoring.service || {};

me.adamcameron.refactoring.service.CacheService = function(config){
	var cache = {};
	var active = config.active;

	var CacheService = function(){};
	CacheService.prototype.isActive = function(){
		return active;
	};

	CacheService.prototype.exists = function(key){
		return this.isActive() && cache.hasOwnProperty(key);
	};

	CacheService.prototype.put = function(key, value){
		this.isActive() ? cache[key] = value : null;
	};

	CacheService.prototype.get = function(key){
		if (this.exists(key)){
			return cache[key];
		}
		throw new me.adamcameron.refactoring.service.CacheService.KeyNotFoundException(key);
	};

	return new CacheService();
};

me.adamcameron.refactoring.service.CacheService.KeyNotFoundException = function(key){
	this.message = key + " not found in cache";
	this.name = "me.adamcameron.refactoring.service.CacheService.KeyNotFoundException";
};