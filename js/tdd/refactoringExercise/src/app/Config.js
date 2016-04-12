var Config = function(){
	this.cache = {
		active : true
	};
	this.translation = {
		bundles : {
			primary : {cacheKey : "translations.primary"},
			secondary : {cacheKey : "translations.secondary"}
		},
		enabled : true
	}
};

module.exports = Config;
