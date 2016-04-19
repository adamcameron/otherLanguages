var CacheService = function(config){
	var cache = {};
	var active = config.active;

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
		throw new KeyNotFoundException(key);
	};
};

var KeyNotFoundException = function(key){
	this.message = key + " not found in cache";
	this.name = "service.CacheService.KeyNotFoundException";
};

module.exports = CacheService;
