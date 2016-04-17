var Translator = function(){

	var translations = {};

	Translator.prototype.load = function(loader, bundle, locale) {
		translations[bundle] = loader.get();
	};

	Translator.prototype.translate = function(key){
		for (var bundle in translations){
			if (translations[bundle].hasOwnProperty(key)){
				return translations[bundle][key];
			}
		}
		return key.toUpperCase();
	};

};

module.exports = Translator;
