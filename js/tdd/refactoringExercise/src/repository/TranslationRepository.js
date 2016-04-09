me.adamcameron.refactoring.repository = me.adamcameron.refactoring.repository || {};

me.adamcameron.refactoring.repository.TranslationRepository = function(){
	var translations = {
		primary : {
			one : "tahi",
			two : "rua",
			three : "toru",
			four : "wha",
			five : "rima",
			six : "ono",
			seven : "whitu",
			eight : "waru",
			nine : "iwa",
			ten : "tekau"
		},
		secondary : {
			"red" : "whero",
			"orange" : "karaka",
			"yellow" : "kowhai",
			"green" : "kakariki",
			"blue" : "kikorangi",
			"indigo" : "poropango",
			"violet" : "papura"
		}
	};

	var TranslationRepository = function(){};

	TranslationRepository.prototype.loadBundle = function(bundle){
		if (translations.hasOwnProperty(bundle)) {
			return translations[bundle];
		}
		throw new me.adamcameron.refactoring.repository.TranslationRepository.BundleNotFoundException(bundle);
	};
	return new TranslationRepository();
};

me.adamcameron.refactoring.repository.TranslationRepository.BundleNotFoundException = function(bundle){
	this.message = bundle + " does not exist in repository";
	this.name = "me.adamcameron.refactoring.service.TranslationRepository.BundleNotFoundException";
};