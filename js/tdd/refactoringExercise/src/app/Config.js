var Config = function(){
	this.translation = {
		bundles : {
			primary : {cacheKey : "translations.primary"},
			secondary : {cacheKey : "translations.secondary"}
		},
		enabled : true,
		ttl : 60
	};
	this.cache = {
		active : false
	};
};

module.exports = Config;
