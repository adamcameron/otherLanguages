me.adamcameron.refactoring.repository = me.adamcameron.refactoring.repository || {};

me.adamcameron.refactoring.repository.TranslationRepository = function(availableBundles){
	var allBundles = {
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

	availableBundles = availableBundles || [];
	var bundles = Object.keys(allBundles).reduce(function(bundles, bundle){
		bundles[bundle] = availableBundles.indexOf(bundle) >=0 ? allBundles[bundle] : null;
		return bundles;
	}, {});

	var TranslationRepository = function(){};

	TranslationRepository.prototype.loadBundle = function(bundle){
		if (bundles.hasOwnProperty(bundle)) {
			return bundles[bundle];
		}
		throw new me.adamcameron.refactoring.repository.TranslationRepository.BundleNotFoundException(bundle);
	};
	return new TranslationRepository();
};

me.adamcameron.refactoring.repository.TranslationRepository.BundleNotFoundException = function(bundle){
	this.message = bundle + " does not exist in repository";
	this.name = "me.adamcameron.refactoring.service.TranslationRepository.BundleNotFoundException";
};