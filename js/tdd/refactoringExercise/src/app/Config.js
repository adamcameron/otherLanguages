var Config = function(){
	this.translation = {
		bundles : {
			primary : {cacheKey : "translations.primary"},
			secondary : {cacheKey : "translations.secondary"}
		},
		ttl : 60
	}
};

module.exports = Config;
